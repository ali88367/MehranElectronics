import React, { useEffect, useMemo, useState } from 'react';
import { useLocation, Link, useSearchParams } from 'react-router-dom';
import { motion } from 'motion/react';
import { SlidersHorizontal, X } from 'lucide-react';
import { CATEGORIES } from '@/data/mock';
import { useProducts } from '@/hooks/useProducts';
import { ProductCard } from '@/components/ProductGrid';
import { cn } from '@/lib/utils';

type SortOption = 'default' | 'price-low' | 'price-high' | 'name';

export function CollectionPage() {
  const { pathname } = useLocation();
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get('search')?.trim().toLowerCase() || '';
  const { products: PRODUCTS } = useProducts();
  const [sortBy, setSortBy] = useState<SortOption>('default');
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  const products = useMemo(() => {
    let filtered = activeCategory
      ? PRODUCTS.filter(p => p.category === activeCategory)
      : [...PRODUCTS];

    if (searchQuery) {
      filtered = filtered.filter(p =>
        p.name.toLowerCase().includes(searchQuery) || p.category.toLowerCase().includes(searchQuery)
      );
    }

    switch (sortBy) {
      case 'price-low':
        return filtered.sort((a, b) => a.price - b.price);
      case 'price-high':
        return filtered.sort((a, b) => b.price - a.price);
      case 'name':
        return filtered.sort((a, b) => a.name.localeCompare(b.name));
      default:
        return filtered;
    }
  }, [activeCategory, sortBy, searchQuery]);

  const categoryNames = CATEGORIES.map(c => c.name);

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Banner */}
      <div className="relative h-[35vh] min-h-[280px] bg-luxury-black overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-luxury-black to-brand-dark" />
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `repeating-linear-gradient(45deg, transparent, transparent 35px, rgba(255,255,255,.03) 35px, rgba(255,255,255,.03) 70px)`,
          }} />
        </div>
        <div className="relative z-10 container mx-auto px-6 h-full flex flex-col justify-end pb-12">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl md:text-4xl font-semibold text-white mb-3"
          >
            Our Collection
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-white/60 text-lg"
          >
            Discover our complete range of premium electronics
          </motion.p>
        </div>
      </div>

      {/* Toolbar */}
      <div className="sticky top-[72px] z-30 bg-white/90 backdrop-blur-md border-b border-gray-100">
        <div className="container mx-auto px-6 py-4">
          {/* Category Filters */}
          <div className="flex items-center gap-2 sm:gap-3 overflow-x-auto pb-2 scrollbar-hide">
            <button
              onClick={() => setActiveCategory(null)}
              className={cn(
                'px-3 py-1.5 sm:px-4 sm:py-2 text-[10px] sm:text-xs uppercase tracking-wide sm:tracking-wider whitespace-nowrap transition-all rounded-full shrink-0',
                !activeCategory ? 'bg-brand text-white' : 'text-gray-500 hover:bg-gray-100 border border-gray-200'
              )}
            >
              All Products
            </button>
            {categoryNames.map(name => (
              <button
                key={name}
                onClick={() => setActiveCategory(activeCategory === name ? null : name)}
                className={cn(
                  'px-3 py-1.5 sm:px-4 sm:py-2 text-[10px] sm:text-xs uppercase tracking-wide sm:tracking-wider whitespace-nowrap transition-all rounded-full shrink-0',
                  activeCategory === name
                    ? 'bg-brand text-white'
                    : 'text-gray-500 hover:bg-gray-100 border border-gray-200'
                )}
              >
                {name}
              </button>
            ))}
          </div>

          {/* Sort + Count */}
          <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-50">
            <p className="text-xs sm:text-sm text-gray-500">
              <span className="font-medium text-luxury-charcoal">{products.length}</span> products
              {searchQuery && <span> for "<span className="text-brand">{searchQuery}</span>"</span>}
            </p>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setShowMobileFilters(!showMobileFilters)}
                className="md:hidden flex items-center gap-2 text-sm text-gray-600"
              >
                <SlidersHorizontal className="w-4 h-4" />
                Sort
              </button>
              <div className="hidden md:flex items-center gap-2">
                <span className="text-sm text-gray-500">Sort:</span>
                {[
                  { value: 'default' as SortOption, label: 'Featured' },
                  { value: 'price-low' as SortOption, label: 'Low to High' },
                  { value: 'price-high' as SortOption, label: 'High to Low' },
                  { value: 'name' as SortOption, label: 'Name' },
                ].map(option => (
                  <button
                    key={option.value}
                    onClick={() => setSortBy(option.value)}
                    className={cn(
                      'px-3 py-1.5 text-xs uppercase tracking-wider transition-all rounded-full',
                      sortBy === option.value ? 'bg-brand text-white' : 'text-gray-500 hover:bg-gray-100'
                    )}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {showMobileFilters && (
            <div className="md:hidden pt-3 space-y-2">
              {[
                { value: 'default' as SortOption, label: 'Featured' },
                { value: 'price-low' as SortOption, label: 'Price: Low to High' },
                { value: 'price-high' as SortOption, label: 'Price: High to Low' },
                { value: 'name' as SortOption, label: 'Name' },
              ].map(option => (
                <button
                  key={option.value}
                  onClick={() => { setSortBy(option.value); setShowMobileFilters(false); }}
                  className={cn(
                    'block w-full text-left px-4 py-2 text-sm rounded-lg transition-colors',
                    sortBy === option.value ? 'bg-brand text-white' : 'text-gray-600 hover:bg-gray-50'
                  )}
                >
                  {option.label}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Products Grid */}
      <div className="container mx-auto px-6 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: Math.min(index * 0.03, 0.5) }}
            >
              <ProductCard product={product} />
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
