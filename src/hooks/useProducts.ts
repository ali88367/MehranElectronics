import { useState, useEffect } from 'react';
import { Product, PRODUCTS as MOCK_PRODUCTS, CATEGORIES } from '@/data/mock';

let cachedProducts: Product[] | null = null;

export function useProducts() {
  const [products, setProducts] = useState<Product[]>(cachedProducts || MOCK_PRODUCTS);
  const [loading, setLoading] = useState(!cachedProducts);

  useEffect(() => {
    if (cachedProducts) return;
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
