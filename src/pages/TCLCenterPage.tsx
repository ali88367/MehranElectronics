import React, { useEffect, useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { MessageCircle, ArrowRight, Phone, Tv, Wind, Refrigerator, ShieldCheck, Truck, Headphones, Award } from 'lucide-react';
import { useProducts } from '@/hooks/useProducts';
import { formatPrice } from '@/lib/utils';

const TCL_RED = '#E4002B';

export function TCLCenterPage() {
  const { pathname } = useLocation();
  const { products: PRODUCTS } = useProducts();
  const [activeTab, setActiveTab] = useState<'tv' | 'ac' | 'appliances'>('tv');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  const tclTVs = PRODUCTS.filter(p => p.category === 'LED TVs').slice(0, 4);
  const tclACs = PRODUCTS.filter(p => p.category === 'Air Conditioners').slice(0, 4);
  const tclAppliances = PRODUCTS.filter(p =>
    p.category === 'Refrigerators' || p.category === 'Washing Machines' || p.category === 'Deep Freezers'
  ).slice(0, 4);

  const tabProducts = activeTab === 'tv' ? tclTVs : activeTab === 'ac' ? tclACs : tclAppliances;
  const allTclProducts = [...tclTVs, ...tclACs].slice(0, 8);

  const whatsappLink = 'https://wa.me/923126610110?text=' + encodeURIComponent('Hello! I want to know more about TCL products at New Mehran Electronics.');

  const newArrivals = [
    {
      title: 'MiniLED & QLED TVs',
      tagline: 'Precision Light | Pure Brilliance',
      image: '/2.png',
      link: '/category/tv',
    },
    {
      title: 'Inverter Air Conditioners',
      tagline: 'Smart Air | Pure Comfort',
      image: '/4.png',
      link: '/category/ac',
    },
    {
      title: 'Home Appliances',
      tagline: 'Modern Living | Built to Last',
      image: '/1.png',
      link: '/category/home-appliances',
    },
  ];

  return (
    <div className="min-h-screen bg-white text-gray-900">

      {/* ── PROMO BANNER ── */}
      <div className="bg-[#E4002B] text-white text-center py-2.5 text-xs md:text-sm font-medium tracking-wide mt-[70px] lg:mt-[80px]">
        Free Nationwide Shipping &nbsp;|&nbsp; TCL Brand Warranty &nbsp;|&nbsp; Authorized Flagship Store
      </div>

      {/* ── HERO ── */}
      <section className="relative min-h-[70vh] md:min-h-[85vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img src="/tcl.jpeg" alt="" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-black/25 to-transparent" />
        </div>

        <div className="relative z-10 container mx-auto px-6 py-20">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="max-w-2xl"
          >
            <span className="inline-block px-4 py-1.5 text-[11px] uppercase tracking-[0.3em] font-semibold mb-6 rounded-full"
              style={{ backgroundColor: TCL_RED, color: 'white' }}>
              TCL Center 7 — Flagship Store
            </span>

            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight leading-[0.95] mb-6 text-white">
              Inspire
              <br />
              Greatness
            </h1>

            <p className="text-lg md:text-xl text-white/70 font-light max-w-lg mb-10">
              Experience TCL&apos;s complete lineup — MiniLED TVs, QLED displays, inverter ACs, and smart home appliances at New Mehran Electronics.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2.5 px-8 py-4 text-white text-sm font-semibold uppercase tracking-wider transition-all duration-300 hover:brightness-110 rounded"
                style={{ backgroundColor: TCL_RED }}
              >
                <MessageCircle className="w-4 h-4" />
                <span>Get in Touch</span>
              </a>
              <Link
                to="/category/tv"
                className="inline-flex items-center justify-center gap-2.5 px-8 py-4 border-2 border-white/40 text-white text-sm font-semibold uppercase tracking-wider hover:bg-white hover:text-gray-900 transition-all duration-300 rounded"
              >
                <span>Explore Products</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── TRUST STRIP ── */}
      <section className="bg-gray-50 border-b border-gray-200">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-gray-200">
            {[
              { icon: ShieldCheck, label: 'TCL Brand Warranty' },
              { icon: Truck, label: 'Free Nationwide Shipping' },
              { icon: Award, label: '100% Authentic Products' },
              { icon: Headphones, label: '24/7 Support' },
            ].map((item, i) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="flex items-center justify-center gap-3 py-5"
              >
                <item.icon className="w-5 h-5 shrink-0" style={{ color: TCL_RED }} />
                <span className="text-xs md:text-sm font-medium text-gray-700">{item.label}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── LIFESTYLE BANNER ── */}
      <section className="relative w-full">
        <div className="relative w-full h-[50vh] md:h-[70vh] overflow-hidden">
          <img src="/tcl1.png" alt="TCL MiniLED TV" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-8 md:p-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="max-w-2xl"
            >
              <span className="inline-block px-3 py-1 text-[10px] uppercase tracking-[0.25em] font-semibold rounded-full bg-white/20 text-white backdrop-blur-sm mb-4">
                New MiniLED Series 2026
              </span>
              <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white tracking-tight leading-tight mb-3">
                Precision Light.
                <br />
                Pure Brilliance.
              </h2>
              <p className="text-white/80 text-base md:text-lg max-w-lg mb-6">
                Experience breathtaking clarity with TCL&apos;s QD-Mini LED technology — vivid colors, deeper blacks, and cinema-grade visuals.
              </p>
              <Link
                to="/category/tv"
                className="inline-flex items-center gap-2 px-6 py-3 bg-white text-gray-900 text-sm font-semibold uppercase tracking-wider rounded hover:bg-gray-100 transition-all"
              >
                Shop Now <ArrowRight className="w-4 h-4" />
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── NEW ARRIVALS / CATEGORIES GRID ── */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-14"
          >
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-3">
              New Arrivals
            </h2>
            <p className="text-gray-500 text-base max-w-lg mx-auto">
              Discover the latest TCL products available at our flagship store
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {newArrivals.map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.12 }}
              >
                <Link to={item.link} className="group block relative rounded-xl overflow-hidden aspect-[3/4]">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
                    <p className="text-white/60 text-xs uppercase tracking-[0.2em] mb-2">{item.tagline}</p>
                    <h3 className="text-white text-xl md:text-2xl font-bold mb-4">{item.title}</h3>
                    <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-white group-hover:gap-3 transition-all">
                      Learn More <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TCL LIFESTYLE / TABBED PRODUCTS ── */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-3">
              TCL Product Range
            </h2>
            <p className="text-gray-500 text-base max-w-lg mx-auto">
              Browse our complete collection by category
            </p>
          </motion.div>

          <div className="flex justify-center gap-2 mb-12">
            {[
              { key: 'tv' as const, label: 'TV & Displays', icon: Tv },
              { key: 'ac' as const, label: 'Air Conditioners', icon: Wind },
              { key: 'appliances' as const, label: 'Home Appliances', icon: Refrigerator },
            ].map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 ${
                  activeTab === tab.key
                    ? 'text-white shadow-lg'
                    : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
                }`}
                style={activeTab === tab.key ? { backgroundColor: TCL_RED } : undefined}
              >
                <tab.icon className="w-4 h-4" />
                {tab.label}
              </button>
            ))}
          </div>

          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6"
          >
            {tabProducts.map((product) => (
              <Link key={product.id} to={`/product/${product.id}`} className="group block">
                <div className="bg-white rounded-xl overflow-hidden border border-gray-100 hover:shadow-xl hover:border-gray-200 transition-all duration-300">
                  <div className="aspect-square overflow-hidden bg-gray-50 p-4">
                    <img
                      src={product.image}
                      alt={product.name}
                      loading="lazy"
                      className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-4">
                    <p className="text-xs text-gray-400 uppercase tracking-wider mb-1">
                      {product.category}{product.model ? ` · ${product.model}` : ''}
                    </p>
                    <h3 className="text-sm font-semibold text-gray-900 mb-2 line-clamp-2 group-hover:text-[#E4002B] transition-colors">
                      {product.name}
                    </h3>
                    <p className="text-base font-bold" style={{ color: TCL_RED }}>
                      {formatPrice(product.price)}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </motion.div>

          <div className="text-center mt-10">
            <Link
              to={`/category/${activeTab === 'tv' ? 'tv' : activeTab === 'ac' ? 'ac' : 'home-appliances'}`}
              className="inline-flex items-center gap-2 px-8 py-3 text-sm font-semibold uppercase tracking-wider rounded-full border-2 transition-all duration-300 hover:text-white"
              style={{ borderColor: TCL_RED, color: TCL_RED }}
              onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = TCL_RED; e.currentTarget.style.color = 'white'; }}
              onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'transparent'; e.currentTarget.style.color = TCL_RED; }}
            >
              View All Products <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ── WHY CHOOSE US ── */}
      <section className="py-16 md:py-24 bg-gray-900 text-white">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-14"
          >
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-3">
              Why Choose TCL Center 7
            </h2>
            <p className="text-white/50 text-base">The TCL advantage at New Mehran Electronics</p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: 'Authorized Dealer', desc: 'Official TCL partnership with direct brand support and genuine products.' },
              { title: 'Official Warranty', desc: 'Complete manufacturer warranty on every product with hassle-free claims.' },
              { title: 'Expert Guidance', desc: 'Trained staff to help you choose the right product for your needs and budget.' },
              { title: 'After-Sales Service', desc: 'Dedicated support team for installation, maintenance, and repairs.' },
            ].map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-white/5 backdrop-blur rounded-xl p-7 border border-white/10 hover:border-white/20 transition-all"
              >
                <div className="w-10 h-10 rounded-lg flex items-center justify-center mb-5 text-white text-lg font-bold"
                  style={{ backgroundColor: TCL_RED }}>
                  0{i + 1}
                </div>
                <h3 className="text-lg font-bold mb-2">
                  {item.title}
                </h3>
                <p className="text-white/50 text-sm leading-relaxed">
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FEATURED PRODUCTS SCROLL ── */}
      {allTclProducts.length > 0 && (
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-6">
            <div className="flex justify-between items-end mb-10">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
                  Featured Products
                </h2>
                <p className="text-gray-500 mt-2">Handpicked from our TCL collection</p>
              </div>
              <Link
                to="/category/tv"
                className="hidden md:flex items-center gap-2 text-sm font-semibold hover:gap-3 transition-all"
                style={{ color: TCL_RED }}
              >
                View All <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="flex gap-5 overflow-x-auto scrollbar-hide pb-4 -mx-6 px-6 snap-x snap-mandatory">
              {allTclProducts.map((product, index) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.06 }}
                  className="min-w-[240px] w-[240px] sm:min-w-[270px] sm:w-[270px] shrink-0 snap-start"
                >
                  <Link to={`/product/${product.id}`} className="group block">
                    <div className="bg-white rounded-xl overflow-hidden border border-gray-100 hover:shadow-lg transition-all duration-300">
                      <div className="aspect-square overflow-hidden bg-gray-50 p-3">
                        <img
                          src={product.image}
                          alt={product.name}
                          loading="lazy"
                          className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500"
                        />
                      </div>
                      <div className="p-4">
                        <h3 className="text-sm font-semibold text-gray-900 mb-1 line-clamp-1 group-hover:text-[#E4002B] transition-colors">
                          {product.name}
                        </h3>
                        <p className="text-xs text-gray-400 mb-2">
                          {product.category}{product.model ? ` · ${product.model}` : ''}
                        </p>
                        <p className="text-base font-bold" style={{ color: TCL_RED }}>
                          {formatPrice(product.price)}
                        </p>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>

            <div className="mt-8 text-center md:hidden">
              <Link
                to="/category/tv"
                className="inline-flex items-center gap-2 text-sm font-semibold"
                style={{ color: TCL_RED }}
              >
                View All Products <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* ── CTA ── */}
      <section className="relative py-24 md:py-32 overflow-hidden">
        <div className="absolute inset-0" style={{ backgroundColor: TCL_RED }} />
        <div className="absolute inset-0 opacity-10" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`,
          backgroundSize: '32px 32px',
        }} />

        <div className="relative z-10 container mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.1] mb-6 text-white">
              Experience TCL
              <br />
              at New Mehran Electronics
            </h2>
            <p className="text-white/80 text-lg max-w-md mx-auto mb-10">
              Visit our flagship store or order directly via WhatsApp. Our team is ready to assist you.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2.5 px-10 py-4 bg-white text-gray-900 hover:bg-gray-100 transition-all duration-300 uppercase tracking-wider text-sm font-semibold rounded"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Order on WhatsApp</span>
              </a>
              <a
                href="tel:+923126610110"
                className="inline-flex items-center justify-center gap-2.5 px-10 py-4 border-2 border-white/50 text-white hover:bg-white/10 transition-all duration-300 uppercase tracking-wider text-sm font-semibold rounded"
              >
                <Phone className="w-4 h-4" />
                <span>0312-6610110</span>
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
