import { useState, useEffect } from 'react';
import { Product, PRODUCTS as MOCK_PRODUCTS, CATEGORIES } from '@/data/mock';
import staticProductsJson from '@/data/products.json';

const STATIC_PRODUCTS = staticProductsJson as unknown as Product[];

// Bundled snapshot used only for instant first paint; the API (backed by
// src/data/products.json on disk) is always fetched to pick up admin edits.
const INITIAL: Product[] = STATIC_PRODUCTS.length > 0 ? STATIC_PRODUCTS : MOCK_PRODUCTS;

let cachedProducts: Product[] | null = null;

export function useProducts() {
  const [products, setProducts] = useState<Product[]>(cachedProducts || INITIAL);
  const [loading, setLoading] = useState(!cachedProducts);

  useEffect(() => {
    fetch('/api/products')
      .then(r => r.json())
      .then((data: Product[]) => {
        if (data.length > 0) {
          cachedProducts = data;
          setProducts(data);
        }
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  return { products, loading };
}

export function invalidateCache() {
  cachedProducts = null;
}

export { CATEGORIES };
