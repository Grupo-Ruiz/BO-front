import type { WalletQR } from '../../types/index';
import * as WalletService from '../../services/WalletService';

export const qrApi = {
  getWalletQR: async (): Promise<WalletQR> => {
    return WalletService.getWalletQR();
  },
};