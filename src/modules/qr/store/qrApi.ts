import { getQR } from '../services/qrService';
import type { QrData } from '../types';

export const qrApi = {
  getQR: async (): Promise<QrData> => {
    return getQR();
  },
};