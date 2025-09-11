import { createSlice } from '@reduxjs/toolkit';
import { fetchCards } from './cardsThunks';
import type { CardsState } from '../types';

const initialState: CardsState = {
  cards: [],
  isLoading: false,
  error: null,
};

const cardsSlice = createSlice({
  name: 'cards',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCards.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchCards.fulfilled, (state, action) => {
        state.isLoading = false;
        state.cards = action.payload;
      })
      .addCase(fetchCards.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Error al cargar tarjetas';
      });
  },
});

export default cardsSlice.reducer;