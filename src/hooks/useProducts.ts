import { Product, PRODUCTS as MOCK_PRODUCTS, CATEGORIES } from '@/data/mock';
import staticProductsJson from '@/data/products.json';

const STATIC_PRODUCTS = staticProductsJson as unknown as Product[];
const PRODUCTS: Product[] = STATIC_PRODUCTS.length > 0 ? STATIC_PRODUCTS : MOCK_PRODUCTS;

export function useProducts() {
  return { products: PRODUCTS, loading: false };
}

export { CATEGORIES };
