import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import authSlice from './slices/authSlice';
import usersSlice from './slices/usersSlice';
import uiSlice from './slices/uiSlice';

// Configuración de persistencia
const persistConfig = {
  key: 'yurni-root',
  storage,
  whitelist: ['auth', 'users'], // Solo persistir auth y users
  blacklist: ['ui'] // No persistir ui (loading states, etc.)
};

// Combinar reducers
const rootReducer = combineReducers({
  auth: authSlice,
  users: usersSlice,
  ui: uiSlice
});

// Reducer persistido
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Configurar store
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [
          'persist/PERSIST',
          'persist/REHYDRATE',
          'persist/PAUSE',
          'persist/PURGE',
          'persist/REGISTER'
        ]
      }
    }),
  devTools: process.env.NODE_ENV !== 'production'
});

// Persistor
export const persistor = persistStore(store);

// Tipos
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
