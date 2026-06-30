import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';

export function StatementBanner() {
  return (
    <section className="py-32 bg-luxury-charcoal text-white relative overflow-hidden">
      <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
      <div className="container mx-auto px-6 relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="font-serif text-3xl md:text-4xl mb-8 leading-tight">
            The Choice of Distinguished Homes
          </h2>
          <p className="text-lg md:text-xl font-light opacity-80 mb-12 max-w-2xl mx-auto">
            Where engineering meets emotion. We don't just sell appliances; we curate experiences that elevate the everyday.
          </p>
          <Link
            to="/about"
            className="inline-block px-10 py-4 border border-white hover:bg-white hover:text-luxury-charcoal transition-all duration-300 uppercase tracking-widest text-sm font-semibold"
          >
            Discover More
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
