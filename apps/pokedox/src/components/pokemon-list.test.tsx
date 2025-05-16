// Mock next/navigation for router
jest.mock('next/navigation', () => ({
  useRouter: () => ({ push: jest.fn() }),
}));

// Remove all fetchPokemonList mocking. Instead, mock global.fetch for thunk control.
beforeAll(() => {
  global.fetch = jest.fn().mockResolvedValue({
    ok: true,
    json: async () => ({ results: [], count: 0, next: null, previous: null }),
  });
});

afterAll(() => {
  jest.resetAllMocks();
});

import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { makeStore } from '../store';
import PokemonListPage from './pokemon-list';
import '@testing-library/jest-dom';

describe('PokemonListPage', () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  it('renders the heading', () => {
    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ results: [], count: 0, next: null, previous: null }),
    });
    const store = makeStore();
    render(
      <Provider store={store}>
        <PokemonListPage />
      </Provider>
    );
    expect(screen.getByText(/Pokémon List/i)).toBeInTheDocument();
  });

  it('shows loading state', async () => {
    let resolveFetch: (value: unknown) => void;
    global.fetch = jest.fn().mockImplementation(
      () => new Promise((resolve) => { resolveFetch = resolve; })
    );
    const store = makeStore();
    const { container } = render(
      <Provider store={store}>
        <PokemonListPage />
      </Provider>
    );
    // Simulate fetch is pending
    // Look for the MUI DataGrid loading overlay by class
    expect(container.querySelector('.MuiDataGrid-overlay')).toBeInTheDocument();
    // Now resolve fetch
    resolveFetch!({ ok: true, json: async () => ({ results: [], count: 0, next: null, previous: null }) });
  });

  it('shows error state', async () => {
    global.fetch = jest.fn().mockResolvedValue({ ok: false });
    const store = makeStore();
    render(
      <Provider store={store}>
        <PokemonListPage />
      </Provider>
    );
    expect(await screen.findByText(/Failed to fetch Pokémon/)).toBeInTheDocument();
  });

  it('renders rows and handles row click', async () => {
    const testResults = [
      { name: 'bulbasaur', url: 'https://pokeapi.co/api/v2/pokemon/1/' },
      { name: 'ivysaur', url: 'https://pokeapi.co/api/v2/pokemon/2/' },
    ];
    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ results: testResults, count: 2, next: null, previous: null }),
    });
    const store = makeStore();
    render(
      <Provider store={store}>
        <PokemonListPage />
      </Provider>
    );
    expect(await screen.findByText('bulbasaur')).toBeInTheDocument();
    expect(await screen.findByText('ivysaur')).toBeInTheDocument();
    // Simulate row click
    const row = screen.getByText('bulbasaur').closest('div[role="row"]');
    fireEvent.click(row!);
    // No error thrown, router.push is called (mocked)
  });

  it('shows empty state when no Pokémon are returned', async () => {
    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ results: [], count: 0, next: null, previous: null }),
    });
    const store = makeStore();
    render(
      <Provider store={store}>
        <PokemonListPage />
      </Provider>
    );
    // DataGrid renders an overlay for empty state
    expect(await screen.findByText(/No rows/i)).toBeInTheDocument();
  });

  it('handles pagination: fetches next page when triggered', async () => {
    const firstPage = {
      results: [
        { name: 'bulbasaur', url: 'https://pokeapi.co/api/v2/pokemon/1/' },
      ],
      count: 2,
      next: 'https://pokeapi.co/api/v2/pokemon?offset=1&limit=1',
      previous: null,
    };
    const secondPage = {
      results: [
        { name: 'ivysaur', url: 'https://pokeapi.co/api/v2/pokemon/2/' },
      ],
      count: 2,
      next: null,
      previous: 'https://pokeapi.co/api/v2/pokemon?offset=0&limit=1',
    };
    const fetchMock = jest.fn()
      .mockResolvedValueOnce({ ok: true, json: async () => firstPage })
      .mockResolvedValueOnce({ ok: true, json: async () => secondPage });
    global.fetch = fetchMock;
    const store = makeStore();
    render(
      <Provider store={store}>
        <PokemonListPage />
      </Provider>
    );
    expect(await screen.findByText('bulbasaur')).toBeInTheDocument();
    // Simulate pagination: find the next page button and click it
    const nextButton = await screen.findByLabelText('Go to next page');
    fireEvent.click(nextButton);
    // Wait for the next page to load (use findAllByText to be robust to multiple elements)
    const ivysaurCells = await screen.findAllByText('ivysaur', {}, { timeout: 3000 });
    expect(ivysaurCells.length).toBeGreaterThan(0);
    expect(fetchMock).toHaveBeenCalledTimes(2);
  });

  it('handles fetch error after initial success (e.g., on pagination)', async () => {
    const firstPage = {
      results: [
        { name: 'bulbasaur', url: 'https://pokeapi.co/api/v2/pokemon/1/' },
      ],
      count: 2,
      next: 'https://pokeapi.co/api/v2/pokemon?offset=1&limit=1',
      previous: null,
    };
    const fetchMock = jest.fn()
      .mockResolvedValueOnce({ ok: true, json: async () => firstPage })
      .mockResolvedValueOnce({ ok: false });
    global.fetch = fetchMock;
    const store = makeStore();
    render(
      <Provider store={store}>
        <PokemonListPage />
      </Provider>
    );
    expect(await screen.findByText('bulbasaur')).toBeInTheDocument();
    // Simulate pagination: find the next page button and click it
    const nextButton = await screen.findByLabelText('Go to next page');
    fireEvent.click(nextButton);
    // Wait for error message to appear (use findAllByText to be robust)
    const errorCells = await screen.findAllByText(/Failed to fetch Pokémon/i, {}, { timeout: 3000 });
    expect(errorCells.length).toBeGreaterThan(0);
  });
});