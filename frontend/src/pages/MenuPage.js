import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Search } from 'lucide-react';
import { juices, categories } from '../data/juices';
import JuiceCard from '../components/JuiceCard';

export default function MenuPage() {
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');

  const filtered = useMemo(() => {
    let result = juices;
    if (activeCategory !== 'all') result = result.filter(j => j.category === activeCategory);
    if (search.trim()) result = result.filter(j =>
      j.name.toLowerCase().includes(search.toLowerCase()) ||
      j.ingredients.some(i => i.toLowerCase().includes(search.toLowerCase()))
    );
    return result;
  }, [search, activeCategory]);

  return (
    <div className="min-h-screen pt-20" style={{ background: 'linear-gradient(180deg, #0a0a0a 0%, #0f0a00 100%)' }}>
      {/* Hero */}
      <section className="py-16 px-6 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-orange-950/20 to-pink-950/10" />
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="relative z-10">
          <h1 className="text-5xl lg:text-6xl font-black font-display text-white mb-4">
            Our <span className="gradient-text">Full Menu</span>
          </h1>
          <p className="text-gray-400 text-xl mb-8">Explore {juices.length}+ premium juices and beverages</p>

          {/* Search */}
          <div className="relative max-w-xl mx-auto">
            <Search size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
            <input value={search} onChange={e => setSearch(e.target.value)}
              placeholder="Search juices, ingredients..."
              className="input-field pl-12 py-4 text-lg w-full"
            />
          </div>
        </motion.div>
      </section>

      {/* Category Filter */}
      <div className="sticky top-20 z-30 glass-dark border-b border-white/5 py-4 px-6">
        <div className="max-w-7xl mx-auto flex gap-3 overflow-x-auto no-scrollbar">
          <button onClick={() => setActiveCategory('all')}
            className={`flex-shrink-0 px-5 py-2 rounded-xl font-semibold text-sm transition-all ${
              activeCategory === 'all' ? 'bg-orange-500 text-white' : 'glass text-gray-400 hover:text-white'
            }`}
          >
            🍹 All ({juices.length})
          </button>
          {categories.map(cat => (
            <button key={cat.id} onClick={() => setActiveCategory(cat.id)}
              className={`flex-shrink-0 px-5 py-2 rounded-xl font-semibold text-sm transition-all whitespace-nowrap ${
                activeCategory === cat.id ? 'bg-orange-500 text-white' : 'glass text-gray-400 hover:text-white'
              }`}
            >
              {cat.icon} {cat.name}
            </button>
          ))}
        </div>
      </div>

      {/* Grid */}
      <section className="py-12 px-6 max-w-7xl mx-auto">
        {filtered.length === 0 ? (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-2xl font-bold text-white mb-2">No results found</h3>
            <p className="text-gray-400">Try a different search or category</p>
          </div>
        ) : (
          <>
            <p className="text-gray-500 mb-6">{filtered.length} items found</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filtered.map((juice, i) => <JuiceCard key={juice.id} juice={juice} index={i} />)}
            </div>
          </>
        )}
      </section>
    </div>
  );
}
