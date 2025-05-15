import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export interface PokemonListItem {
  name: string;
  url: string;
}

export interface PokemonListState {
  results: PokemonListItem[];
  count: number;
  next: string | null;
  previous: string | null;
  loading: boolean;
  error: string | null;
  page: number;
  pageSize: number;
}

const initialState: PokemonListState = {
  results: [],
  count: 0,
  next: null,
  previous: null,
  loading: false,
  error: null,
  page: 0,
  pageSize: 10,
};

export const fetchPokemonList = createAsyncThunk(
  'pokemon/fetchList',
  async ({ page, pageSize }: { page: number; pageSize: number }) => {
    const offset = page * pageSize;
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${pageSize}`);
    if (!res.ok) throw new Error('Failed to fetch Pokémon');
    return await res.json();
  },
);

const pokemonListSlice = createSlice({
  name: 'pokemonList',
  initialState,
  reducers: {
    setPage(state, action) {
      state.page = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPokemonList.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPokemonList.fulfilled, (state, action) => {
        state.loading = false;
        state.results = action.payload.results;
        state.count = action.payload.count;
        state.next = action.payload.next;
        state.previous = action.payload.previous;
      })
      .addCase(fetchPokemonList.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch Pokémon';
      });
  },
});

export const { setPage } = pokemonListSlice.actions;
export default pokemonListSlice.reducer;
