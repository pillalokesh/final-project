import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Star, Heart, ShoppingCart, Zap, Plus, Minus, Check } from 'lucide-react';
import { juices } from '../data/juices';
import { useCart, useAuth } from '../context/AppContext';
import JuiceCard from '../components/JuiceCard';
import toast from 'react-hot-toast';

export default function JuiceDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addItem } = useCart();
  const { wishlist, toggleWishlist } = useAuth();

  const juice = juices.find(j => j.id === parseInt(id));
  const [qty, setQty] = useState(1);
  const [size, setSize] = useState('M');
  const [sugar, setSugar] = useState('normal');
  const [ice, setIce] = useState('normal');
  const [added, setAdded] = useState(false);

  if (!juice) return (
    <div className="min-h-screen pt-24 flex items-center justify-center">
      <div className="text-center">
        <div className="text-6xl mb-4">🥤</div>
        <h2 className="text-2xl font-bold text-white mb-4">Juice not found</h2>
        <button onClick={() => navigate('/home')} className="btn-primary">Go Home</button>
      </div>
    </div>
  );

  const related = juices.filter(j => j.category === juice.category && j.id !== juice.id).slice(0, 4);
  const isWishlisted = wishlist.includes(juice.id);

  const sizeMultiplier = { S: 0.8, M: 1, L: 1.3, XL: 1.6 };
  const finalPrice = Math.round(juice.price * sizeMultiplier[size] * qty);

  const handleAddToCart = () => {
    addItem({ ...juice, price: Math.round(juice.price * sizeMultiplier[size]), size, sugar, ice });
    setAdded(true);
    toast.success(`${juice.name} added to cart! 🥤`, {
      style: { background: '#1a1a2e', color: '#fff', border: '1px solid rgba(249,115,22,0.3)' },
    });
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div className="min-h-screen pt-20" style={{ background: 'linear-gradient(180deg, #0a0a0a 0%, #0f0a00 100%)' }}>
      <div className="max-w-7xl mx-auto px-6 py-8">
        <motion.button initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-8"
        >
          <ArrowLeft size={20} /> Back
        </motion.button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* Image */}
          <motion.div initial={{ opacity: 0, x: -40 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }}>
            <div className="relative rounded-3xl overflow-hidden aspect-square glass-dark">
              <img src={juice.image} alt={juice.name}
                className="w-full h-full object-cover"
                onError={e => { e.target.src = `https://via.placeholder.com/600x600/1a1a2e/f97316?text=${encodeURIComponent(juice.name)}`; }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />

              {juice.tag && (
                <span className={`absolute top-6 left-6 ${juice.tagColor} text-white font-bold px-4 py-2 rounded-full text-sm`}>
                  {juice.tag}
                </span>
              )}

              <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}
                onClick={() => toggleWishlist(juice.id)}
                className={`absolute top-6 right-6 p-3 rounded-full backdrop-blur-sm transition-all ${
                  isWishlisted ? 'bg-pink-500 text-white' : 'bg-black/40 text-white hover:bg-pink-500'
                }`}
              >
                <Heart size={22} fill={isWishlisted ? 'currentColor' : 'none'} />
              </motion.button>

              <div className="absolute bottom-6 left-6 flex items-center gap-2 glass px-3 py-2 rounded-full">
                <Zap size={16} className="text-yellow-400" />
                <span className="text-white font-medium">{juice.calories} calories</span>
              </div>
            </div>
          </motion.div>

          {/* Details */}
          <motion.div initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 0.2 }}>
            <h1 className="text-4xl lg:text-5xl font-black font-display text-white mb-3">{juice.name}</h1>

            <div className="flex items-center gap-3 mb-4">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={18} className={i < Math.floor(juice.rating) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-600'} />
                ))}
              </div>
              <span className="text-yellow-400 font-bold">{juice.rating}</span>
              <span className="text-gray-500">({juice.reviews} reviews)</span>
            </div>

            <p className="text-gray-400 text-lg mb-6 leading-relaxed">{juice.description}</p>

            {/* Size */}
            <div className="mb-6">
              <h3 className="text-white font-bold mb-3">Size</h3>
              <div className="flex gap-3">
                {[
                  { value: 'S', label: 'Small', ml: '250ml' },
                  { value: 'M', label: 'Medium', ml: '350ml' },
                  { value: 'L', label: 'Large', ml: '500ml' },
                  { value: 'XL', label: 'XL', ml: '700ml' },
                ].map(s => (
                  <button key={s.value} onClick={() => setSize(s.value)}
                    className={`flex-1 py-3 rounded-2xl text-sm font-semibold transition-all ${
                      size === s.value ? 'bg-orange-500 text-white glow-orange' : 'glass text-gray-400 hover:text-white'
                    }`}
                  >
                    <div>{s.value}</div>
                    <div className="text-xs opacity-70">{s.ml}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Sugar */}
            <div className="mb-6">
              <h3 className="text-white font-bold mb-3">Sugar Level</h3>
              <div className="flex gap-3">
                {['no sugar', 'less', 'normal', 'extra'].map(s => (
                  <button key={s} onClick={() => setSugar(s)}
                    className={`flex-1 py-2 rounded-xl text-xs font-semibold capitalize transition-all ${
                      sugar === s ? 'bg-green-500 text-white' : 'glass text-gray-400 hover:text-white'
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            {/* Ice */}
            <div className="mb-8">
              <h3 className="text-white font-bold mb-3">Ice Level</h3>
              <div className="flex gap-3">
                {['no ice', 'less', 'normal', 'extra'].map(s => (
                  <button key={s} onClick={() => setIce(s)}
                    className={`flex-1 py-2 rounded-xl text-xs font-semibold capitalize transition-all ${
                      ice === s ? 'bg-blue-500 text-white' : 'glass text-gray-400 hover:text-white'
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            {/* Qty + Add */}
            <div className="flex items-center gap-4 mb-6">
              <div className="flex items-center gap-3 glass rounded-2xl px-4 py-3">
                <button onClick={() => setQty(q => Math.max(1, q - 1))} className="text-gray-400 hover:text-white transition-colors">
                  <Minus size={20} />
                </button>
                <span className="text-white font-bold text-xl w-8 text-center">{qty}</span>
                <button onClick={() => setQty(q => q + 1)} className="text-gray-400 hover:text-white transition-colors">
                  <Plus size={20} />
                </button>
              </div>

              <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
                onClick={handleAddToCart}
                className={`flex-1 py-4 rounded-2xl font-bold text-lg flex items-center justify-center gap-3 transition-all ${
                  added ? 'bg-green-500 text-white' : 'btn-primary'
                }`}
              >
                {added ? <><Check size={22} /> Added!</> : <><ShoppingCart size={22} /> Add to Cart — ₹{finalPrice}</>}
              </motion.button>
            </div>

            {/* Ingredients */}
            <div className="glass-dark rounded-2xl p-5 mb-4">
              <h3 className="text-white font-bold mb-3">🌿 Ingredients</h3>
              <div className="flex flex-wrap gap-2">
                {juice.ingredients.map(ing => (
                  <span key={ing} className="glass px-3 py-1 rounded-full text-sm text-gray-300">{ing}</span>
                ))}
              </div>
            </div>

            {/* Benefits */}
            <div className="glass-dark rounded-2xl p-5">
              <h3 className="text-white font-bold mb-3">💚 Health Benefits</h3>
              <div className="space-y-2">
                {juice.benefits.map(b => (
                  <div key={b} className="flex items-center gap-2 text-gray-300 text-sm">
                    <Check size={16} className="text-green-400 flex-shrink-0" /> {b}
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Related */}
        {related.length > 0 && (
          <section>
            <h2 className="text-3xl font-bold text-white mb-8">You May Also Like</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {related.map((j, i) => <JuiceCard key={j.id} juice={j} index={i} />)}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
