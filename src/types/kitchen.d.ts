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

interface KitchenOrderModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedOrder: KitchenOrder;
}
