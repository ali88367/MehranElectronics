import React, { useEffect, useMemo, useState } from 'react';
import { useParams, Link, useLocation } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowLeft, SlidersHorizontal, X } from 'lucide-react';
import { CATEGORIES } from '@/data/mock';
import { useProducts } from '@/hooks/useProducts';
import { ProductCard } from '@/components/ProductGrid';
import { cn } from '@/lib/utils';

const CATEGORY_MAP: Record<string, string> = {
  kitchen: 'Kitchen Appliances',
  home: 'Home Appliances',
  'home-appliances': 'Home Appliances',
  refrigerators: 'Refrigerators',
  ac: 'Air Conditioners',
  tv: 'LED TVs',
  'deep-freeze': 'Deep Freezers',
  ovens: 'Ovens',
  'washing-machine': 'Washing Machines',
  fan: 'Fans',
  cooler: 'Coolers',
  blender: 'Blenders',
  juicer: 'Juicers',
  'air-fryer': 'Air Fryers',
};

type SortOption = 'default' | 'price-low' | 'price-high' | 'name';

export function CategoryPage() {
  const { id } = useParams();
  const { pathname } = useLocation();
  const { products: PRODUCTS } = useProducts();
  const [sortBy, setSortBy] = useState<SortOption>('default');
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  const categoryName = id ? CATEGORY_MAP[id] : undefined;
  const category = CATEGORIES.find(c => c.id === id);
  const isHomeAppliances = id === 'home' || id === 'home-appliances';
  const matchingCategories = isHomeAppliances
    ? ['Home Appliances', 'Ovens', 'Fans', 'Coolers', 'Blenders', 'Juicers', 'Air Fryers']
    : [categoryName];

  const products = useMemo(() => {
    let filtered = PRODUCTS.filter(p => matchingCategories.includes(p.category));
    switch (sortBy) {
      case 'price-low':
        return [...filtered].sort((a, b) => a.price - b.price);
      case 'price-high':
        return [...filtered].sort((a, b) => b.price - a.price);
      case 'name':
        return [...filtered].sort((a, b) => a.name.localeCompare(b.name));
      default:
        return filtered;
    }
  }, [id, categoryName, sortBy]);

  if (!categoryName) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-24">
        <div className="text-center">
          <h2 className="text-2xl font-serif mb-4">Category Not Found</h2>
          <Link to="/" className="text-luxury-charcoal underline">Return Home</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Banner */}
      <div className="relative h-[40vh] min-h-[320px] bg-luxury-charcoal overflow-hidden">
        {category && (
          <div
            className="absolute inset-0 bg-cover bg-center opacity-40"
            style={{ backgroundImage: `url(${category.image})` }}
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-luxury-charcoal via-luxury-charcoal/60 to-transparent" />
        <div className="relative z-10 container mx-auto px-6 h-full flex flex-col justify-end pb-12">
          <Link to="/" className="inline-flex items-center text-sm text-white/60 hover:text-white mb-6 transition-colors w-fit">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Link>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-serif text-3xl md:text-4xl text-white mb-3"
          >
            {categoryName}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-white/60 text-lg"
          >
            {products.length} {products.length === 1 ? 'product' : 'products'} available
          </motion.p>
        </div>
      </div>

      {/* Toolbar */}
      <div className="sticky top-[72px] z-30 bg-white/90 backdrop-blur-md border-b border-gray-100">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <p className="text-sm text-gray-500">
            Showing <span className="font-medium text-luxury-charcoal">{products.length}</span> results
          </p>
          <div className="flex items-center gap-4">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="md:hidden flex items-center gap-2 text-sm text-gray-600 hover:text-luxury-charcoal transition-colors"
            >
              <SlidersHorizontal className="w-4 h-4" />
              Sort
            </button>
            <div className="hidden md:flex items-center gap-2">
              <span className="text-sm text-gray-500">Sort by:</span>
              {[
                { value: 'default' as SortOption, label: 'Featured' },
                { value: 'price-low' as SortOption, label: 'Price: Low to High' },
                { value: 'price-high' as SortOption, label: 'Price: High to Low' },
                { value: 'name' as SortOption, label: 'Name' },
              ].map(option => (
                <button
                  key={option.value}
                  onClick={() => setSortBy(option.value)}
                  className={cn(
                    'px-3 py-1.5 text-xs uppercase tracking-wider transition-all rounded-full',
                    sortBy === option.value
                      ? 'bg-luxury-charcoal text-white'
                      : 'text-gray-500 hover:bg-gray-100'
                  )}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Mobile Sort Dropdown */}
        {showFilters && (
          <div className="md:hidden border-t border-gray-100 bg-white px-6 py-4 space-y-2">
            {[
              { value: 'default' as SortOption, label: 'Featured' },
              { value: 'price-low' as SortOption, label: 'Price: Low to High' },
              { value: 'price-high' as SortOption, label: 'Price: High to Low' },
              { value: 'name' as SortOption, label: 'Name' },
            ].map(option => (
              <button
                key={option.value}
                onClick={() => { setSortBy(option.value); setShowFilters(false); }}
                className={cn(
                  'block w-full text-left px-4 py-2 text-sm rounded-lg transition-colors',
                  sortBy === option.value ? 'bg-luxury-charcoal text-white' : 'text-gray-600 hover:bg-gray-50'
                )}
              >
                {option.label}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Products Grid */}
      <div className="container mx-auto px-6 py-16">
        {products.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-gray-400 text-lg mb-4">No products found in this category.</p>
            <Link to="/" className="text-luxury-charcoal underline">Browse all products</Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <ProductCard product={product} />
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
