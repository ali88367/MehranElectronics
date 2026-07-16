import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';

export function CategoryShowcase() {
  return (
    <section className="py-16 bg-white">
      <div className="mx-auto px-6 max-w-[1800px]">
        <Link to="/tcl-center" className="group block">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative overflow-hidden w-full rounded-sm shadow-md group-hover:shadow-xl transition-all duration-500"
          >
            <img
              src="/tcl.png"
              alt="TCL Center"
              className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105"
            />
          </motion.div>
        </Link>
      </div>
    </section>
  );
}
