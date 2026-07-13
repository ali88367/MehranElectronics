import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { CATEGORIES } from '@/data/mock';

const HIDDEN_ON_HOME = new Set(['ovens', 'fan', 'cooler', 'blender', 'juicer', 'air-fryer']);

export function CategoryShowcase() {
  const homeCategories = CATEGORIES.filter(c => !HIDDEN_ON_HOME.has(c.id));

  return (
    <section className="py-16 bg-white">
      <div className="mx-auto px-6 max-w-[1800px]">
        <div className="flex justify-between items-end mb-8">
          <div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="font-serif text-2xl md:text-3xl text-luxury-charcoal mb-2"
            >
              Explore Categories
            </motion.h2>
            <div className="h-1 w-16 bg-brand" />
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {homeCategories.map((category, index) => (
            <Link
              key={category.id}
              to={`/category/${category.id}`}
              className="group block"
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.04 }}
                className="relative overflow-hidden w-full aspect-[3/4] shadow-md group-hover:shadow-xl transition-all duration-500 rounded-sm"
              >
                <div
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                  style={{ backgroundImage: `url(${category.image})` }}
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors duration-500" />
                <div className="absolute bottom-0 left-0 right-0 p-3 md:p-4 bg-gradient-to-t from-black/70 to-transparent">
                  <h3 className="font-serif text-sm md:text-base text-white leading-tight">
                    {category.name}
                  </h3>
                </div>
              </motion.div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
