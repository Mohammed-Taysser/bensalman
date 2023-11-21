import { configureStore } from '@reduxjs/toolkit';
import auth from './slices/auth.slice';
import cart from './slices/cart.slice';
import kitchen from './slices/kitchen.slice';
import status from './slices/status.slice';

const store = configureStore({
  reducer: {
    auth,
    status,
    cart,
    kitchen,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
