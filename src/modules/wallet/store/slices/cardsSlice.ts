import { createSlice } from '@reduxjs/toolkit';
import type { CardInfo } from '../../types/index';
import { fetchCards } from '../thunks/cardsThunks';

interface CardsState {
  cards: CardInfo[];
  isLoading: boolean;
  error: string | null;
}

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
