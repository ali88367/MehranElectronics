import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';

const FEATURED_CATS = [
  {
    id: 'ac',
    name: 'Air Conditioners',
    image: '/ac.png',
    link: '/category/ac'
  },
  {
    id: 'washing-machine',
    name: 'Washing Machines',
    image: '/washing machine.png',
    link: '/category/home'
  },
  {
    id: 'refrigerators',
    name: 'Refrigerators',
    image: '/fridge.png',
    link: '/category/refrigerators'
  }
];

export function FeaturedCategories() {
  return (
    <section className="py-24 bg-luxury-grey/30">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-serif text-3xl md:text-4xl text-luxury-charcoal mb-4"
          >
            Signature Collections
          </motion.h2>
          <div className="h-1 w-20 bg-luxury-charcoal mx-auto" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {FEATURED_CATS.map((category, index) => (
            <Link 
              key={category.id} 
              to={category.link}
              className="group block text-center"
            >
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="relative overflow-hidden aspect-[4/5] mb-6 mx-auto w-full shadow-md group-hover:shadow-xl transition-all duration-500"
              >
                <div 
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                  style={{ backgroundImage: `url(${category.image})` }}
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-500" />
                
                {/* Overlay Title for a different look than the main categories */}
                <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/60 to-transparent text-left">
                  <h3 className="font-serif text-2xl text-white mb-1 translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                    {category.name}
                  </h3>
                  <div className="h-0.5 w-0 bg-white group-hover:w-12 transition-all duration-500 delay-100" />
                </div>
              </motion.div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
