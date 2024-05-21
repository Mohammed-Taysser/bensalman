/// <reference types="vite/client" />
/// <reference types="antd" />

// Import ENV Variables Types
interface ImportMetaEnv {
  readonly VITE_SERVER_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

// Global

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

interface AuthUser {
  api_secret: string;
  api_key: string;
  sid: string;
  routes: string[];
  full_name: string;
}

// Components
interface ProductQuantityProps {
  id: string;
  quantity: number;
  className?: React.ComponentProps<'div'>['className'];
}

// Layout
interface BaseLayoutProps {
  children: React.ReactNode;
  noNavbar?: boolean;
}

interface NavbarDropdownItem {
  id: number;
  path: string;
  label: string;
}

// Login page
interface LoginRequestBody {
  usr: string;
  pwd: string;
}

// Menu page
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

// TODO: find a wat to make it global
// add type to axios itself
interface ResponseError {
  message: string;
}

interface UserStatus {
  balance: number;
  current_chair: boolean | string;
  current_cart: boolean | string;
  home_routing: HomeRoute[];
  drop_down: NavbarDropdownItem[];
  cart_count: number;
}

// Cart Page
interface CartStatusSlice {
  items: Product[];
  total_items: number;
  total_amount: number;
  status: CartStatus;
  current_cart: string;
  loading: string[];
}

interface ModifyQuantityRequestBody {
  qty: number;
  item: string;
}

type CartStatus = 'Ordered' | 'Prepare' | 'Completed' | 'On Table';

// Reservation page
interface ReservationState {
  chairs: ChairReservation[];
  products: Product[];
}

interface ChairReservation {
  chair: string;
  invite: 0 | 1;
}

interface ReserveChairBody {
  chair: 'takeaway' | string;
  invite?: 0 | 1;
  remove?: 0 | 1;
}

// Orders Page
interface Order {
  date: string;
  name: string;
  products: Product[];
}

// kitchen page
interface KitchenProduct {
  name: string;
  qty: number;
  image: string;
  total: number;
}

interface KitchenOrderProduct {
  item: string;
  qty: number;
  cart: string;
  image: string;
}

interface KitchenOrder {
  chair: string;
  items: KitchenOrderProduct[];
  carts: string[];
}

interface KitchenCardStatus {
  ordered: number;
  completed: number;
  onTable: number;
  total: number;
  Prepare: number;
}

interface KitchenDropdownOptions {
  shifts: {
    label: string;
    value: string;
  }[];
  status: {
    label: string;
    value: string;
  }[];
  selectedStatus: string | null;
  selectedShift: string | null;
}

interface KitchenStatusSlice {
  orders: KitchenOrder[];
  products: KitchenProduct[];
  status: KitchenCardStatus;
  options: KitchenDropdownOptions;
}

interface KitchenProductPayload {
  payload: {
    products: KitchenProduct[];
    options: KitchenDropdownOptions;
  };
}

interface KitchenSocketResponse {
  KitchenProduct: KitchenProduct[];
  status: KitchenCardStatus;
  data: KitchenOrder[];
  type: 'status';
}

interface OrderModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedOrder: KitchenOrder;
}

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

interface AxiosKitchenProductsResponse {
  message: string;
  KitchenProduct: KitchenProduct[];
  main_status: KitchenDropdownOptions;
  status: KitchenCardStatus;
  data: KitchenOrder[];
}

interface AxiosAllChairReservationResponse {
  message: string;
  data: ResponseStatus & {
    chairs: ChairReservation[];
  };
}

interface AxiosOrdersResponse {
  message: string;
  data: ResponseStatus & {
    orders: Order[];
  };
}

interface GetProductParams {
  item_name?: string;
  item_group?: string;
}

interface ReReservationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}


interface ChairCardProps {
  seat: Chair;
  onChairClick?: (id: string) => Promise<void>;
}
