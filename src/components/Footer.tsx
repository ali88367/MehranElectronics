import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Instagram, Twitter, MapPin, Phone, Mail } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-white text-luxury-charcoal pt-20 pb-10 border-t-4 border-brand">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          {/* Brand */}
          <div className="space-y-6">
            <div>
              <img src="/logo.png" alt="New Mehran Electronics" className="h-14 w-auto object-contain" />
            </div>
            <p className="text-gray-500 text-sm leading-relaxed">
              New Mehran Electronics is not just a store; it is a destination for those who seek the exceptional. We bridge the gap between cutting-edge technology and timeless elegance.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-500 hover:text-brand transition-colors"><Facebook className="w-5 h-5" /></a>
              <a href="#" className="text-gray-500 hover:text-brand transition-colors"><Instagram className="w-5 h-5" /></a>
              <a href="#" className="text-gray-500 hover:text-brand transition-colors"><Twitter className="w-5 h-5" /></a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-serif text-lg mb-6">Quick Links</h4>
            <ul className="space-y-4 text-sm text-gray-500">
              <li><Link to="/" className="hover:text-brand transition-colors">Home</Link></li>
              <li><Link to="/about" className="hover:text-brand transition-colors">About Us</Link></li>
              <li><Link to="/tcl-center" className="hover:text-brand transition-colors">TCL Center</Link></li>
              <li><a href="https://wa.me/923126610110" target="_blank" rel="noopener noreferrer" className="hover:text-brand transition-colors">Contact</a></li>
              <li><Link to="/faq" className="hover:text-brand transition-colors">FAQs</Link></li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h4 className="font-serif text-lg mb-6">Categories</h4>
            <ul className="space-y-4 text-sm text-gray-500">
              <li><Link to="/category/ac" className="hover:text-brand transition-colors">Air Conditioners</Link></li>
              <li><Link to="/category/refrigerators" className="hover:text-brand transition-colors">Refrigerators</Link></li>
              <li><Link to="/category/tv" className="hover:text-brand transition-colors">LED TVs</Link></li>
              <li><Link to="/category/washing-machine" className="hover:text-brand transition-colors">Washing Machines</Link></li>
              <li><Link to="/category/home-appliances" className="hover:text-brand transition-colors">Home Appliances</Link></li>
              <li><Link to="/category/deep-freeze" className="hover:text-brand transition-colors">Deep Freezers</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-serif text-lg mb-6">Contact Us</h4>
            <ul className="space-y-4 text-sm text-gray-500">
              <li className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 mt-0.5 shrink-0" />
                <span>TCL Center 7 Flagship Store, Main Market, Town</span>
              </li>
              <li className="flex items-center space-x-3">
                <Phone className="w-5 h-5 shrink-0" />
                <a href="tel:+923126610110" className="hover:text-brand transition-colors">0312-6610110</a>
              </li>
              <li className="flex items-center space-x-3">
                <Mail className="w-5 h-5 shrink-0" />
                <span>info@mehranelectronics.pk</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-200 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-gray-500">
          <p>&copy; {new Date().getFullYear()} New Mehran Electronics. All rights reserved.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link to="/privacy" className="hover:text-brand transition-colors">Privacy Policy</Link>
            <Link to="/terms" className="hover:text-brand transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
