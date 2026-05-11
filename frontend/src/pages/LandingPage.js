import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Eye, EyeOff, Mail, Lock, User, ArrowRight, Loader } from 'lucide-react';
import { useAuth } from '../context/AppContext';
import toast from 'react-hot-toast';

const floatingItems = ['🍊', '🥭', '🍓', '🍋', '🍇', '🥝', '🍍', '🍉', '🫐', '🍑'];

export default function LandingPage() {
  const [mode, setMode] = useState('login'); // login | signup
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', password: '', confirm: '' });
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = e => setForm(p => ({ ...p, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (mode === 'signup' && form.password !== form.confirm) {
      toast.error('Passwords do not match!');
      setLoading(false);
      return;
    }

    try {
      const API = process.env.REACT_APP_API_URL || '';
      const endpoint = mode === 'signup' ? `${API}/api/auth/signup` : `${API}/api/auth/login`;
      const body = mode === 'signup'
        ? { name: form.name, email: form.email, password: form.password }
        : { email: form.email, password: form.password };

      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(body),
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.message || 'Something went wrong');
        setLoading(false);
        return;
      }

      login(data.user);
      toast.success(`Welcome to Amrutha Juice! 🥤`, {
        style: { background: '#1a1a2e', color: '#fff', border: '1px solid rgba(249,115,22,0.3)' },
      });
      navigate('/home');
    } catch (err) {
      // Backend not connected — allow local login for demo
      const userData = {
        id: Date.now(),
        name: mode === 'signup' ? form.name : form.email.split('@')[0],
        email: form.email,
        token: 'local_token_' + Date.now(),
      };
      login(userData);
      toast.success(`Welcome to Amrutha Juice! 🥤`, {
        style: { background: '#1a1a2e', color: '#fff', border: '1px solid rgba(249,115,22,0.3)' },
      });
      navigate('/home');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden flex items-center justify-center"
      style={{ background: 'linear-gradient(135deg, #0a0a0a 0%, #1a0a00 50%, #0a0a1a 100%)' }}
    >
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {floatingItems.map((item, i) => (
          <motion.div key={i}
            className="absolute text-4xl select-none"
            style={{ left: `${(i * 10) % 95}%`, top: `${(i * 13 + 5) % 90}%` }}
            animate={{ y: [0, -30, 0], rotate: [0, 10, -10, 0], opacity: [0.15, 0.35, 0.15] }}
            transition={{ duration: 4 + i * 0.5, repeat: Infinity, delay: i * 0.4 }}
          >
            {item}
          </motion.div>
        ))}
        {/* Glow orbs */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 w-full max-w-6xl mx-auto px-4 flex flex-col lg:flex-row items-center gap-12">
        {/* Left — Brand */}
        <motion.div initial={{ opacity: 0, x: -60 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }}
          className="flex-1 text-center lg:text-left"
        >
          <motion.div animate={{ y: [0, -10, 0] }} transition={{ duration: 3, repeat: Infinity }} className="text-8xl mb-6">
            🥤
          </motion.div>
          <h1 className="text-5xl lg:text-7xl font-black font-display mb-4">
            <span className="gradient-text">Amrutha</span>
            <br />
            <span className="text-white">Juice</span>
          </h1>
          <p className="text-gray-400 text-xl mb-8 max-w-md">
            Premium fresh juices delivered to your doorstep. Pure, natural, and absolutely delicious.
          </p>
          <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
            {['🍊 100% Fresh', '🚚 Fast Delivery', '💚 No Preservatives', '⭐ 4.9 Rated'].map(f => (
              <span key={f} className="glass px-4 py-2 rounded-full text-sm text-gray-300">{f}</span>
            ))}
          </div>
        </motion.div>

        {/* Right — Auth Form */}
        <motion.div initial={{ opacity: 0, x: 60 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, delay: 0.2 }}
          className="w-full max-w-md"
        >
          <div className="glass-dark rounded-3xl p-8 shadow-2xl">
            {/* Tabs */}
            <div className="flex rounded-2xl glass p-1 mb-8">
              {['login', 'signup'].map(tab => (
                <button key={tab} onClick={() => setMode(tab)}
                  className={`flex-1 py-3 rounded-xl font-semibold text-sm transition-all duration-300 capitalize ${
                    mode === tab ? 'bg-gradient-to-r from-orange-500 to-pink-500 text-white shadow-lg' : 'text-gray-400 hover:text-white'
                  }`}
                >
                  {tab === 'login' ? 'Sign In' : 'Sign Up'}
                </button>
              ))}
            </div>

            <AnimatePresence mode="wait">
              <motion.form key={mode} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }} onSubmit={handleSubmit} className="space-y-4"
              >
                {mode === 'signup' && (
                  <div className="relative">
                    <User size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
                    <input name="name" value={form.name} onChange={handleChange} required
                      placeholder="Full Name" className="input-field pl-12" />
                  </div>
                )}

                <div className="relative">
                  <Mail size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
                  <input name="email" type="email" value={form.email} onChange={handleChange} required
                    placeholder="Email Address" className="input-field pl-12" />
                </div>

                <div className="relative">
                  <Lock size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
                  <input name="password" type={showPass ? 'text' : 'password'} value={form.password} onChange={handleChange} required
                    placeholder="Password" className="input-field pl-12 pr-12" />
                  <button type="button" onClick={() => setShowPass(!showPass)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white transition-colors"
                  >
                    {showPass ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>

                {mode === 'signup' && (
                  <div className="relative">
                    <Lock size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
                    <input name="confirm" type="password" value={form.confirm} onChange={handleChange} required
                      placeholder="Confirm Password" className="input-field pl-12" />
                  </div>
                )}

                {mode === 'login' && (
                  <div className="flex items-center justify-between text-sm">
                    <label className="flex items-center gap-2 text-gray-400 cursor-pointer">
                      <input type="checkbox" className="rounded" /> Remember me
                    </label>
                    <button type="button" className="text-orange-400 hover:text-orange-300 transition-colors">
                      Forgot password?
                    </button>
                  </div>
                )}

                <motion.button type="submit" disabled={loading}
                  whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                  className="w-full btn-primary py-4 flex items-center justify-center gap-3 text-base"
                >
                  {loading ? (
                    <><Loader size={20} className="animate-spin" /> Processing...</>
                  ) : (
                    <>{mode === 'login' ? 'Sign In' : 'Create Account'} <ArrowRight size={20} /></>
                  )}
                </motion.button>

                {/* Divider */}
                <div className="flex items-center gap-4">
                  <div className="flex-1 h-px bg-white/10" />
                  <span className="text-gray-500 text-sm">or continue with</span>
                  <div className="flex-1 h-px bg-white/10" />
                </div>

                {/* Social Login */}
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { icon: '🔵', label: 'Google' },
                    { icon: '⚫', label: 'GitHub' },
                  ].map(s => (
                    <motion.button key={s.label} type="button"
                      whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                      className="glass py-3 rounded-xl text-sm text-gray-300 hover:text-white transition-all flex items-center justify-center gap-2"
                    >
                      <span>{s.icon}</span> {s.label}
                    </motion.button>
                  ))}
                </div>
              </motion.form>
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
