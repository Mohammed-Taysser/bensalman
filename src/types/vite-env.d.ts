/// <reference types="vite/client" />

interface Product {
  title: string;
  description: string;
  price: number;
  id: string;
  qty: number;
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
