// Tipos usados en el módulo cards
export interface CardInfo {
  id: string;
  userId: string;
  userName: string;
  cardNumber: string;
  balance: number;
  type: 'mensual' | 'sencillo' | 'anual';
  status: 'active' | 'inactive' | 'blocked';
  expiryDate: string;
  lastUsed: string;
}

export interface CardsState {
  cards: CardInfo[];
  isLoading: boolean;
  error: string | null;
}

export interface CardComponentProps {
  card: CardInfo;
}
