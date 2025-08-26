import { configureStore } from '@reduxjs/toolkit';
import uiReducer from './slices/uiSlice';
import delegationsReducer from './slices/delegationsSlice';
import { usersReducer } from '@/modules/users/store';

export const store = configureStore({
  reducer: {
    ui: uiReducer,
    users: usersReducer,
    delegations: delegationsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export { uiReducer, delegationsReducer };