import React, { useEffect, useMemo, useState } from 'react';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight, Coffee, Zap, Wind as WindIcon, Utensils, Sparkles, Search, X } from 'lucide-react';
import { Hero } from '@/components/Hero';
import { CategoryShowcase } from '@/components/CategoryShowcase';
import { ProductGrid, ProductCard } from '@/components/ProductGrid';
import { StatementBanner } from '@/components/StatementBanner';
import { Marquee } from '@/components/Marquee';
import { useProducts } from '@/hooks/useProducts';
import { formatPrice } from '@/lib/utils';
import type { Product } from '@/data/mock';

function HomeSearchBar({ products }: { products: Product[] }) {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  const results = useMemo(() => {
    if (!query.trim()) return [];
    const q = query.toLowerCase();
    return products
      .filter(p => p.name.toLowerCase().includes(q) || p.category.toLowerCase().includes(q))
      .slice(0, 6);
  }, [query, products]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (results[0]) navigate(`/product/${results[0].id}`);
  };

  return (
    <section className="bg-white py-8 md:py-10 border-b border-gray-100">
      <div className="container mx-auto px-6">
        <div className="relative max-w-2xl mx-auto">
          <form onSubmit={handleSubmit} className="relative">
            <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search for ACs, refrigerators, TVs, and more..."
              className="w-full pl-14 pr-12 py-4 md:py-5 text-base rounded-full border-2 border-gray-200 focus:border-brand focus:outline-none focus:ring-4 focus:ring-brand/10 shadow-sm transition-all"
            />
            {query && (
              <button
                type="button"
                onClick={() => setQuery('')}
                className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-brand"
              >
                <X className="w-5 h-5" />
              </button>
            )}
          </form>

          <AnimatePresence>
            {results.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden z-30"
              >
                {results.map(product => (
                  <Link
                    key={product.id}
                    to={`/product/${product.id}`}
                    onClick={() => setQuery('')}
                    className="flex items-center gap-4 px-5 py-3 hover:bg-gray-50 transition-colors"
                  >
                    <div className="w-12 h-12 bg-white border border-gray-100 rounded-lg overflow-hidden shrink-0 p-1">
                      <img src={product.image} alt={product.name} className="w-full h-full object-contain" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-luxury-charcoal truncate">{product.name}</p>
                      <p className="text-xs text-gray-400">{product.category}</p>
                    </div>
                    <p className="text-sm font-semibold text-luxury-charcoal shrink-0">{formatPrice(product.price)}</p>
                  </Link>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}

export function Home() {
  const { pathname } = useLocation();
  const { products: PRODUCTS } = useProducts();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  const bestSellers = PRODUCTS.filter(p => p.isBestSeller);
  const acProducts = PRODUCTS.filter(p => p.category === 'Air Conditioners').slice(0, 10);
  const refrigerators = PRODUCTS.filter(p => p.category === 'Refrigerators').slice(0, 10);
  const ledTvs = PRODUCTS.filter(p => p.category === 'LED TVs').slice(0, 10);
  const washingMachines = PRODUCTS.filter(p => p.category === 'Washing Machines').slice(0, 10);
  const deepFreezers = PRODUCTS.filter(p => p.category === 'Deep Freezers').slice(0, 10);
  const homeAppliances = PRODUCTS.filter(p =>
    ['Home Appliances', 'Ovens', 'Fans', 'Coolers', 'Blenders', 'Juicers', 'Air Fryers'].includes(p.category)
  ).slice(0, 10);

  return (
    <main>
      {/* 1. Main banner */}
      <Hero />

      {/* 2. Immediate product lineup + highly visible search */}
      <HomeSearchBar products={PRODUCTS} />
      <ProductGrid title="Best Sellers" products={bestSellers} />

      {/* 3. Clear categories to tap and filter */}
      <CategoryShowcase />

      <Marquee />

      {/* Air Conditioners */}
      <div className="bg-white">
        <ProductGrid title="Air Conditioners" products={acProducts} viewAllLink="/category/ac" />
      </div>

      {/* Refrigerators */}
      <div className="bg-luxury-grey/30">
        <ProductGrid title="Refrigerators" products={refrigerators} viewAllLink="/category/refrigerators" />
      </div>

      {/* LED TVs */}
      <div className="bg-white">
        <ProductGrid title="LED TVs" products={ledTvs} viewAllLink="/category/tv" />
      </div>

      {/* Home Appliances — featured section */}
      <section className="py-20 md:py-28 bg-gradient-to-b from-gray-50 to-white overflow-hidden">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-14"
          >
            <span className="inline-block px-4 py-1.5 bg-brand/5 text-brand text-[11px] uppercase tracking-[0.3em] font-semibold rounded-full mb-4">
              Daily Essentials
            </span>
            <h2 className="text-3xl md:text-5xl font-semibold text-luxury-charcoal mb-4">
              Home Appliances
            </h2>
            <p className="text-gray-500 text-base max-w-lg mx-auto">
              Quality appliances for everyday life — toasters, kettles, irons, mixers, and more.
            </p>
          </motion.div>

          {/* Quick category pills */}
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {[
              { icon: Coffee, label: 'Kitchen' },
              { icon: Zap, label: 'Electrical' },
              { icon: WindIcon, label: 'Cleaning' },
              { icon: Utensils, label: 'Cooking' },
              { icon: Sparkles, label: 'Laundry' },
            ].map((pill, i) => (
              <motion.div
                key={pill.label}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="flex items-center gap-2 px-5 py-2.5 bg-white rounded-full border border-gray-200 text-sm text-gray-600 shadow-sm"
              >
                <pill.icon className="w-4 h-4 text-brand" />
                {pill.label}
              </motion.div>
            ))}
          </div>

          {/* Featured product + grid layout */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Large featured card */}
            {homeAppliances[0] && (
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="lg:col-span-5"
              >
                <Link to={`/product/${homeAppliances[0].id}`} className="group block relative rounded-2xl overflow-hidden h-full min-h-[400px] bg-white border border-gray-100">
                  <img
                    src={homeAppliances[0].image}
                    alt={homeAppliances[0].name}
                    className="w-full h-full object-contain absolute inset-0 p-10 group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-black/70 via-black/20 to-transparent">
                    {homeAppliances[0].isBestSeller && (
                      <span className="inline-block bg-brand text-white text-[10px] uppercase tracking-wider px-3 py-1 rounded-full font-semibold mb-3">
                        Best Seller
                      </span>
                    )}
                    <h3 className="text-white text-2xl font-bold mb-2">{homeAppliances[0].name}</h3>
                    <p className="text-white/70 text-sm mb-3 line-clamp-2">{homeAppliances[0].description}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-white text-xl font-bold">{formatPrice(homeAppliances[0].price)}</span>
                      <span className="text-white/60 text-xs uppercase tracking-wider group-hover:text-white transition-colors flex items-center gap-1">
                        View Details <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                      </span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            )}

            {/* Product grid */}
            <div className="lg:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-4">
              {homeAppliances.slice(1, 7).map((product, index) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.06 }}
                >
                  <Link to={`/product/${product.id}`} className="group block bg-white rounded-xl border border-gray-100 overflow-hidden hover:shadow-lg hover:border-gray-200 transition-all duration-300">
                    <div className="aspect-square overflow-hidden bg-white p-3">
                      <img
                        src={product.image}
                        alt={product.name}
                        loading="lazy"
                        className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                    <div className="p-3.5">
                      <h3 className="text-sm font-semibold text-luxury-charcoal mb-1 line-clamp-1 group-hover:text-brand transition-colors">
                        {product.name}
                      </h3>
                      <p className="text-base font-bold text-luxury-charcoal">
                        {formatPrice(product.price)}
                      </p>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>

          {/* View all CTA */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <Link
              to="/category/home-appliances"
              className="inline-flex items-center gap-3 px-8 py-3.5 bg-brand text-white text-sm font-semibold uppercase tracking-wider rounded-full hover:bg-brand-dark transition-colors"
            >
              View All Home Appliances <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Washing Machines */}
      <div className="bg-white">
        <ProductGrid title="Washing Machines" products={washingMachines} viewAllLink="/category/washing-machine" />
      </div>

      {/* Deep Freezers */}
      <div className="bg-luxury-grey/30">
        <ProductGrid title="Deep Freezers" products={deepFreezers} viewAllLink="/category/deep-freeze" />
      </div>

      <StatementBanner />
    </main>
  );
}
