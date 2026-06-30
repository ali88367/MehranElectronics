import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MessageCircle, X } from 'lucide-react';

export function WhatsAppButton() {
  const [showTooltip, setShowTooltip] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 2000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (isVisible) {
      const tooltipTimer = setTimeout(() => setShowTooltip(true), 4000);
      return () => clearTimeout(tooltipTimer);
    }
  }, [isVisible]);

  const whatsappLink = 'https://wa.me/923126610110?text=' + encodeURIComponent('Hello New Mehran Electronics! I would like to inquire about your products.');

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, scale: 0, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0 }}
          className="fixed bottom-6 right-6 z-50 flex items-end gap-3"
        >
          {/* Tooltip */}
          <AnimatePresence>
            {showTooltip && (
              <motion.div
                initial={{ opacity: 0, x: 10, scale: 0.9 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: 10, scale: 0.9 }}
                className="bg-white rounded-xl shadow-xl p-4 max-w-[220px] relative"
              >
                <button
                  onClick={() => setShowTooltip(false)}
                  className="absolute -top-2 -right-2 w-6 h-6 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors"
                >
                  <X className="w-3 h-3 text-gray-500" />
                </button>
                <p className="text-sm text-luxury-charcoal font-medium mb-1">Need Help?</p>
                <p className="text-xs text-gray-500">Chat with us on WhatsApp for instant assistance!</p>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Button */}
          <a
            href={whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="w-14 h-14 bg-luxury-charcoal rounded-full flex items-center justify-center shadow-lg hover:bg-black hover:shadow-xl hover:scale-110 transition-all duration-300 group"
            onClick={() => setShowTooltip(false)}
          >
            <MessageCircle className="w-7 h-7 text-white" />
            <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full animate-pulse" />
          </a>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
