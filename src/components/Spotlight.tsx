import React from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

export function Spotlight() {
  return (
    <section className="py-24 bg-black text-white overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          
          {/* Text Content */}
          <div className="lg:w-1/2 z-10">
            <motion.span 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-luxury-gold text-sm uppercase tracking-[0.3em] mb-6 block"
            >
              Flagship Series
            </motion.span>
            
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="font-serif text-5xl md:text-7xl leading-none mb-8"
            >
              The Future <br />
              <span className="text-gray-500 italic">of Cooling</span>
            </motion.h2>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-gray-400 text-lg leading-relaxed mb-10 max-w-md"
            >
              Experience the Arctic Pro Series. AI-driven climate control that adapts to your life, ensuring perfect comfort with whisper-quiet operation.
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
            >
              <Link 
                to="/category/ac"
                className="inline-flex items-center space-x-4 group"
              >
                <div className="w-12 h-12 rounded-full border border-white/30 flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all duration-300">
                  <ArrowRight className="w-5 h-5" />
                </div>
                <span className="uppercase tracking-widest text-sm font-medium">Discover the Series</span>
              </Link>
            </motion.div>
          </div>

          {/* Image Composition */}
          <div className="lg:w-1/2 relative">
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative z-10"
            >
              <img 
                src="/ac.png" 
                alt="Luxury AC" 
                className="w-full h-[600px] object-cover grayscale hover:grayscale-0 transition-all duration-700 rounded-sm"
              />
            </motion.div>
            
            {/* Decorative Elements */}
            <div className="absolute -top-10 -right-10 w-64 h-64 border border-white/10 rounded-full animate-spin-slow" />
            <div className="absolute -bottom-10 -left-10 w-40 h-40 border border-white/10 rounded-full animate-spin-reverse-slow" />
          </div>
        </div>
      </div>
    </section>
  );
}
