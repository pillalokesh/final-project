import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { User, Mail, Phone, MapPin, Edit3, Save, LogOut, ShoppingBag, Heart, Star } from 'lucide-react';
import { useAuth } from '../context/AppContext';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const mockOrders = [
  { id: 'AJ001234', date: '2025-01-15', items: 'Mango Delight, Oreo Shake', total: 278, status: 'Delivered' },
  { id: 'AJ001189', date: '2025-01-12', items: 'Virgin Mojito, Mango Lassi', total: 208, status: 'Delivered' },
  { id: 'AJ001056', date: '2025-01-08', items: 'Peanut Butter Shake', total: 159, status: 'Delivered' },
];

export default function ProfilePage() {
  const { user, logout, wishlist } = useAuth();
  const navigate = useNavigate();
  const [editing, setEditing] = useState(false);
  const [profile, setProfile] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: '+91 98765 43210',
    address: 'Hyderabad, Telangana',
  });

  const handleSave = () => {
    setEditing(false);
    toast.success('Profile updated!', {
      style: { background: '#1a1a2e', color: '#fff', border: '1px solid rgba(249,115,22,0.3)' },
    });
  };

  const handleLogout = () => {
    logout();
    navigate('/');
    toast('Logged out successfully', { icon: '👋' });
  };

  return (
    <div className="min-h-screen pt-20 px-6 py-8" style={{ background: 'linear-gradient(180deg, #0a0a0a 0%, #0f0a00 100%)' }}>
      <div className="max-w-5xl mx-auto">

        {/* Header */}
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}
          className="glass-dark rounded-3xl p-8 mb-6 relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-orange-500/10 to-pink-500/10" />
          <div className="relative z-10 flex flex-col sm:flex-row items-center gap-6">
            <motion.div whileHover={{ scale: 1.05 }}
              className="w-24 h-24 rounded-full bg-gradient-to-br from-orange-500 to-pink-500 flex items-center justify-center text-4xl font-black text-white shadow-2xl"
            >
              {profile.name?.charAt(0)?.toUpperCase() || 'U'}
            </motion.div>
            <div className="text-center sm:text-left flex-1">
              <h1 className="text-3xl font-black text-white">{profile.name}</h1>
              <p className="text-gray-400">{profile.email}</p>
              <div className="flex flex-wrap gap-3 mt-3 justify-center sm:justify-start">
                <span className="glass px-3 py-1 rounded-full text-xs text-orange-400">⭐ Premium Member</span>
                <span className="glass px-3 py-1 rounded-full text-xs text-green-400">✅ Verified</span>
                <span className="glass px-3 py-1 rounded-full text-xs text-gray-400">❤️ {wishlist.length} Saved</span>
              </div>
            </div>
            <div className="flex gap-3">
              <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                onClick={() => editing ? handleSave() : setEditing(true)}
                className="btn-primary flex items-center gap-2 px-5 py-3"
              >
                {editing ? <><Save size={18} /> Save</> : <><Edit3 size={18} /> Edit</>}
              </motion.button>
              <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                onClick={handleLogout}
                className="glass border border-red-500/30 text-red-400 hover:bg-red-500/10 px-5 py-3 rounded-2xl flex items-center gap-2 transition-all"
              >
                <LogOut size={18} /> Logout
              </motion.button>
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Profile Info */}
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }}
            className="glass-dark rounded-3xl p-6"
          >
            <h2 className="text-white font-bold text-lg mb-5 flex items-center gap-2">
              <User size={20} className="text-orange-400" /> Personal Info
            </h2>
            <div className="space-y-4">
              {[
                { icon: <User size={16} />, label: 'Full Name', key: 'name' },
                { icon: <Mail size={16} />, label: 'Email', key: 'email' },
                { icon: <Phone size={16} />, label: 'Phone', key: 'phone' },
                { icon: <MapPin size={16} />, label: 'Address', key: 'address' },
              ].map(field => (
                <div key={field.key}>
                  <label className="text-gray-500 text-xs flex items-center gap-1 mb-1">
                    {field.icon} {field.label}
                  </label>
                  {editing ? (
                    <input value={profile[field.key]}
                      onChange={e => setProfile(p => ({ ...p, [field.key]: e.target.value }))}
                      className="input-field text-sm py-2"
                    />
                  ) : (
                    <p className="text-white text-sm font-medium">{profile[field.key]}</p>
                  )}
                </div>
              ))}
            </div>

            {/* Stats */}
            <div className="mt-6 pt-6 border-t border-white/10 grid grid-cols-3 gap-3">
              {[
                { icon: <ShoppingBag size={18} />, value: mockOrders.length, label: 'Orders', color: 'text-orange-400' },
                { icon: <Heart size={18} />, value: wishlist.length, label: 'Saved', color: 'text-pink-400' },
                { icon: <Star size={18} />, value: '4.9', label: 'Rating', color: 'text-yellow-400' },
              ].map(stat => (
                <div key={stat.label} className="glass rounded-2xl p-3 text-center">
                  <div className={`${stat.color} flex justify-center mb-1`}>{stat.icon}</div>
                  <div className="text-white font-bold text-lg">{stat.value}</div>
                  <div className="text-gray-500 text-xs">{stat.label}</div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Order History */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
            className="lg:col-span-2 glass-dark rounded-3xl p-6"
          >
            <h2 className="text-white font-bold text-lg mb-5 flex items-center gap-2">
              <ShoppingBag size={20} className="text-orange-400" /> Order History
            </h2>
            <div className="space-y-4">
              {mockOrders.map((order, i) => (
                <motion.div key={order.id} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 * i }}
                  className="glass rounded-2xl p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3"
                >
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-orange-400 font-bold text-sm">#{order.id}</span>
                      <span className="text-gray-600 text-xs">{order.date}</span>
                    </div>
                    <p className="text-gray-300 text-sm">{order.items}</p>
                  </div>
                  <div className="flex items-center gap-3 flex-shrink-0">
                    <span className="text-white font-bold">₹{order.total}</span>
                    <span className="bg-green-500/20 text-green-400 text-xs px-3 py-1 rounded-full font-medium">
                      {order.status}
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Quick Actions */}
            <div className="mt-6 pt-6 border-t border-white/10">
              <h3 className="text-white font-bold mb-4">Quick Actions</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {[
                  { label: 'Browse Menu', icon: '🥤', path: '/menu' },
                  { label: 'My Wishlist', icon: '❤️', path: '/wishlist' },
                  { label: 'View Offers', icon: '🎉', path: '/offers' },
                  { label: 'Contact Us', icon: '📬', path: '/contact' },
                  { label: 'My Cart', icon: '🛒', path: '/cart' },
                  { label: 'Fresh Juices', icon: '🍊', path: '/category/fresh' },
                ].map(action => (
                  <motion.button key={action.label} whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}
                    onClick={() => navigate(action.path)}
                    className="glass rounded-2xl p-3 text-center hover:bg-white/10 transition-all"
                  >
                    <div className="text-2xl mb-1">{action.icon}</div>
                    <div className="text-gray-300 text-xs font-medium">{action.label}</div>
                  </motion.button>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
