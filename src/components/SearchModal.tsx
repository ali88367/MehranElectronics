import React, { useState, useEffect, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, X, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useProducts } from '@/hooks/useProducts';
import { formatPrice } from '@/lib/utils';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const { products: PRODUCTS } = useProducts();

  useEffect(() => {
    if (isOpen) {
      setQuery('');
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  const results = useMemo(() => {
    if (!query.trim()) return [];
    const q = query.toLowerCase();
    return PRODUCTS.filter(
      p =>
        p.name.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.features.some(f => f.toLowerCase().includes(q))
    ).slice(0, 8);
  }, [query]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100]"
            onClick={onClose}
          />
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.98 }}
            transition={{ duration: 0.2 }}
            className="fixed top-[10vh] left-1/2 -translate-x-1/2 w-[90vw] max-w-2xl z-[101]"
          >
            <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
              {/* Search Input */}
              <div className="flex items-center px-6 border-b border-gray-100">
                <Search className="w-5 h-5 text-gray-400 shrink-0" />
                <input
                  ref={inputRef}
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search products, categories..."
                  className="flex-1 px-4 py-5 text-lg outline-none placeholder:text-gray-300"
                />
                <button
                  onClick={onClose}
                  className="p-2 text-gray-400 hover:text-luxury-charcoal transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Results */}
              <div className="max-h-[60vh] overflow-y-auto">
                {query.trim() && results.length === 0 && (
                  <div className="px-6 py-12 text-center">
                    <p className="text-gray-400 text-lg mb-2">No results found</p>
                    <p className="text-gray-300 text-sm">Try searching for "AC", "Refrigerator", or "Samsung"</p>
                  </div>
                )}

                {results.length > 0 && (
                  <div className="py-2">
                    {results.map((product) => (
                      <Link
                        key={product.id}
                        to={`/product/${product.id}`}
                        onClick={onClose}
                        className="flex items-center gap-4 px-6 py-4 hover:bg-gray-50 transition-colors group"
                      >
                        <div className="w-16 h-16 bg-gray-100 rounded-lg overflow-hidden shrink-0">
                          <img
                            src={product.image}
                            alt={product.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-medium text-luxury-charcoal truncate">{product.name}</h4>
                          <p className="text-sm text-gray-400">{product.category}</p>
                        </div>
                        <div className="text-right shrink-0">
                          <p className="font-semibold text-luxury-charcoal">{formatPrice(product.price)}</p>
                          <ArrowRight className="w-4 h-4 text-gray-300 group-hover:text-luxury-charcoal transition-colors ml-auto mt-1" />
                        </div>
                      </Link>
                    ))}
                  </div>
                )}

                {!query.trim() && (
                  <div className="px-6 py-8">
                    <p className="text-xs uppercase tracking-wider text-gray-400 mb-4">Popular Searches</p>
                    <div className="flex flex-wrap gap-2">
                      {['Air Conditioner', 'Refrigerator', 'LED TV', 'Washing Machine', 'Kitchen'].map(term => (
                        <button
                          key={term}
                          onClick={() => setQuery(term)}
                          className="px-4 py-2 bg-gray-50 text-gray-600 text-sm rounded-full hover:bg-luxury-charcoal hover:text-white transition-all"
                        >
                          {term}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Footer */}
              <div className="px-6 py-3 bg-gray-50 border-t border-gray-100 flex items-center justify-between text-xs text-gray-400">
                <span>Press <kbd className="px-1.5 py-0.5 bg-gray-200 rounded text-gray-500">ESC</kbd> to close</span>
                <span>{results.length > 0 ? `${results.length} results` : 'Type to search'}</span>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
