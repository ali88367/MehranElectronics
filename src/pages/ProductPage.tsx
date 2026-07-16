import React, { useEffect } from 'react';
import { useParams, Link, useLocation } from 'react-router-dom';
import { motion } from 'motion/react';
import { MessageCircle, Check, Truck, ShieldCheck, ArrowLeft } from 'lucide-react';
import { useProducts } from '@/hooks/useProducts';
import { formatPrice, formatFeature } from '@/lib/utils';
import { ProductCard } from '@/components/ProductGrid';
import { CATEGORIES } from '@/data/mock';

export function ProductPage() {
  const { id } = useParams();
  const { pathname } = useLocation();
  const { products: PRODUCTS } = useProducts();
  const product = PRODUCTS.find(p => p.id === id);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-serif mb-4">Product Not Found</h2>
          <Link to="/" className="text-luxury-charcoal underline">Return Home</Link>
        </div>
      </div>
    );
  }

  const relatedProducts = PRODUCTS.filter(p => p.category === product.category && p.id !== product.id).slice(0, 4);
  const categoryId = CATEGORIES.find(c => c.name === product.category)?.id;

  const whatsappMessage = encodeURIComponent(
    `Hello New Mehran Electronics!\n\nI would like to order:\n\n*Product:* ${product.name}${product.model ? `\n*Model:* ${product.model}` : ''}\n*Price:* ${formatPrice(product.price)}\n\nPlease confirm availability.`
  );

  return (
    <div className="pt-24 pb-16 min-h-screen bg-white">
      <div className="container mx-auto px-6">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-gray-400 mb-8">
          <Link to="/" className="hover:text-luxury-charcoal transition-colors">Home</Link>
          <span>/</span>
          {categoryId ? (
            <Link to={`/category/${categoryId}`} className="hover:text-luxury-charcoal transition-colors">{product.category}</Link>
          ) : (
            <span>{product.category}</span>
          )}
          <span>/</span>
          <span className="text-luxury-charcoal">{product.name}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
          {/* Left: Image Gallery */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            <div className="aspect-square bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-sm p-8">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-contain hover:scale-105 transition-transform duration-700"
              />
            </div>
          </motion.div>

          {/* Right: Details */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="flex flex-col justify-center"
          >
            <span className="text-sm uppercase tracking-widest text-gray-500 mb-4">{product.category}</span>
            <h1 className="font-serif text-3xl md:text-4xl text-luxury-charcoal mb-4 leading-tight">
              {product.name}
            </h1>
            {product.model && (
              <p className="text-sm text-gray-400 mb-4 uppercase tracking-wider">Model: {product.model}</p>
            )}
            <p className="text-2xl font-light text-luxury-charcoal mb-8">
              {formatPrice(product.price)}
            </p>

            <div className="prose prose-lg text-gray-600 mb-10">
              <p>{product.description}</p>
            </div>

            <div className="space-y-6 mb-12">
              <h3 className="font-serif text-xl border-b border-gray-200 pb-2">Key Features</h3>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {product.features.map((feature, idx) => (
                  <li key={idx} className="flex items-center space-x-3 text-gray-600">
                    <span className="w-1.5 h-1.5 bg-brand rounded-full shrink-0" />
                    <span>{formatFeature(feature)}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 mb-10">
              <a
                href={`https://wa.me/923126610110?text=${whatsappMessage}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 bg-green-600 text-white py-4 px-8 rounded-lg flex items-center justify-center space-x-3 hover:bg-green-700 transition-all shadow-lg hover:shadow-xl"
              >
                <MessageCircle className="w-5 h-5" />
                <span className="uppercase tracking-widest font-semibold text-sm">Order on WhatsApp</span>
              </a>
            </div>

            <div className="grid grid-cols-3 gap-4 text-center border-t border-gray-100 pt-8">
              <div className="flex flex-col items-center space-y-2">
                <Truck className="w-6 h-6 text-gray-400" />
                <span className="text-xs uppercase tracking-wide text-gray-500">Free Delivery</span>
              </div>
              <div className="flex flex-col items-center space-y-2">
                <ShieldCheck className="w-6 h-6 text-gray-400" />
                <span className="text-xs uppercase tracking-wide text-gray-500">Official Warranty</span>
              </div>
              <div className="flex flex-col items-center space-y-2">
                <Check className="w-6 h-6 text-gray-400" />
                <span className="text-xs uppercase tracking-wide text-gray-500">100% Authentic</span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <section className="mt-24 pt-16 border-t border-gray-100">
            <h2 className="font-serif text-2xl text-luxury-charcoal mb-2">You May Also Like</h2>
            <div className="h-1 w-16 bg-brand mb-12" />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {relatedProducts.map((p, index) => (
                <motion.div
                  key={p.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <ProductCard product={p} />
                </motion.div>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
