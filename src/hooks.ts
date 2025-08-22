import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, RootState } from './store';

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector = useSelector as unknown as <TSelected = unknown>(selector: (state: RootState) => TSelected) => TSelected;