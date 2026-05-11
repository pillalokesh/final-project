import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Filter, SortAsc } from 'lucide-react';
import { categories, juices } from '../data/juices';
import JuiceCard from '../components/JuiceCard';

const categoryThemes = {
  fresh:      { gradient: 'from-orange-600 to-yellow-500', bg: 'from-orange-950/30 to-yellow-950/20', accent: '#f97316' },
  mocktails:  { gradient: 'from-pink-600 to-purple-600',   bg: 'from-pink-950/30 to-purple-950/20',   accent: '#ec4899' },
  milkshakes: { gradient: 'from-blue-600 to-cyan-500',     bg: 'from-blue-950/30 to-cyan-950/20',     accent: '#3b82f6' },
  lassi:      { gradient: 'from-yellow-500 to-orange-500', bg: 'from-yellow-950/30 to-orange-950/20', accent: '#eab308' },
  special:    { gradient: 'from-purple-600 to-pink-600',   bg: 'from-purple-950/30 to-pink-950/20',   accent: '#a855f7' },
  sugarfree:  { gradient: 'from-green-600 to-teal-500',    bg: 'from-green-950/30 to-teal-950/20',    accent: '#22c55e' },
  weightloss: { gradient: 'from-teal-600 to-green-600',    bg: 'from-teal-950/30 to-green-950/20',    accent: '#14b8a6' },
  vegetable:  { gradient: 'from-lime-600 to-green-600',    bg: 'from-lime-950/30 to-green-950/20',    accent: '#84cc16' },
  energy:     { gradient: 'from-yellow-500 to-red-500',    bg: 'from-yellow-950/30 to-red-950/20',    accent: '#eab308' },
  kids:       { gradient: 'from-pink-500 to-yellow-400',   bg: 'from-pink-950/30 to-yellow-950/20',   accent: '#f472b6' },
  seasonal:   { gradient: 'from-rose-500 to-orange-500',   bg: 'from-rose-950/30 to-orange-950/20',   accent: '#f43f5e' },
  protein:    { gradient: 'from-indigo-600 to-purple-700', bg: 'from-indigo-950/30 to-purple-950/20', accent: '#6366f1' },
};

export default function CategoryPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [sort, setSort] = useState('popular');
  const [filter, setFilter] = useState('all');

  const category = categories.find(c => c.id === id);
  const theme = categoryThemes[id] || categoryThemes.fresh;

  let items = juices.filter(j => j.category === id);
  if (sort === 'price-low') items = [...items].sort((a, b) => a.price - b.price);
  if (sort === 'price-high') items = [...items].sort((a, b) => b.price - a.price);
  if (sort === 'rating') items = [...items].sort((a, b) => b.rating - a.rating);
  if (filter === 'under100') items = items.filter(j => j.price < 100);
  if (filter === 'above100') items = items.filter(j => j.price >= 100);

  if (!category) return (
    <div className="min-h-screen pt-24 flex items-center justify-center">
      <div className="text-center">
        <div className="text-6xl mb-4">😕</div>
        <h2 className="text-2xl font-bold text-white mb-4">Category not found</h2>
        <button onClick={() => navigate('/home')} className="btn-primary">Go Home</button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen pt-20" style={{ background: 'linear-gradient(180deg, #0a0a0a 0%, #0f0a00 100%)' }}>
      {/* Hero */}
      <section className={`relative py-24 px-6 bg-gradient-to-br ${theme.bg} overflow-hidden`}>
        <div className={`absolute inset-0 bg-gradient-to-br ${theme.gradient} opacity-10`} />
        <div className="absolute inset-0 opacity-5"
          style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '30px 30px' }}
        />

        {/* Floating emoji */}
        {[...Array(6)].map((_, i) => (
          <motion.div key={i} className="absolute text-5xl opacity-10 pointer-events-none"
            style={{ left: `${i * 18}%`, top: `${20 + (i % 3) * 25}%` }}
            animate={{ y: [0, -20, 0], rotate: [0, 10, -10, 0] }}
            transition={{ duration: 3 + i, repeat: Infinity, delay: i * 0.5 }}
          >
            {category.icon}
          </motion.div>
        ))}

        <div className="relative z-10 max-w-7xl mx-auto">
          <motion.button initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}
            onClick={() => navigate('/home')}
            className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-8"
          >
            <ArrowLeft size={20} /> Back to Home
          </motion.button>

          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div className="text-7xl mb-4">{category.icon}</div>
            <h1 className="text-5xl lg:text-7xl font-black font-display text-white mb-4">
              {category.name}
            </h1>
            <p className="text-gray-400 text-xl max-w-2xl">
              Discover our premium selection of {category.name.toLowerCase()} — crafted fresh daily with the finest ingredients.
            </p>
            <div className="flex gap-4 mt-6">
              <span className="glass px-4 py-2 rounded-full text-sm text-gray-300">{items.length} Items Available</span>
              <span className="glass px-4 py-2 rounded-full text-sm text-gray-300">🚚 30 Min Delivery</span>
              <span className="glass px-4 py-2 rounded-full text-sm text-gray-300">⭐ Top Rated</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Filters */}
      <section className="sticky top-20 z-30 glass-dark border-b border-white/5 py-4 px-6">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center gap-4">
          <div className="flex items-center gap-2 text-gray-400">
            <SortAsc size={18} /> Sort:
          </div>
          {[
            { value: 'popular', label: 'Popular' },
            { value: 'rating', label: 'Top Rated' },
            { value: 'price-low', label: 'Price: Low' },
            { value: 'price-high', label: 'Price: High' },
          ].map(s => (
            <button key={s.value} onClick={() => setSort(s.value)}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                sort === s.value ? 'bg-orange-500 text-white' : 'glass text-gray-400 hover:text-white'
              }`}
            >
              {s.label}
            </button>
          ))}

          <div className="flex items-center gap-2 text-gray-400 ml-4">
            <Filter size={18} /> Filter:
          </div>
          {[
            { value: 'all', label: 'All' },
            { value: 'under100', label: 'Under ₹100' },
            { value: 'above100', label: 'Above ₹100' },
          ].map(f => (
            <button key={f.value} onClick={() => setFilter(f.value)}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                filter === f.value ? 'bg-pink-500 text-white' : 'glass text-gray-400 hover:text-white'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-12 px-6 max-w-7xl mx-auto">
        {items.length === 0 ? (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-2xl font-bold text-white mb-2">No items found</h3>
            <p className="text-gray-400">Try changing your filters</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {items.map((juice, i) => <JuiceCard key={juice.id} juice={juice} index={i} />)}
          </div>
        )}
      </section>
    </div>
  );
}
