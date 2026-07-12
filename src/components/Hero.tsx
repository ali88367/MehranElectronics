import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronRight, ChevronLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';

const SLIDES = [
  {
    id: 1,
    image: '/banner11.png',
    heading: 'Orchestrating the Art of Living',
    subtext: 'A symphony of design and performance, curated for the uncompromising.',
    buttonText: 'Explore Collection',
    link: '/collection',
    content: false
  },
  {
    id: 2,
    image: '/banner1122.png',
    heading: 'Where Innovation Meets Elegance',
    subtext: 'Intelligent solutions designed for the sophisticated home.',
    buttonText: 'View Smart Home',
    link: '/category/smart-home',
    content: false
  },
];

export function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const current = SLIDES[currentSlide];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % SLIDES.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % SLIDES.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + SLIDES.length) % SLIDES.length);

  return (
    <section className="relative h-screen w-full overflow-hidden bg-luxury-charcoal">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSlide}
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.5, ease: 'easeOut' }}
          className="absolute inset-0"
        >
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${current.image})` }}
          />
          {current.content && (
            <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent" />
          )}
        </motion.div>
      </AnimatePresence>

      {current.content && (
        <div className="relative z-10 container mx-auto px-6 h-full flex flex-col justify-center text-white">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="max-w-3xl"
            >
              <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl leading-tight mb-6 text-shadow-lg">
                {current.heading}
              </h2>
              <p className="text-base md:text-lg font-light opacity-90 mb-10 tracking-wide max-w-xl">
                {current.subtext}
              </p>
              <Link
                to={current.link}
                className="inline-flex items-center space-x-3 px-8 py-4 border border-white/50 hover:bg-white hover:text-luxury-charcoal transition-all duration-300 uppercase tracking-widest text-sm font-semibold group"
              >
                <span>{current.buttonText}</span>
                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>
          </AnimatePresence>
        </div>
      )}

      <div className="absolute bottom-10 right-10 z-20 flex space-x-4">
        <button
          onClick={prevSlide}
          className="p-3 border border-white/20 bg-black/20 text-white hover:bg-white hover:text-luxury-charcoal transition-all rounded-full"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <button
          onClick={nextSlide}
          className="p-3 border border-white/20 bg-black/20 text-white hover:bg-white hover:text-luxury-charcoal transition-all rounded-full"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex space-x-3">
        {SLIDES.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={cn(
              'w-12 h-1 transition-all duration-300',
              currentSlide === index ? 'bg-white' : 'bg-white/30 hover:bg-white/50'
            )}
          />
        ))}
      </div>
    </section>
  );
}
