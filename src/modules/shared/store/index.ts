import { configureStore, combineReducers } from '@reduxjs/toolkit';
import uiReducer from './slices/uiSlice';
import delegationsReducer from './slices/delegationsSlice';
// Agrega aquí otros reducers si los tienes

const rootReducer = combineReducers({
  ui: uiReducer,
  delegations: delegationsReducer,
});

export const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export { uiReducer, delegationsReducer };
