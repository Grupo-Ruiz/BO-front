import { createSlice } from '@reduxjs/toolkit';

interface UIState {
  sidebarOpen: boolean;
}

const initialState: UIState = {
  sidebarOpen: false,
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    setSidebarOpen(state, action: { payload: boolean }) {
      state.sidebarOpen = action.payload;
    },
  },
});

export const { setSidebarOpen } = uiSlice.actions;
export default uiSlice.reducer;
