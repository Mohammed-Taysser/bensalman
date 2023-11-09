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
