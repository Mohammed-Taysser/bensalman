import { configureStore } from '@reduxjs/toolkit';
import auth from './slices/auth.slice';
import status from './slices/status.slice';

const store = configureStore({
  reducer: {
    auth,
    status,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
