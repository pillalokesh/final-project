import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Tag, Copy, ArrowRight } from 'lucide-react';
import { offers, juices } from '../data/juices';
import JuiceCard from '../components/JuiceCard';
import toast from 'react-hot-toast';

export default function OffersPage() {
  const navigate = useNavigate();
  const trending = juices.filter(j => j.rating >= 4.8).slice(0, 4);

  const copyCoupon = (code) => {
    navigator.clipboard.writeText(code).catch(() => {});
    toast.success(`Coupon ${code} copied! 🎉`, {
      style: { background: '#1a1a2e', color: '#fff', border: '1px solid rgba(249,115,22,0.3)' },
    });
  };

  return (
    <div className="min-h-screen pt-20" style={{ background: 'linear-gradient(180deg, #0a0a0a 0%, #0f0a00 100%)' }}>
      {/* Hero */}
      <section className="relative py-20 px-6 overflow-hidden text-center">
        <div className="absolute inset-0 bg-gradient-to-br from-orange-950/30 to-yellow-950/20" />
        {['🎉', '🎁', '⭐', '🔥', '💥'].map((e, i) => (
          <motion.div key={i} className="absolute text-5xl opacity-10 pointer-events-none"
            style={{ left: `${i * 22}%`, top: `${20 + (i % 2) * 40}%` }}
            animate={{ y: [0, -20, 0], rotate: [0, 15, -15, 0] }}
            transition={{ duration: 3 + i, repeat: Infinity, delay: i * 0.6 }}
          >
            {e}
          </motion.div>
        ))}
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="relative z-10">
          <div className="text-6xl mb-4">🎉</div>
          <h1 className="text-5xl lg:text-6xl font-black font-display text-white mb-4">
            Hot <span className="gradient-text">Offers</span> & Deals
          </h1>
          <p className="text-gray-400 text-xl">Save big on your favorite juices today!</p>
        </motion.div>
      </section>

      {/* Coupon Cards */}
      <section className="py-12 px-6 max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-white mb-8 flex items-center gap-2">
          <Tag className="text-orange-400" /> Available Coupons
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
          {offers.map((offer, i) => (
            <motion.div key={offer.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ delay: i * 0.1 }}
              whileHover={{ scale: 1.02, y: -4 }}
              className={`relative overflow-hidden rounded-3xl p-8 bg-gradient-to-br ${offer.color}`}
            >
              <div className="absolute -right-6 -top-6 text-9xl opacity-10">{offer.icon}</div>
              <div className="relative z-10">
                <div className="text-5xl mb-4">{offer.icon}</div>
                <h3 className="text-2xl font-black text-white mb-2">{offer.title}</h3>
                <p className="text-white/70 mb-6">Use this code at checkout to avail the offer</p>
                <div className="flex items-center gap-3">
                  <div className="glass px-5 py-3 rounded-2xl flex-1">
                    <span className="text-white font-mono font-bold text-lg tracking-widest">{offer.code}</span>
                  </div>
                  <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                    onClick={() => copyCoupon(offer.code)}
                    className="bg-white/20 hover:bg-white/30 text-white p-3 rounded-2xl transition-all"
                  >
                    <Copy size={20} />
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Deal of the Day */}
        <div className="glass-dark rounded-3xl p-8 mb-16 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 to-pink-500/5" />
          <div className="relative z-10 flex flex-col lg:flex-row items-center gap-8">
            <motion.div animate={{ rotate: [0, 5, -5, 0], scale: [1, 1.05, 1] }}
              transition={{ duration: 3, repeat: Infinity }} className="text-8xl"
            >
              🥭
            </motion.div>
            <div className="flex-1 text-center lg:text-left">
              <span className="bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full mb-3 inline-block">
                ⚡ DEAL OF THE DAY
              </span>
              <h3 className="text-3xl font-black text-white mb-2">Mango Delight Combo</h3>
              <p className="text-gray-400 mb-4">Get 2 Mango Delights + 1 Mango Lassi at special price</p>
              <div className="flex items-center gap-4 justify-center lg:justify-start">
                <span className="text-gray-500 line-through text-xl">₹267</span>
                <span className="text-4xl font-black text-orange-400">₹199</span>
                <span className="bg-green-500/20 text-green-400 px-3 py-1 rounded-full text-sm font-bold">25% OFF</span>
              </div>
            </div>
            <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
              onClick={() => navigate('/category/fresh')}
              className="btn-primary flex items-center gap-2 px-8 py-4 text-lg"
            >
              Order Now <ArrowRight size={20} />
            </motion.button>
          </div>
        </div>

        {/* Trending with Offers */}
        <h2 className="text-3xl font-bold text-white mb-8">🔥 Trending Deals</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {trending.map((juice, i) => <JuiceCard key={juice.id} juice={juice} index={i} />)}
        </div>
      </section>
    </div>
  );
}
