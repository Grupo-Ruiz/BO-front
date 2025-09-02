import type { WalletQR } from '../../types/index';
import * as WalletService from '../../services/WalletService';

export const qrApi = {
  getWalletQR: async (params?: Record<string, any>): Promise<WalletQR> => {
    return WalletService.getWalletQR(params);
  },
};
