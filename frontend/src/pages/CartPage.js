import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight, Tag, CheckCircle } from 'lucide-react';
import { useCart } from '../context/AppContext';
import toast from 'react-hot-toast';

export default function CartPage() {
  const { items, total, updateQty, removeItem, clearCart } = useCart();
  const navigate = useNavigate();
  const [coupon, setCoupon] = useState('');
  const [discount, setDiscount] = useState(0);
  const [ordering, setOrdering] = useState(false);
  const [ordered, setOrdered] = useState(false);
  const [orderDetails, setOrderDetails] = useState(null);
  const [address, setAddress] = useState({ name: '', phone: '', addr: '', pincode: '' });

  const delivery = total > 199 ? 0 : 40;
  const finalTotal = total + delivery - discount;

  const applyCoupon = () => {
    const codes = { AMRUTHA20: 0.2, B2G1FREE: 0.15, WEEKEND30: 0.3 };
    const disc = codes[coupon.toUpperCase()];
    if (disc) {
      setDiscount(Math.round(total * disc));
      toast.success(`Coupon applied! ₹${Math.round(total * disc)} saved 🎉`, {
        style: { background: '#1a1a2e', color: '#fff', border: '1px solid rgba(34,197,94,0.3)' },
      });
    } else {
      toast.error('Invalid coupon code');
    }
  };

  const handleOrder = async (e) => {
    e.preventDefault();
    if (!address.name || !address.phone || !address.addr) {
      toast.error('Please fill all delivery details');
      return;
    }
    setOrdering(true);
    await new Promise(r => setTimeout(r, 2000));
    const names = items.map(i => i.name).join(', ');
    setOrderDetails({ names, total: finalTotal, id: 'AJ' + Date.now().toString().slice(-6) });
    setOrdered(true);
    clearCart();
    setOrdering(false);
  };

  if (ordered && orderDetails) return (
    <div className="min-h-screen pt-20 flex items-center justify-center px-6"
      style={{ background: 'linear-gradient(180deg, #0a0a0a 0%, #0f0a00 100%)' }}
    >
      <motion.div initial={{ scale: 0.5, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 200, damping: 15 }}
        className="glass-dark rounded-3xl p-12 text-center max-w-lg w-full"
      >
        <motion.div animate={{ scale: [1, 1.2, 1], rotate: [0, 10, -10, 0] }}
          transition={{ duration: 0.6, delay: 0.3 }} className="text-8xl mb-6"
        >
          🎉
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>
          <CheckCircle size={48} className="text-green-400 mx-auto mb-4" />
          <h2 className="text-3xl font-black text-white mb-3">Order Confirmed!</h2>
          <p className="text-gray-400 mb-4">Order ID: <span className="text-orange-400 font-bold">#{orderDetails.id}</span></p>
          <div className="glass rounded-2xl p-4 mb-6 text-left">
            <p className="text-gray-300 text-sm leading-relaxed">
              Your order for <span className="text-orange-400 font-semibold">{orderDetails.names}</span> has been confirmed.
              Estimated delivery: <span className="text-green-400 font-semibold">30 minutes</span> 🚚
            </p>
          </div>
          <p className="text-2xl font-bold text-white mb-6">Total Paid: ₹{orderDetails.total}</p>
          <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
            onClick={() => navigate('/home')} className="btn-primary w-full py-4 text-lg"
          >
            Continue Shopping 🥤
          </motion.button>
        </motion.div>
      </motion.div>
    </div>
  );

  return (
    <div className="min-h-screen pt-20 px-6 py-8" style={{ background: 'linear-gradient(180deg, #0a0a0a 0%, #0f0a00 100%)' }}>
      <div className="max-w-7xl mx-auto">
        <motion.h1 initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}
          className="text-4xl font-black text-white mb-8 flex items-center gap-3"
        >
          <ShoppingBag className="text-orange-400" /> Your Cart
          {items.length > 0 && <span className="text-lg text-gray-400 font-normal">({items.length} items)</span>}
        </motion.h1>

        {items.length === 0 ? (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-24">
            <div className="text-8xl mb-6">🛒</div>
            <h2 className="text-3xl font-bold text-white mb-4">Your cart is empty</h2>
            <p className="text-gray-400 mb-8">Add some delicious juices to get started!</p>
            <motion.button whileHover={{ scale: 1.05 }} onClick={() => navigate('/menu')} className="btn-primary text-lg px-8 py-4">
              Browse Menu 🥤
            </motion.button>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              <AnimatePresence>
                {items.map(item => (
                  <motion.div key={item.id} layout initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20, height: 0 }}
                    className="glass-dark rounded-2xl p-4 flex items-center gap-4"
                  >
                    <img src={item.image} alt={item.name}
                      className="w-20 h-20 rounded-xl object-cover flex-shrink-0"
                      onError={e => { e.target.src = `https://via.placeholder.com/80x80/1a1a2e/f97316?text=🥤`; }}
                    />
                    <div className="flex-1 min-w-0">
                      <h3 className="font-bold text-white truncate">{item.name}</h3>
                      <p className="text-gray-500 text-sm">
                        {item.size && `Size: ${item.size}`} {item.sugar && `• Sugar: ${item.sugar}`}
                      </p>
                      <p className="text-orange-400 font-bold">₹{item.price}</p>
                    </div>
                    <div className="flex items-center gap-2 glass rounded-xl px-3 py-2">
                      <button onClick={() => updateQty(item.id, item.qty - 1)} className="text-gray-400 hover:text-white transition-colors">
                        <Minus size={16} />
                      </button>
                      <span className="text-white font-bold w-6 text-center">{item.qty}</span>
                      <button onClick={() => updateQty(item.id, item.qty + 1)} className="text-gray-400 hover:text-white transition-colors">
                        <Plus size={16} />
                      </button>
                    </div>
                    <div className="text-white font-bold w-16 text-right">₹{item.price * item.qty}</div>
                    <button onClick={() => removeItem(item.id)} className="text-gray-600 hover:text-red-400 transition-colors ml-2">
                      <Trash2 size={18} />
                    </button>
                  </motion.div>
                ))}
              </AnimatePresence>

              {/* Delivery Address */}
              <div className="glass-dark rounded-2xl p-6">
                <h3 className="text-white font-bold text-lg mb-4">📍 Delivery Address</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <input value={address.name} onChange={e => setAddress(p => ({ ...p, name: e.target.value }))}
                    placeholder="Full Name *" className="input-field" />
                  <input value={address.phone} onChange={e => setAddress(p => ({ ...p, phone: e.target.value }))}
                    placeholder="Phone Number *" className="input-field" />
                  <input value={address.addr} onChange={e => setAddress(p => ({ ...p, addr: e.target.value }))}
                    placeholder="Full Address *" className="input-field sm:col-span-2" />
                  <input value={address.pincode} onChange={e => setAddress(p => ({ ...p, pincode: e.target.value }))}
                    placeholder="Pincode" className="input-field" />
                </div>
              </div>
            </div>

            {/* Summary */}
            <div className="space-y-4">
              {/* Coupon */}
              <div className="glass-dark rounded-2xl p-5">
                <h3 className="text-white font-bold mb-3 flex items-center gap-2"><Tag size={18} /> Apply Coupon</h3>
                <div className="flex gap-2">
                  <input value={coupon} onChange={e => setCoupon(e.target.value)}
                    placeholder="Enter coupon code" className="input-field flex-1 text-sm" />
                  <button onClick={applyCoupon} className="btn-primary px-4 py-2 text-sm">Apply</button>
                </div>
                <div className="mt-3 flex flex-wrap gap-2">
                  {['AMRUTHA20', 'B2G1FREE', 'WEEKEND30'].map(c => (
                    <button key={c} onClick={() => setCoupon(c)}
                      className="text-xs glass px-2 py-1 rounded-lg text-orange-400 font-mono hover:bg-orange-500/10 transition-colors"
                    >
                      {c}
                    </button>
                  ))}
                </div>
              </div>

              {/* Bill */}
              <div className="glass-dark rounded-2xl p-5">
                <h3 className="text-white font-bold mb-4">Bill Summary</h3>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between text-gray-400">
                    <span>Subtotal</span><span className="text-white">₹{total}</span>
                  </div>
                  <div className="flex justify-between text-gray-400">
                    <span>Delivery</span>
                    <span className={delivery === 0 ? 'text-green-400' : 'text-white'}>
                      {delivery === 0 ? 'FREE' : `₹${delivery}`}
                    </span>
                  </div>
                  {discount > 0 && (
                    <div className="flex justify-between text-green-400">
                      <span>Discount</span><span>-₹{discount}</span>
                    </div>
                  )}
                  <div className="border-t border-white/10 pt-3 flex justify-between text-white font-bold text-lg">
                    <span>Total</span><span>₹{finalTotal}</span>
                  </div>
                </div>

                <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                  onClick={handleOrder} disabled={ordering}
                  className="w-full btn-primary py-4 mt-6 text-lg flex items-center justify-center gap-2"
                >
                  {ordering ? (
                    <><div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Placing Order...</>
                  ) : (
                    <>Place Order <ArrowRight size={20} /></>
                  )}
                </motion.button>

                <p className="text-gray-600 text-xs text-center mt-3">🔒 Secure checkout • Free cancellation</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
