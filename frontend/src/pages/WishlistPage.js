import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';
import { juices } from '../data/juices';
import { useAuth } from '../context/AppContext';
import JuiceCard from '../components/JuiceCard';

export default function WishlistPage() {
  const { wishlist } = useAuth();
  const navigate = useNavigate();
  const items = juices.filter(j => wishlist.includes(j.id));

  return (
    <div className="min-h-screen pt-20 px-6 py-8" style={{ background: 'linear-gradient(180deg, #0a0a0a 0%, #0f0a00 100%)' }}>
      <div className="max-w-7xl mx-auto">
        <motion.h1 initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}
          className="text-4xl font-black text-white mb-8 flex items-center gap-3"
        >
          <Heart className="text-pink-400 fill-pink-400" /> My Wishlist
          {items.length > 0 && <span className="text-lg text-gray-400 font-normal">({items.length} items)</span>}
        </motion.h1>

        {items.length === 0 ? (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-24">
            <div className="text-8xl mb-6">💔</div>
            <h2 className="text-3xl font-bold text-white mb-4">Your wishlist is empty</h2>
            <p className="text-gray-400 mb-8">Save your favorite juices here!</p>
            <motion.button whileHover={{ scale: 1.05 }} onClick={() => navigate('/menu')} className="btn-primary text-lg px-8 py-4">
              Browse Menu 🥤
            </motion.button>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {items.map((juice, i) => <JuiceCard key={juice.id} juice={juice} index={i} />)}
          </div>
        )}
      </div>
    </div>
  );
}
