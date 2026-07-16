import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, Search, MessageCircle, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { SearchModal } from '@/components/SearchModal';

export function Header() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsSearchOpen(true);
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  useEffect(() => {
    setIsDrawerOpen(false);
  }, [location]);

  useEffect(() => {
    document.body.style.overflow = isDrawerOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isDrawerOpen]);

  const navLinks = [
    { name: 'Home Appliances', href: '/category/home-appliances' },
    { name: 'Air Conditioners', href: '/category/ac' },
    { name: 'Refrigerators', href: '/category/refrigerators' },
    { name: 'LED TVs', href: '/category/tv' },
    { name: 'TCL Center', href: '/tcl-center' },
  ];

  const moreCategories = [
    { name: 'Washing Machines', href: '/category/washing-machine' },
    { name: 'Deep Freezers', href: '/category/deep-freeze' },
    { name: 'Ovens', href: '/category/ovens' },
    { name: 'Fans', href: '/category/fan' },
    { name: 'Coolers', href: '/category/cooler' },
    { name: 'Blenders', href: '/category/blender' },
    { name: 'Juicers', href: '/category/juicer' },
    { name: 'Air Fryers', href: '/category/air-fryer' },
  ];

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 bg-white shadow-md border-b border-gray-100">
        {/* Desktop Header */}
        <div className="hidden lg:block">
          <div className="px-6 flex items-center justify-between">
            <Link to="/" className="flex items-center gap-3 group shrink-0">
              <img
                src="/logo.png"
                alt="New Mehran Electronics"
                className="h-20 w-auto object-contain transition-transform group-hover:scale-105"
              />
              <div className="leading-tight">
                <h1 className="font-serif text-2xl tracking-wider font-semibold text-luxury-charcoal">
                  NEW MEHRAN
                </h1>
                <span className="text-xs tracking-[0.25em] uppercase text-gray-500 font-medium">
                  Electronics
                </span>
              </div>
            </Link>

            <nav className="flex items-center gap-5">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.href}
                  className={cn(
                    'relative text-[11px] font-semibold tracking-wider uppercase whitespace-nowrap transition-colors group py-2',
                    location.pathname === link.href ? 'text-brand' : 'text-gray-400 hover:text-brand'
                  )}
                >
                  {link.name}
                  <span className={cn(
                    'absolute bottom-0 left-0 h-[2px] bg-brand transition-all duration-300',
                    location.pathname === link.href ? 'w-full' : 'w-0 group-hover:w-full'
                  )} />
                </Link>
              ))}
            </nav>

            <div className="flex items-center space-x-4 shrink-0">
              <button onClick={() => setIsSearchOpen(true)} className="hover:opacity-70 transition-opacity">
                <Search className="w-4 h-4" />
              </button>
              <Link
                to="/contact"
                className="px-5 py-2 bg-brand text-white text-[10px] font-semibold uppercase tracking-widest transition-all hover:bg-brand-dark"
              >
                Contact
              </Link>
            </div>
          </div>
        </div>

        {/* Mobile Header */}
        <div className="lg:hidden">
          <div className="container mx-auto px-4 flex items-center justify-between py-2">
            <Link to="/" className="flex items-center gap-2.5 group shrink-0">
              <img
                src="/logo.png"
                alt="New Mehran Electronics"
                className="h-11 w-auto object-contain"
              />
              <div className="leading-tight">
                <h1 className="font-serif text-base tracking-wider font-semibold text-luxury-charcoal">
                  NEW MEHRAN
                </h1>
                <span className="text-[7px] tracking-[0.2em] uppercase text-gray-500">
                  Electronics
                </span>
              </div>
            </Link>

            <div className="flex items-center gap-1">
              <button
                onClick={() => setIsSearchOpen(true)}
                className="p-2.5 hover:bg-gray-100 rounded-full transition-colors"
              >
                <Search className="w-5 h-5 text-luxury-charcoal" />
              </button>
              <a
                href="https://wa.me/923126610110"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 hover:bg-gray-100 rounded-full transition-colors"
              >
                <MessageCircle className="w-5 h-5 text-green-600" />
              </a>
              <button
                className="p-2.5 hover:bg-gray-100 rounded-full transition-colors"
                onClick={() => setIsDrawerOpen(true)}
              >
                <Menu className="w-6 h-6 text-luxury-charcoal" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isDrawerOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 z-[60] lg:hidden"
              onClick={() => setIsDrawerOpen(false)}
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'tween', duration: 0.3, ease: 'easeOut' }}
              className="fixed top-0 right-0 bottom-0 w-[85%] max-w-[380px] bg-white z-[70] shadow-2xl flex flex-col lg:hidden"
            >
              <div className="flex items-center justify-between p-5 border-b border-gray-100">
                <Link to="/" onClick={() => setIsDrawerOpen(false)} className="flex items-center gap-3">
                  <img src="/logo.png" alt="New Mehran Electronics" className="h-10 w-auto object-contain" />
                  <span className="font-serif text-base tracking-wider font-semibold">NEW MEHRAN</span>
                </Link>
                <button onClick={() => setIsDrawerOpen(false)} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto">
                <div className="px-5 pt-5 pb-2">
                  <p className="text-[10px] uppercase tracking-[0.2em] text-gray-400 font-semibold">Menu</p>
                </div>
                {navLinks.map((link) => (
                  <Link
                    key={link.name}
                    to={link.href}
                    onClick={() => setIsDrawerOpen(false)}
                    className={cn(
                      'flex items-center justify-between px-5 py-3.5 text-[15px] font-medium transition-colors',
                      location.pathname === link.href
                        ? 'bg-brand/5 text-brand border-r-2 border-brand'
                        : 'text-gray-600 hover:bg-gray-50'
                    )}
                  >
                    {link.name}
                    <ChevronRight className="w-4 h-4 text-gray-400" />
                  </Link>
                ))}

                <div className="px-5 pt-6 pb-2">
                  <p className="text-[10px] uppercase tracking-[0.2em] text-gray-400 font-semibold">More Categories</p>
                </div>
                {moreCategories.map((link) => (
                  <Link
                    key={link.name}
                    to={link.href}
                    onClick={() => setIsDrawerOpen(false)}
                    className="flex items-center justify-between px-5 py-3 text-sm text-gray-500 hover:bg-gray-50 transition-colors"
                  >
                    {link.name}
                    <ChevronRight className="w-4 h-4 text-gray-300" />
                  </Link>
                ))}
              </div>

              <div className="p-5 border-t border-gray-100 space-y-3">
                <a
                  href="https://wa.me/923126610110"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full py-3.5 bg-green-600 text-white uppercase tracking-widest text-xs font-semibold hover:bg-green-700 transition-colors"
                >
                  <MessageCircle className="w-4 h-4" />
                  WhatsApp Order
                </a>
                <Link
                  to="/contact"
                  onClick={() => setIsDrawerOpen(false)}
                  className="block text-center py-3.5 border border-brand text-brand uppercase tracking-widest text-xs font-semibold hover:bg-brand hover:text-white transition-all"
                >
                  Contact Us
                </Link>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </>
  );
}
