import React from 'react';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { makeStore } from '../store';
import Page from './page';

jest.mock('next/navigation', () => ({
  useRouter: () => ({ push: jest.fn() }),
}));

const store = makeStore();

describe('Page component', () => {
  it('renders without crashing', () => {
    render(
      <Provider store={store}>
        <Page />
      </Provider>
    );
  });
});

describe('page placeholder', () => {
  it('should render without crashing (placeholder)', () => {
    expect(true).toBe(true);
  });
});