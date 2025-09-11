import { createSlice } from '@reduxjs/toolkit';
import { createDelegation, getDelegations } from './delegationsThunks';
import type { DelegationsState } from '../types';

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