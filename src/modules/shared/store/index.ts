import { configureStore } from '@reduxjs/toolkit';
import uiReducer from './uiSlice';
import { usersReducer } from '@/modules/users/store';
import { walletReducer } from '@/modules/wallet/store';
import { cardsReducer } from '@/modules/cards/store';
import { qrReducer } from '@/modules/qr/store';
import { delegationsReducer } from '@/modules/delegations/store';
import { clientsReducer } from '@/modules/clients/store';
import { managementReducer } from '@/modules/management/store';

export const store = configureStore({
  reducer: {
    ui: uiReducer,
    users: usersReducer,
    delegations: delegationsReducer,
    cards: cardsReducer,
    wallet: walletReducer,
    management: managementReducer,
    qr: qrReducer,
    clients: clientsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;