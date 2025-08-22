
import { configureStore } from '@reduxjs/toolkit';
import { delegationsReducer, uiReducer } from './modules/shared/store';
import { authReducer } from './modules/auth/store';
import { usersReducer } from './modules/users/store';

export const store = configureStore({
  reducer: {
    ui: uiReducer,
    auth: authReducer,
    users: usersReducer,
    delegations: delegationsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;