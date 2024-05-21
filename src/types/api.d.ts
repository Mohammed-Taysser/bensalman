// TODO: find a wat to make it global
// add type to axios itself
interface ResponseError {
  message: string;
}

interface UserProfileStatusResponse {
  balance: number;
  cart_count: number;
  credit: string;
  current_cart: string;
  current_chair: string;
  customer: {
    name: string;
    customer_name: string;
    language: string;
  };
  debit: number;
  drop_down: DropdownRoute[];
  home_routing: HomeRoute[];
  routing: string[];
}

interface AxiosLoginResponse {
  message: string;
  home_page: string;
  full_name: string;
  data: UserProfileStatusResponse & {
    full_name: string;
    sid: string;
    api_key: string;
    api_secret: string;
  };
}

interface AxiosWelcomeResponse {
  message: string;
  data: UserProfileStatusResponse;
}

interface AxiosChairResponse {
  message: string;
  data: UserProfileStatusResponse & {
    chairs: Chair[];
  };
}

interface AxiosChairReservationResponse {
  message: string;
  data: UserProfileStatusResponse & {
    chairs: Chair[];
  };
}

interface ReserveChairBody {
  chair: 'takeaway' | string;
  invite?: 0 | 1;
  remove?: 0 | 1;
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
  extra: UserProfileStatusResponse;
}

interface AxiosCartDetailsResponse {
  message: string;
  data: UserProfileStatusResponse & {
    status: CartStatus;
    total_amount: number;
    total_items: number;
    items: CartProduct[];
  };
}

interface AxiosCartModifyResponse {
  message: string;
  data: UserProfileStatusResponse & {
    status: CartStatus;
    total_amount: number;
    total_items: number;
  };
}

interface AxiosCheckoutResponse {
  message: string;
  data: UserProfileStatusResponse & {
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
  data: UserProfileStatusResponse & {
    chairs: ChairReservation[];
  };
}

interface AxiosOrdersResponse {
  message: string;
  data: UserProfileStatusResponse & {
    orders: Order[];
  };
}
