import React, { useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { MapPin, Phone, Mail, Clock, MessageCircle, ArrowLeft } from 'lucide-react';

export function ContactPage() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  const whatsappLink = 'https://wa.me/923126610110?text=' + encodeURIComponent('Hello New Mehran Electronics, I would like to inquire about your products.');

  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <div className="relative h-[35vh] min-h-[280px] bg-luxury-charcoal overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-luxury-charcoal to-gray-900" />
        <div className="relative z-10 container mx-auto px-6 h-full flex flex-col justify-end pb-12">
          <Link to="/" className="inline-flex items-center text-sm text-white/60 hover:text-white mb-6 transition-colors w-fit">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Link>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-serif text-3xl md:text-4xl text-white mb-3"
          >
            Get in Touch
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-white/60 text-lg"
          >
            We'd love to hear from you
          </motion.p>
        </div>
      </div>

      <div className="container mx-auto px-6 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="font-serif text-3xl text-luxury-charcoal mb-8">Visit Our Store</h2>
            <p className="text-gray-500 leading-relaxed mb-12">
              Experience our premium collection in person. Our knowledgeable staff is ready to help you find the perfect appliance for your home.
            </p>

            <div className="space-y-8">
              <div className="flex items-start gap-5">
                <div className="w-12 h-12 bg-luxury-charcoal/5 rounded-xl flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5 text-luxury-charcoal" />
                </div>
                <div>
                  <h3 className="font-semibold text-luxury-charcoal mb-1">Address</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">
                    123 Luxury Avenue, Premium District,<br />
                    City, Country
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-5">
                <div className="w-12 h-12 bg-luxury-charcoal/5 rounded-xl flex items-center justify-center shrink-0">
                  <Phone className="w-5 h-5 text-luxury-charcoal" />
                </div>
                <div>
                  <h3 className="font-semibold text-luxury-charcoal mb-1">Phone</h3>
                  <p className="text-gray-500 text-sm">+92 300 1234567</p>
                  <p className="text-gray-500 text-sm">+92 321 1234567</p>
                </div>
              </div>

              <div className="flex items-start gap-5">
                <div className="w-12 h-12 bg-luxury-charcoal/5 rounded-xl flex items-center justify-center shrink-0">
                  <Mail className="w-5 h-5 text-luxury-charcoal" />
                </div>
                <div>
                  <h3 className="font-semibold text-luxury-charcoal mb-1">Email</h3>
                  <p className="text-gray-500 text-sm">info@mehranelectronics.com</p>
                </div>
              </div>

              <div className="flex items-start gap-5">
                <div className="w-12 h-12 bg-luxury-charcoal/5 rounded-xl flex items-center justify-center shrink-0">
                  <Clock className="w-5 h-5 text-luxury-charcoal" />
                </div>
                <div>
                  <h3 className="font-semibold text-luxury-charcoal mb-1">Store Hours</h3>
                  <p className="text-gray-500 text-sm">Monday – Saturday: 10:00 AM – 9:00 PM</p>
                  <p className="text-gray-500 text-sm">Sunday: 12:00 PM – 6:00 PM</p>
                </div>
              </div>
            </div>

            <div className="mt-12 flex flex-col sm:flex-row gap-4">
              <a
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-3 px-8 py-4 bg-luxury-charcoal text-white rounded-lg hover:bg-black transition-colors shadow-lg"
              >
                <MessageCircle className="w-5 h-5" />
                <span className="font-semibold text-sm uppercase tracking-wider">Chat on WhatsApp</span>
              </a>
              <a
                href="tel:+923126610110"
                className="flex items-center justify-center gap-3 px-8 py-4 border-2 border-luxury-charcoal text-luxury-charcoal rounded-lg hover:bg-luxury-charcoal hover:text-white transition-all"
              >
                <Phone className="w-5 h-5" />
                <span className="font-semibold text-sm uppercase tracking-wider">Call Us</span>
              </a>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="bg-luxury-grey/50 rounded-2xl p-8 md:p-12">
              <h2 className="font-serif text-2xl text-luxury-charcoal mb-2">Send a Message</h2>
              <p className="text-gray-500 text-sm mb-8">Fill out the form and we'll get back to you shortly.</p>

              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  const formData = new FormData(e.currentTarget);
                  const name = formData.get('name');
                  const phone = formData.get('phone');
                  const message = formData.get('message');
                  const whatsappMsg = encodeURIComponent(
                    `Hello New Mehran Electronics!\n\nName: ${name}\nPhone: ${phone}\n\n${message}`
                  );
                  window.open(`https://wa.me/923126610110?text=${whatsappMsg}`, '_blank');
                }}
                className="space-y-6"
              >
                <div>
                  <label className="block text-sm font-medium text-luxury-charcoal mb-2">Your Name</label>
                  <input
                    type="text"
                    name="name"
                    required
                    className="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-luxury-charcoal/20 focus:border-luxury-charcoal transition-all text-sm"
                    placeholder="Enter your name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-luxury-charcoal mb-2">Phone Number</label>
                  <input
                    type="tel"
                    name="phone"
                    required
                    className="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-luxury-charcoal/20 focus:border-luxury-charcoal transition-all text-sm"
                    placeholder="+92 300 0000000"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-luxury-charcoal mb-2">Message</label>
                  <textarea
                    name="message"
                    rows={4}
                    required
                    className="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-luxury-charcoal/20 focus:border-luxury-charcoal transition-all text-sm resize-none"
                    placeholder="Tell us what you're looking for..."
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-luxury-charcoal text-white py-4 rounded-lg font-semibold text-sm uppercase tracking-wider hover:bg-black transition-colors"
                >
                  Send via WhatsApp
                </button>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
