import { getAllCards, getCardById } from '../services/cardService';
import type { CardInfo } from '../types';

export const cardsApi = {
  getAll: async (): Promise<CardInfo[]> => {
    return getAllCards();
  },
  getById: async (id: string): Promise<CardInfo | undefined> => {
    return getCardById(id);
  },
};
