import { createSlice } from '@reduxjs/toolkit';
import type { Delegation } from '../../types';
import { createDelegation, getDelegations } from '../thunks/delegationsThunks';

// El tipo DelegationsState es local porque solo lo usa este slice
interface DelegationsState {
  delegations: Delegation[];
  isLoading: boolean;
  error: { status: number; message: string } | null;
}

const initialState: DelegationsState = {
  delegations: [],
  isLoading: false,
  error: null,
};

const delegationsSlice = createSlice({
  name: 'delegations',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getDelegations.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getDelegations.fulfilled, (state, action) => {
        state.isLoading = false;
        state.delegations = action.payload;
        state.error = null;
      })
      .addCase(getDelegations.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload ?? { status: 0, message: 'Error desconocido' };
      })
      .addCase(createDelegation.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createDelegation.fulfilled, (state, action) => {
        state.isLoading = false;
        state.delegations.push(action.payload);
      })
      .addCase(createDelegation.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload ?? { status: 0, message: 'Error desconocido' };
      });
  }
});

export default delegationsSlice.reducer;