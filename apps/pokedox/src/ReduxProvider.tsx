'use client';
import { Provider } from 'react-redux';
import { makeStore } from './store';
import { ReactNode } from 'react';

interface ReduxProviderProps {
  children: ReactNode;
}

const store = makeStore();

export default function ReduxProvider({ children }: ReduxProviderProps) {
  return <Provider store={store}>{children}</Provider>;
}
