import { configureStore } from '@reduxjs/toolkit';
import { createWrapper } from 'next-redux-wrapper';

import pokemonListReducer from './slices/pokemonListSlice';

export const makeStore = () =>
  configureStore({
    reducer: {
      pokemonList: pokemonListReducer,
    },
    // Add middleware, devTools, etc. as needed
  });

export type AppStore = ReturnType<typeof makeStore>;
export type AppState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];

export const wrapper = createWrapper<AppStore>(makeStore);
