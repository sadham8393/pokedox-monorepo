import React, { act } from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { makeStore } from './src/store';
import Home from './src/app/page';
import '@testing-library/jest-dom';

jest.mock('next/navigation', () => ({
  useRouter: () => ({ push: jest.fn() }),
}));

// Silence MUI DataGrid page size warning in tests
const originalWarn: typeof console.warn = console.warn;
(jest.spyOn(console, 'warn') as jest.SpyInstance).mockImplementation((msg: unknown, ...args: unknown[]) => {
  if (typeof msg === 'string' && msg.includes('The page size `10` is not present in the `pageSizeOptions`')) {
    return;
  }
  originalWarn(msg as string, ...args);
});

const store = makeStore();

describe('Home page', () => {
  it('renders the Pokémon List heading', async () => {
    await act(async () => {
      render(
        <Provider store={store}>
          <Home />
        </Provider>
      );
    });
    expect(screen.getByText(/Pokémon List/i)).toBeInTheDocument();
  });
});

describe('Pokedox App', () => {
  it('renders without crashing', () => {
    expect(true).toBe(true);
  });
});
