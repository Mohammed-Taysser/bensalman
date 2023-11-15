/// <reference types="vite/client" />

interface Product {
  name: string;
  standard_rate: number;
  item_name: string;
  description: string;
  item_group: string;
  image: string;
  cart_qty: number;
}

interface Category {
  names: string;
}

interface SingleMenuItemProps {
  onProductClick: (id: string) => void;
  product: Product;
}

interface MenuProductModalProps {
  product: Product;
  isOpen: boolean;
  onClose: () => void;
}

interface Chair {
  name: string;
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
  home_routing: WelcomeMenu[];
  cart_count: number;
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
