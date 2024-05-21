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

interface AuthUser {
  api_secret: string;
  api_key: string;
  sid: string;
  routes: string[];
  full_name: string;
}

// Orders Page
interface Order {
  date: string;
  name: string;
  products: Product[];
}

interface GetProductParams {
  item_name?: string;
  item_group?: string;
}
