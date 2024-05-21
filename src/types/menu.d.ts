interface MenuItemProps {
  onProductClick: (id: string) => void;
  product: Product;
}

interface MenuProductModalProps {
  id: string;
  isOpen: boolean;
  onClose: () => void;
}
