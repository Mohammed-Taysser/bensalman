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

interface Chair {
  name: string;
  number: number;
  code: string;
}

interface ProductQuantityProps {
  id: string;
  quantity: number;
  onSuccessCallback?: () => void;
  className?: React.ComponentProps<'div'>['className'];
}

interface BaseLayoutProps {
  children: React.ReactNode;
  bg?: string;
  noNavbar?: boolean;
}

interface MenuItemProps {
  onProductClick: (id: string) => void;
  product: Product;
}

interface MenuProductModalProps {
  id: string;
  isOpen: boolean;
  onClose: () => void;
}

// Local Storage
type LocalStorageKeys = 'authUser' | 'language';

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

interface NavbarDropdownItem {
  id: number;
  path: string;
  label: string;
}

interface UserStatus {
  balance: number;
  current_chair: boolean | string;
  current_cart: boolean | string;
  home_routing: HomeRoute[];
  drop_down: NavbarDropdownItem[];
  cart_count: number;
}

interface AuthUser {
  api_secret: string;
  api_key: string;
  sid: string;
  routes: string[];
  full_name: string;
}

interface CartStatusSlice {
  items: Product[];
  total_items: number;
  total_amount: number;
  status: CartStatus;
  current_cart: string;
  loading: string[];
}

interface LoginBody {
  usr: string;
  pwd: string;
}

interface ModifyQuantityBody {
  qty: number;
  item: string;
}

type CartStatus = 'Ordered' | 'Prepare' | 'Completed' | 'On Table';

// Axios Response
interface Customer {
  name: string;
  customer_name: string;
  language: string;
}

interface HomeRoute {
  id: number;
  path: string;
  label: string;
}

interface DropdownRoute {
  id: number;
  label: string;
  path: string;
  icon: string;
}

type CartProduct = Product & { total?: number };

interface ResponseStatus {
  balance: number;
  cart_count: number;
  credit: string;
  current_cart: string;
  current_chair: string;
  customer: Customer;
  debit: number;
  drop_down: DropdownRoute[];
  home_routing: HomeRoute[];
  routing: string[];
}

interface AxiosLoginResponse {
  message: string;
  home_page: string;
  full_name: string;
  data: ResponseStatus & {
    full_name: string;
    sid: string;
    api_key: string;
    api_secret: string;
  };
}

interface AxiosWelcomeResponse {
  message: string;
  data: ResponseStatus;
}

interface AxiosChairResponse {
  message: string;
  data: ResponseStatus & {
    chairs: Chair[];
  };
}

interface AxiosChairReservationResponse {
  message: string;
  data: ResponseStatus & {
    chairs: Chair[];
  };
}

interface AxiosCategoriesResponse {
  message: string;
  data: {
    names: string;
  }[];
}

interface AxiosProductsResponse {
  message: string;
  data: Product[];
  extra: ResponseStatus;
}

interface AxiosCartDetailsResponse {
  message: string;
  data: ResponseStatus & {
    status: CartStatus;
    total_amount: number;
    total_items: number;
    items: CartProduct[];
  };
}

interface AxiosCartModifyResponse {
  message: string;
  data: ResponseStatus & {
    status: CartStatus;
    total_amount: number;
    total_items: number;
  };
}

interface AxiosCheckoutResponse {
  message: string;
  data: ResponseStatus & {
    status: CartStatus;
  };
}
