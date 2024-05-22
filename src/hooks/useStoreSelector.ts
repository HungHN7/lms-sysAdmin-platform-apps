import { useSelector } from 'react-redux';
import type { TypedUseSelectorHook } from 'react-redux';
import { RootState } from 'src/redux/store';

export const useStoreSelector: TypedUseSelectorHook<RootState> = useSelector;

export const getCountState = (state: RootState) => state.countSlice;

export const getUserData = (state: RootState) => state.userSlice;
