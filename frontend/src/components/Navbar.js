import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingCart, Heart, Search, Menu, X, User, LogOut, Sun, Moon } from 'lucide-react';
import { useCart, useAuth } from '../context/AppContext';

export default function Navbar({ darkMode, setDarkMode }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const { count } = useCart();
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
      setSearchOpen(false);
      setSearchQuery('');
    }
  };

  const navLinks = [
    { label: 'Home', path: '/home' },
    { label: 'Menu', path: '/menu' },
    { label: 'Offers', path: '/offers' },
    { label: 'Contact', path: '/contact' },
  ];

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled ? 'glass-dark shadow-2xl py-3' : 'bg-transparent py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-between">
          {/* Logo */}
          <Link to="/home">
            <motion.div whileHover={{ scale: 1.05 }} className="flex items-center gap-2">
              <span className="text-3xl">🥤</span>
              <div>
                <span className="text-xl font-bold font-display gradient-text">Amrutha</span>
                <span className="text-xl font-bold text-white"> Juice</span>
                <div className="text-xs text-orange-400 -mt-1 font-medium">Premium Fresh Juices</div>
              </div>
            </motion.div>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map(link => (
              <Link key={link.path} to={link.path}>
                <motion.span
                  whileHover={{ scale: 1.05 }}
                  className={`font-medium transition-colors duration-200 ${
                    location.pathname === link.path ? 'text-orange-400' : 'text-gray-300 hover:text-white'
                  }`}
                >
                  {link.label}
                </motion.span>
              </Link>
            ))}
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-3">
            {/* Search */}
            <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}
              onClick={() => setSearchOpen(true)}
              className="p-2 rounded-xl text-gray-300 hover:text-white hover:bg-white/10 transition-all"
            >
              <Search size={20} />
            </motion.button>

            {/* Dark Mode */}
            <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}
              onClick={() => setDarkMode(!darkMode)}
              className="p-2 rounded-xl text-gray-300 hover:text-white hover:bg-white/10 transition-all"
            >
              {darkMode ? <Sun size={20} /> : <Moon size={20} />}
            </motion.button>

            {/* Wishlist */}
            <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}
              onClick={() => navigate('/wishlist')}
              className="p-2 rounded-xl text-gray-300 hover:text-pink-400 hover:bg-white/10 transition-all"
            >
              <Heart size={20} />
            </motion.button>

            {/* Cart */}
            <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}
              onClick={() => navigate('/cart')}
              className="relative p-2 rounded-xl text-gray-300 hover:text-orange-400 hover:bg-white/10 transition-all"
            >
              <ShoppingCart size={20} />
              {count > 0 && (
                <motion.span initial={{ scale: 0 }} animate={{ scale: 1 }}
                  className="absolute -top-1 -right-1 w-5 h-5 bg-orange-500 text-white text-xs rounded-full flex items-center justify-center font-bold"
                >
                  {count}
                </motion.span>
              )}
            </motion.button>

            {/* User */}
            {user ? (
              <div className="flex items-center gap-2">
                <motion.button whileHover={{ scale: 1.05 }}
                  onClick={() => navigate('/profile')}
                  className="flex items-center gap-2 px-3 py-2 rounded-xl glass text-sm font-medium text-white"
                >
                  <User size={16} />
                  <span className="hidden md:block">{user.name?.split(' ')[0]}</span>
                </motion.button>
                <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                  onClick={() => { logout(); navigate('/'); }}
                  className="p-2 rounded-xl text-gray-400 hover:text-red-400 hover:bg-white/10 transition-all"
                >
                  <LogOut size={18} />
                </motion.button>
              </div>
            ) : (
              <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                onClick={() => navigate('/')}
                className="btn-primary text-sm px-4 py-2"
              >
                Login
              </motion.button>
            )}

            {/* Mobile Menu */}
            <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}
              onClick={() => setMenuOpen(!menuOpen)}
              className="md:hidden p-2 rounded-xl text-gray-300 hover:text-white hover:bg-white/10"
            >
              {menuOpen ? <X size={22} /> : <Menu size={22} />}
            </motion.button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}
              className="md:hidden glass-dark border-t border-white/10 px-4 py-4"
            >
              {navLinks.map(link => (
                <Link key={link.path} to={link.path} onClick={() => setMenuOpen(false)}>
                  <div className={`py-3 px-4 rounded-xl mb-1 font-medium transition-all ${
                    location.pathname === link.path ? 'bg-orange-500/20 text-orange-400' : 'text-gray-300 hover:bg-white/10'
                  }`}>
                    {link.label}
                  </div>
                </Link>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      {/* Search Modal */}
      <AnimatePresence>
        {searchOpen && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-sm flex items-start justify-center pt-24 px-4"
            onClick={() => setSearchOpen(false)}
          >
            <motion.div initial={{ scale: 0.9, y: -20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, y: -20 }}
              className="w-full max-w-2xl glass-dark rounded-2xl p-6"
              onClick={e => e.stopPropagation()}
            >
              <form onSubmit={handleSearch} className="flex gap-3">
                <input
                  autoFocus
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  placeholder="Search for juices, mocktails, shakes..."
                  className="input-field flex-1 text-lg"
                />
                <button type="submit" className="btn-primary px-6">Search</button>
              </form>
              <div className="mt-4 flex flex-wrap gap-2">
                {['Mango Juice', 'Oreo Shake', 'Virgin Mojito', 'Lassi', 'Protein Shake'].map(s => (
                  <button key={s} onClick={() => { setSearchQuery(s); }}
                    className="px-3 py-1 rounded-full text-sm glass text-gray-300 hover:text-orange-400 transition-colors"
                  >
                    {s}
                  </button>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
