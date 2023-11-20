import type { TypedUseSelectorHook } from 'react-redux';
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, RootState } from '../redux/store';

// Use throughout your app instead of plain `useDispatch` and `useSelector`
const useAppDispatch: () => AppDispatch = useDispatch;
const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

const selectAuth = (state: RootState) => state.auth;
const selectStatus = (state: RootState) => state.status;
const selectCart = (state: RootState) => state.cart;

export { selectAuth, selectCart, selectStatus, useAppDispatch, useAppSelector };
