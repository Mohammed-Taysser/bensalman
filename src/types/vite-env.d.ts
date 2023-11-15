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

interface Chair {
  id: string;
  number: number;
  code: string;
}

// Local Storage
type LocalStorageKeys = 'authUser';

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

interface UserStatus {
  balance: number;
  current_chair: boolean | string;
  current_cart: boolean | string;
}

interface AuthUser {
  api_secret: string;
  api_key: string;
  sid: string;
  routes: string[];
  full_name: string;
}

interface LoginBody {
  usr: string;
  pwd: string;
}

interface WelcomeMenu {
  id: string;
  label: string;
  path: string;
}
