import React from 'react';
import { motion } from 'motion/react';

const VALUES = [
  "Official Warranty",
  "Premium Support",
  "Free Installation",
  "Express Delivery",
  "Secure Payment",
  "Official Warranty",
  "Premium Support",
  "Free Installation",
  "Express Delivery",
  "Secure Payment"
];

export function Marquee() {
  return (
    <div className="bg-luxury-charcoal text-white py-4 overflow-hidden border-b border-white/10">
      <div className="flex whitespace-nowrap">
        <motion.div 
          className="flex space-x-12 px-6"
          animate={{ x: "-50%" }}
          transition={{ 
            repeat: Infinity, 
            ease: "linear", 
            duration: 20 
          }}
        >
          {[...VALUES, ...VALUES].map((item, index) => (
            <div key={index} className="flex items-center space-x-12">
              <span className="text-xs uppercase tracking-[0.2em] font-medium opacity-80">
                {item}
              </span>
              <div className="w-1 h-1 rounded-full bg-white/30" />
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
