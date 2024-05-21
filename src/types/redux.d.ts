type RequestStatus = 'idle' | 'loading' | 'succeeded' | 'failed';

interface ReduxRequestState<T = null> {
  data: T;
  status: RequestStatus;
  error: SerializedError;
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

interface UserProfileStatus {
  balance: number;
  current_chair: boolean | string;
  current_cart: boolean | string;
  home_routing: HomeRoute[];
  drop_down: NavbarDropdownItem[];
  cart_count: number;
}

interface CartStatusSlice {
  items: Product[];
  total_items: number;
  total_amount: number;
  status: CartStatus;
  current_cart: string;
  loading: string[];
}
