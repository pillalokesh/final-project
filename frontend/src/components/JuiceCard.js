import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Heart, ShoppingCart, Star, Zap } from 'lucide-react';
import { useCart, useAuth } from '../context/AppContext';
import toast from 'react-hot-toast';

export default function JuiceCard({ juice, index = 0 }) {
  const { addItem } = useCart();
  const { wishlist, toggleWishlist } = useAuth();
  const navigate = useNavigate();
  const isWishlisted = wishlist.includes(juice.id);

  const handleAdd = (e) => {
    e.stopPropagation();
    addItem(juice);
    toast.success(`${juice.name} added to cart! 🥤`, {
      style: { background: '#1a1a2e', color: '#fff', border: '1px solid rgba(249,115,22,0.3)' },
      iconTheme: { primary: '#f97316', secondary: '#fff' },
    });
  };

  const handleWishlist = (e) => {
    e.stopPropagation();
    toggleWishlist(juice.id);
    toast(isWishlisted ? 'Removed from wishlist' : '❤️ Added to wishlist!', {
      style: { background: '#1a1a2e', color: '#fff', border: '1px solid rgba(236,72,153,0.3)' },
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.08, duration: 0.5 }}
      whileHover={{ y: -8, scale: 1.02 }}
      onClick={() => navigate(`/juice/${juice.id}`)}
      className="juice-card cursor-pointer group"
    >
      {/* Image */}
      <div className="relative overflow-hidden h-52">
        <img
          src={juice.image}
          alt={juice.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          onError={e => { e.target.src = `https://via.placeholder.com/400x300/1a1a2e/f97316?text=${encodeURIComponent(juice.name)}`; }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />

        {/* Tag */}
        {juice.tag && (
          <span className={`absolute top-3 left-3 ${juice.tagColor} text-white text-xs font-bold px-3 py-1 rounded-full`}>
            {juice.tag}
          </span>
        )}

        {/* Wishlist */}
        <motion.button
          whileHover={{ scale: 1.2 }} whileTap={{ scale: 0.9 }}
          onClick={handleWishlist}
          className={`absolute top-3 right-3 p-2 rounded-full backdrop-blur-sm transition-all ${
            isWishlisted ? 'bg-pink-500 text-white' : 'bg-black/40 text-white hover:bg-pink-500'
          }`}
        >
          <Heart size={16} fill={isWishlisted ? 'currentColor' : 'none'} />
        </motion.button>

        {/* Calories */}
        <div className="absolute bottom-3 left-3 flex items-center gap-1 bg-black/50 backdrop-blur-sm px-2 py-1 rounded-full">
          <Zap size={12} className="text-yellow-400" />
          <span className="text-xs text-white font-medium">{juice.calories} cal</span>
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        <h3 className="font-bold text-white text-lg mb-1 group-hover:text-orange-400 transition-colors">{juice.name}</h3>

        {/* Rating */}
        <div className="flex items-center gap-1 mb-2">
          <Star size={14} className="text-yellow-400 fill-yellow-400" />
          <span className="text-yellow-400 text-sm font-semibold">{juice.rating}</span>
          <span className="text-gray-500 text-xs">({juice.reviews} reviews)</span>
        </div>

        {/* Ingredients preview */}
        <p className="text-gray-400 text-xs mb-3 line-clamp-1">
          {juice.ingredients.slice(0, 3).join(' • ')}
        </p>

        {/* Price + Add */}
        <div className="flex items-center justify-between">
          <div>
            <span className="text-2xl font-bold text-white">₹{juice.price}</span>
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
            onClick={handleAdd}
            className="flex items-center gap-2 btn-primary text-sm px-4 py-2"
          >
            <ShoppingCart size={16} />
            Add
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}
