import * as WalletService from '../../services/WalletService';
import type { CardInfo } from '../../types/index';

export const cardsApi = {
  getAll: async (): Promise<CardInfo[]> => {
    return WalletService.getAllCards();
  },
  getById: async (id: string): Promise<CardInfo | undefined> => {
    return WalletService.getCardById(id);
  },
};
