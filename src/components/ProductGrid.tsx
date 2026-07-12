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
      <div className="relative bg-white rounded-xl overflow-hidden mb-4">
        <div className="aspect-[4/5] overflow-hidden bg-gray-100">
          <img
            src={product.image}
            alt={product.name}
            loading="lazy"
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
        </div>

        <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
          <button className="w-full bg-white/90 backdrop-blur text-luxury-charcoal py-3 text-xs uppercase tracking-widest font-semibold hover:bg-luxury-charcoal hover:text-white transition-colors shadow-lg">
            View Details
          </button>
        </div>

        <div className="absolute top-4 left-4 flex flex-col gap-2">
          {product.isBestSeller && (
            <span className="bg-luxury-charcoal text-white text-[10px] uppercase tracking-wider px-3 py-1">
              Best Seller
            </span>
          )}
          {product.isFeatured && (
            <span className="bg-white text-luxury-charcoal text-[10px] uppercase tracking-wider px-3 py-1 shadow-sm">
              Featured
            </span>
          )}
        </div>
      </div>

      <div className="text-center">
        <h3 className="font-serif text-lg text-luxury-charcoal mb-1 group-hover:text-gray-600 transition-colors">
          {product.name}
        </h3>
        <p className="text-sm font-medium text-gray-500 mb-2">{product.category}</p>
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
            <h2 className="font-serif text-2xl md:text-3xl text-luxury-charcoal mb-2">{title}</h2>
            <div className="h-1 w-20 bg-luxury-charcoal" />
          </div>
          {viewAllLink && (
            <Link
              to={viewAllLink}
              className="hidden md:flex items-center space-x-2 text-sm uppercase tracking-widest font-medium hover:opacity-60 transition-opacity"
            >
              <span>View All</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          )}
        </div>

        <div className="flex gap-5 overflow-x-auto scrollbar-hide pb-4 -mx-6 px-6 snap-x snap-mandatory">
          {products.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              className="min-w-[260px] w-[260px] sm:min-w-[300px] sm:w-[300px] lg:min-w-[340px] lg:w-[340px] shrink-0 snap-start"
            >
              <ProductCard product={product} />
            </motion.div>
          ))}
        </div>

        {viewAllLink && (
          <div className="mt-6 text-center md:hidden">
            <Link
              to={viewAllLink}
              className="inline-flex items-center space-x-2 text-sm uppercase tracking-widest font-medium border-b border-luxury-charcoal pb-1"
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
