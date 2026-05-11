import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, Star, Truck, Clock, Shield, ArrowRight, ChevronLeft } from 'lucide-react';
import { categories, juices, testimonials, offers } from '../data/juices';
import JuiceCard from '../components/JuiceCard';

const banners = [
  { id: 1, title: 'Fresh Mango Season', subtitle: 'Premium Alphonso Mangoes', cta: 'Order Now', color: 'from-orange-600 via-yellow-500 to-orange-400', emoji: '🥭', path: '/category/fresh' },
  { id: 2, title: 'Protein Shakes', subtitle: 'Fuel Your Workout', cta: 'Explore', color: 'from-purple-600 via-indigo-500 to-blue-500', emoji: '💪', path: '/category/protein' },
  { id: 3, title: 'Summer Mocktails', subtitle: 'Beat the Heat', cta: 'Try Now', color: 'from-pink-600 via-rose-500 to-orange-400', emoji: '🍹', path: '/category/mocktails' },
];

export default function HomePage() {
  const [activeBanner, setActiveBanner] = useState(0);
  const navigate = useNavigate();
  const trending = juices.filter(j => j.rating >= 4.8).slice(0, 6);

  useEffect(() => {
    const t = setInterval(() => setActiveBanner(p => (p + 1) % banners.length), 4000);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="min-h-screen pt-20" style={{ background: 'linear-gradient(180deg, #0a0a0a 0%, #0f0a00 50%, #0a0a0a 100%)' }}>

      {/* Hero Banner */}
      <section className="relative h-[85vh] overflow-hidden">
        <AnimatePresence mode="wait">
          {banners.map((b, i) => i === activeBanner && (
            <motion.div key={b.id} initial={{ opacity: 0, scale: 1.05 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.8 }}
              className={`absolute inset-0 bg-gradient-to-br ${b.color} flex items-center`}
            >
              {/* Background pattern */}
              <div className="absolute inset-0 opacity-10"
                style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '40px 40px' }}
              />

              <div className="relative z-10 max-w-7xl mx-auto px-6 flex items-center justify-between w-full">
                <motion.div initial={{ x: -80, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.3, duration: 0.7 }}>
                  <span className="inline-block glass px-4 py-2 rounded-full text-sm font-medium text-white mb-4">
                    ✨ Limited Time Offer — 20% OFF
                  </span>
                  <h1 className="text-6xl lg:text-8xl font-black font-display text-white mb-4 leading-tight">
                    {b.title}
                  </h1>
                  <p className="text-2xl text-white/80 mb-8">{b.subtitle}</p>
                  <div className="flex gap-4">
                    <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                      onClick={() => navigate(b.path)}
                      className="bg-white text-gray-900 font-bold px-8 py-4 rounded-2xl flex items-center gap-2 text-lg hover:shadow-2xl transition-all"
                    >
                      {b.cta} <ArrowRight size={22} />
                    </motion.button>
                    <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                      onClick={() => navigate('/menu')}
                      className="glass border border-white/30 text-white font-bold px-8 py-4 rounded-2xl text-lg"
                    >
                      View Menu
                    </motion.button>
                  </div>
                </motion.div>

                <motion.div initial={{ x: 80, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.4, duration: 0.7 }}
                  className="hidden lg:block"
                >
                  <motion.div animate={{ y: [0, -20, 0], rotate: [0, 5, -5, 0] }} transition={{ duration: 4, repeat: Infinity }}
                    className="text-[200px] filter drop-shadow-2xl"
                  >
                    {b.emoji}
                  </motion.div>
                </motion.div>
              </div>

              {/* Banner dots */}
              <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-3">
                {banners.map((_, idx) => (
                  <button key={idx} onClick={() => setActiveBanner(idx)}
                    className={`transition-all duration-300 rounded-full ${idx === activeBanner ? 'w-8 h-3 bg-white' : 'w-3 h-3 bg-white/40'}`}
                  />
                ))}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {/* Nav arrows */}
        <button onClick={() => setActiveBanner(p => (p - 1 + banners.length) % banners.length)}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-20 glass p-3 rounded-full text-white hover:bg-white/20 transition-all"
        >
          <ChevronLeft size={24} />
        </button>
        <button onClick={() => setActiveBanner(p => (p + 1) % banners.length)}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-20 glass p-3 rounded-full text-white hover:bg-white/20 transition-all"
        >
          <ChevronRight size={24} />
        </button>
      </section>

      {/* Features Bar */}
      <section className="py-8 glass-dark border-y border-white/5">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { icon: <Truck size={24} />, title: 'Free Delivery', sub: 'On orders above ₹199', color: 'text-green-400' },
              { icon: <Clock size={24} />, title: '30 Min Delivery', sub: 'Fresh to your door', color: 'text-blue-400' },
              { icon: <Shield size={24} />, title: '100% Fresh', sub: 'No preservatives', color: 'text-orange-400' },
              { icon: <Star size={24} />, title: '4.9 Rated', sub: '10,000+ happy customers', color: 'text-yellow-400' },
            ].map((f, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                transition={{ delay: i * 0.1 }} className="flex items-center gap-4"
              >
                <div className={`${f.color} p-3 rounded-2xl bg-white/5`}>{f.icon}</div>
                <div>
                  <div className="font-bold text-white text-sm">{f.title}</div>
                  <div className="text-gray-500 text-xs">{f.sub}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Offers */}
      <section className="py-16 px-6 max-w-7xl mx-auto">
        <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          className="section-title text-white mb-8"
        >
          🎉 <span className="gradient-text">Hot Offers</span>
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {offers.map((offer, i) => (
            <motion.div key={offer.id} initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }} transition={{ delay: i * 0.1 }}
              whileHover={{ scale: 1.03, y: -4 }}
              className={`bg-gradient-to-br ${offer.color} p-6 rounded-3xl cursor-pointer relative overflow-hidden`}
            >
              <div className="absolute -right-4 -top-4 text-6xl opacity-20">{offer.icon}</div>
              <div className="text-4xl mb-3">{offer.icon}</div>
              <h3 className="font-bold text-white text-lg mb-2">{offer.title}</h3>
              <div className="glass px-3 py-1 rounded-full inline-block">
                <span className="text-white font-mono font-bold text-sm">{offer.code}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Categories */}
      <section className="py-16 px-6 max-w-7xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-10">
          <h2 className="section-title text-white">
            Browse <span className="gradient-text">Categories</span>
          </h2>
          <p className="text-gray-400 text-lg">Explore our wide range of fresh juices and beverages</p>
        </motion.div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {categories.map((cat, i) => (
            <motion.div key={cat.id} initial={{ opacity: 0, scale: 0.8 }} whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }} transition={{ delay: i * 0.05 }}
              whileHover={{ scale: 1.08, y: -6 }} whileTap={{ scale: 0.95 }}
              onClick={() => navigate(cat.path)}
              className={`${cat.bg} glass rounded-3xl p-5 text-center cursor-pointer border border-white/5 hover:border-white/20 transition-all`}
            >
              <div className="text-4xl mb-3">{cat.icon}</div>
              <div className="text-white font-semibold text-sm leading-tight">{cat.name}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Trending */}
      <section className="py-16 px-6 max-w-7xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          className="flex items-center justify-between mb-10"
        >
          <div>
            <h2 className="section-title text-white">
              🔥 <span className="gradient-text">Trending</span> Now
            </h2>
            <p className="text-gray-400">Most loved by our customers</p>
          </div>
          <motion.button whileHover={{ scale: 1.05 }} onClick={() => navigate('/menu')}
            className="btn-outline flex items-center gap-2"
          >
            View All <ChevronRight size={18} />
          </motion.button>
        </motion.div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {trending.map((juice, i) => <JuiceCard key={juice.id} juice={juice} index={i} />)}
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 px-6 max-w-7xl mx-auto">
        <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          className="section-title text-white text-center mb-12"
        >
          What Our <span className="gradient-text">Customers Say</span>
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <motion.div key={t.id} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ delay: i * 0.1 }}
              whileHover={{ y: -6 }}
              className="glass-dark rounded-3xl p-6 border border-white/5"
            >
              <div className="flex items-center gap-1 mb-4">
                {[...Array(t.rating)].map((_, j) => <Star key={j} size={16} className="text-yellow-400 fill-yellow-400" />)}
              </div>
              <p className="text-gray-300 mb-6 leading-relaxed">"{t.text}"</p>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-orange-500 to-pink-500 flex items-center justify-center font-bold text-white">
                  {t.avatar}
                </div>
                <div>
                  <div className="font-bold text-white">{t.name}</div>
                  <div className="text-gray-500 text-sm">{t.role}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA Banner */}
      <section className="py-16 px-6 max-w-7xl mx-auto">
        <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }}
          className="relative overflow-hidden rounded-3xl p-12 text-center"
          style={{ background: 'linear-gradient(135deg, #f97316, #ec4899, #a855f7)' }}
        >
          <div className="absolute inset-0 opacity-10"
            style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '30px 30px' }}
          />
          <motion.div animate={{ y: [0, -10, 0] }} transition={{ duration: 3, repeat: Infinity }} className="text-6xl mb-4">🥤</motion.div>
          <h2 className="text-4xl lg:text-5xl font-black text-white mb-4">Ready to Order?</h2>
          <p className="text-white/80 text-xl mb-8">Fresh juices delivered in 30 minutes. Use code AMRUTHA20 for 20% off!</p>
          <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
            onClick={() => navigate('/menu')}
            className="bg-white text-gray-900 font-bold px-10 py-4 rounded-2xl text-lg hover:shadow-2xl transition-all"
          >
            Order Now 🚀
          </motion.button>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="glass-dark border-t border-white/5 py-12 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <span className="text-3xl">🥤</span>
                <span className="text-xl font-bold gradient-text">Amrutha Juice</span>
              </div>
              <p className="text-gray-500 text-sm">Premium fresh juices delivered to your doorstep. Pure, natural, delicious.</p>
            </div>
            {[
              { title: 'Quick Links', links: ['Home', 'Menu', 'Offers', 'Contact'] },
              { title: 'Categories', links: ['Fresh Juices', 'Mocktails', 'Milkshakes', 'Protein Shakes'] },
              { title: 'Support', links: ['FAQ', 'Track Order', 'Return Policy', 'Privacy Policy'] },
            ].map(col => (
              <div key={col.title}>
                <h4 className="font-bold text-white mb-4">{col.title}</h4>
                <ul className="space-y-2">
                  {col.links.map(l => (
                    <li key={l}><a href="#" className="text-gray-500 hover:text-orange-400 transition-colors text-sm">{l}</a></li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-gray-600 text-sm">© 2025 Amrutha Juice. All rights reserved.</p>
            <div className="flex gap-4">
              {['📘 Facebook', '📸 Instagram', '🐦 Twitter', '▶️ YouTube'].map(s => (
                <a key={s} href="#" className="text-gray-600 hover:text-orange-400 transition-colors text-sm">{s}</a>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
