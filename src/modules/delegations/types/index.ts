// Delegation types for API
export interface Delegation {
  id?: number;
  nombre: string;
}

export interface DelegationsState {
	delegations: Delegation[];
	isLoading: boolean;
	error: { status: number; message: string } | null;
}