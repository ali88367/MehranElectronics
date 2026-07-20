import React, { useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowLeft, ShieldCheck, Truck, Award, HeadphonesIcon } from 'lucide-react';

const VALUES = [
  {
    icon: ShieldCheck,
    title: 'Official Warranty',
    description: 'Every product comes with official manufacturer warranty for your peace of mind.',
  },
  {
    icon: Truck,
    title: 'Free Delivery',
    description: 'Complimentary delivery and professional installation across the city.',
  },
  {
    icon: Award,
    title: '100% Authentic',
    description: 'We only deal in genuine, brand-new products from authorized distributors.',
  },
  {
    icon: HeadphonesIcon,
    title: 'Premium Support',
    description: 'Dedicated after-sales support to ensure your complete satisfaction.',
  },
];

export function AboutPage() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <div className="relative h-[40vh] min-h-[320px] bg-white overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-brand-light to-white" />
        <div className="relative z-10 container mx-auto px-6 h-full flex flex-col justify-end pb-12">
          <Link to="/" className="inline-flex items-center text-sm text-gray-500 hover:text-brand mb-6 transition-colors w-fit">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Link>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl md:text-4xl font-semibold text-luxury-charcoal mb-3"
          >
            About New Mehran
          </motion.h1>
          <motion.div
            initial={{ opacity: 0, width: 0 }}
            animate={{ opacity: 1, width: '60px' }}
            transition={{ delay: 0.2 }}
            className="h-1 bg-brand"
          />
        </div>
      </div>

      {/* Story Section */}
      <section className="py-24">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <span className="text-sm uppercase tracking-[0.3em] text-brand mb-4 block">Our Story</span>
              <h2 className="text-2xl md:text-3xl font-semibold text-luxury-charcoal mb-8 leading-tight">
                Where Technology Meets Trust
              </h2>
              <div className="space-y-6 text-gray-500 leading-relaxed">
                <p>
                  New Mehran Electronics was founded with a singular vision: to bring the finest home appliances to discerning customers who value quality, reliability, and elegance.
                </p>
                <p>
                  From premium air conditioners and refrigerators to state-of-the-art LED TVs and kitchen appliances, we curate only the best from the world's most trusted brands. Every product in our collection is carefully selected to ensure it meets our exacting standards.
                </p>
                <p>
                  We believe that your home deserves the extraordinary. That's why we go beyond just selling appliances — we deliver a complete experience with professional installation, official warranty, and dedicated after-sales support.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="aspect-[4/5] bg-white border border-gray-100 rounded-2xl overflow-hidden p-6">
                <img
                  src="/banner11.png"
                  alt="New Mehran Electronics Store"
                  className="w-full h-full object-contain"
                />
              </div>
              <div className="absolute -bottom-8 -left-8 bg-brand text-white p-8 rounded-xl shadow-2xl hidden md:block">
                <p className="text-4xl font-bold mb-1">10+</p>
                <p className="text-sm text-white/70 uppercase tracking-wider">Years of Trust</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-24 bg-luxury-grey/30">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-2xl md:text-3xl font-semibold text-luxury-charcoal mb-4"
            >
              Why Choose New Mehran
            </motion.h2>
            <motion.div
              initial={{ opacity: 0, width: 0 }}
              whileInView={{ opacity: 1, width: '60px' }}
              viewport={{ once: true }}
              className="h-1 bg-brand mx-auto"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {VALUES.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white p-8 rounded-xl text-center group hover:shadow-xl transition-shadow duration-300"
              >
                <div className="w-16 h-16 bg-brand/5 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-brand group-hover:text-white transition-all duration-300">
                  <value.icon className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-semibold text-luxury-charcoal mb-3">{value.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-brand text-white text-center">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-2xl md:text-3xl font-semibold mb-6">Ready to Upgrade Your Home?</h2>
            <p className="text-white/80 text-lg mb-10 max-w-lg mx-auto">
              Visit our store or browse our collection online. We're here to help you find the perfect fit.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/category/home-appliances"
                className="px-10 py-4 bg-white text-brand font-semibold text-sm uppercase tracking-wider rounded-lg hover:bg-gray-100 transition-colors"
              >
                Browse Categories
              </Link>
              <a
                href="https://wa.me/923126610110"
                target="_blank"
                rel="noopener noreferrer"
                className="px-10 py-4 border border-white/30 font-semibold text-sm uppercase tracking-wider rounded-lg hover:bg-white hover:text-brand transition-all"
              >
                Contact Us
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
