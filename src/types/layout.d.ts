interface BaseLayoutProps {
  children: React.ReactNode;
  noNavbar?: boolean;
}

interface NavbarDropdownItem {
  id: number;
  path: string;
  label: string;
}
