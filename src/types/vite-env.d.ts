/// <reference types="vite/client" />

interface MenuProduct {
  title: string;
  description: string;
  price: number;
  id: string;
  qty: number;
}

interface Product {
  title: string;
  description: string;
  price: number;
  id: string;
  qty: number;
  image: string;
}

interface CartProduct {
  title: string;
  price: number;
  id: string;
  qty: number;
  image: string;
}

interface SingleMenuItemProps {
  onProductClick: (id: string) => void;
  product: MenuProduct;
}

interface MenuProductModalProps {
  product: MenuProduct;
  isOpen: boolean;
  onClose: () => void;
}

interface CartItemProps {
  product: CartProduct;
}

// Local Storage
type LocalStorageKeys = 'routes' | 'apiKey' | 'apiSecret';

type LocalStorageKeysObject = {
  [key in LocalStorageKeys]: string;
};

// Redux state
type RequestStatus = 'idle' | 'loading' | 'succeeded' | 'failed';

interface RequestState<T = null> {
  data: T;
  status: RequestStatus;
  error: SerializedError;
}

interface ResponseError {
  message: string;
}

// Response
interface UserStatus {
  balance: number;
  current_chair: boolean | string;
}

// Login page
interface LoginResponse {
  api_secret: string | null;
  api_key: string | null;
  sid: string;
  routes: string[];
}

interface LoginBodyState {
  usr: string;
  pwd: string;
}
