
import { configureStore, combineReducers } from '@reduxjs/toolkit';
import authSlice from './slices/authSlice';
import uiSlice from './slices/uiSlice';
import usersReducer from '../modules/users/store/usersSlice';

// Combinar reducers
const rootReducer = combineReducers({
  auth: authSlice,
  ui: uiSlice,
  users: usersReducer,
});

// Configurar store simple
export const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== 'production',
});

// Tipos
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
