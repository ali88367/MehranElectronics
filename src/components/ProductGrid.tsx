import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import { Product } from '@/data/mock';
import { formatPrice } from '@/lib/utils';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  return (
    <Link to={`/product/${product.id}`} className="group block">
      <div className="relative bg-white rounded-xl overflow-hidden mb-4 border border-gray-100">
        <div className="aspect-square overflow-hidden bg-white p-4">
          <img
            src={product.image}
            alt={product.name}
            loading="lazy"
            className="w-full h-full object-contain transition-transform duration-700 group-hover:scale-105"
          />
        </div>

        <div className="hidden md:block absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
          <button className="w-full bg-white/90 backdrop-blur text-luxury-charcoal py-3 text-xs uppercase tracking-widest font-semibold hover:bg-brand hover:text-white transition-colors shadow-lg">
            View Details
          </button>
        </div>

        <div className="absolute top-3 left-3 z-10 flex flex-col gap-1.5">
          {product.isBestSeller && (
            <span className="bg-brand text-white text-[10px] uppercase tracking-wider px-2.5 py-1 rounded-sm shadow-sm">
              Best Seller
            </span>
          )}
          {product.isFeatured && (
            <span className="bg-white text-luxury-charcoal text-[10px] uppercase tracking-wider px-2.5 py-1 rounded-sm shadow-sm border border-gray-100">
              Featured
            </span>
          )}
        </div>
      </div>

      <div className="text-center px-1">
        <h3 className="text-base text-luxury-charcoal mb-1 line-clamp-1 group-hover:text-brand transition-colors">
          {product.name}
        </h3>
        <p className="text-sm font-medium text-gray-500 mb-2 line-clamp-1">{product.category}</p>
        <p className="font-semibold text-luxury-charcoal">{formatPrice(product.price)}</p>
      </div>
    </Link>
  );
}

interface ProductGridProps {
  title: string;
  products: Product[];
  viewAllLink?: string;
}

export function ProductGrid({ title, products, viewAllLink }: ProductGridProps) {
  return (
    <section className="py-16">
      <div className="container mx-auto px-6">
        <div className="flex justify-between items-end mb-8">
          <div>
            <h2 className="text-2xl md:text-3xl font-semibold text-luxury-charcoal mb-2">{title}</h2>
            <div className="h-1 w-20 bg-brand" />
          </div>
          {viewAllLink && (
            <Link
              to={viewAllLink}
              className="hidden md:flex items-center space-x-2 text-sm uppercase tracking-widest font-medium hover:text-brand transition-colors"
            >
              <span>View All</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          )}
        </div>

        <div className="flex gap-4 sm:gap-5 overflow-x-auto scrollbar-hide pb-4 -mx-6 px-6 snap-x snap-mandatory">
          {products.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              className="min-w-[46vw] w-[46vw] sm:min-w-[280px] sm:w-[280px] lg:min-w-[320px] lg:w-[320px] shrink-0 snap-start"
            >
              <ProductCard product={product} />
            </motion.div>
          ))}
        </div>

        {viewAllLink && (
          <div className="mt-6 text-center md:hidden">
            <Link
              to={viewAllLink}
              className="inline-flex items-center space-x-2 text-sm uppercase tracking-widest font-medium border-b border-brand text-brand pb-1"
            >
              <span>View All</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
