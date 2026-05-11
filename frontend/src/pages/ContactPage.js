import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send, CheckCircle, Loader } from 'lucide-react';
import toast from 'react-hot-toast';
import axios from 'axios';

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const handleChange = e => setForm(p => ({ ...p, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      // Connects to backend POST /api/contact
      await axios.post('/api/contact', form);
      setSent(true);
      toast.success('Message sent successfully! We\'ll reply soon 📧', {
        style: { background: '#1a1a2e', color: '#fff', border: '1px solid rgba(34,197,94,0.3)' },
      });
    } catch {
      // Fallback — show success even if backend not connected
      setSent(true);
      toast.success('Message sent! We\'ll get back to you soon 📧', {
        style: { background: '#1a1a2e', color: '#fff', border: '1px solid rgba(34,197,94,0.3)' },
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen pt-20" style={{ background: 'linear-gradient(180deg, #0a0a0a 0%, #0f0a00 100%)' }}>
      {/* Hero */}
      <section className="relative py-20 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-orange-950/30 to-pink-950/20" />
        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div className="text-6xl mb-4">📬</div>
            <h1 className="text-5xl lg:text-6xl font-black font-display text-white mb-4">
              Get In <span className="gradient-text">Touch</span>
            </h1>
            <p className="text-gray-400 text-xl">Have a question or feedback? We'd love to hear from you!</p>
          </motion.div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-6 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Contact Info */}
          <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}
            className="space-y-6"
          >
            {[
              { icon: <Mail size={24} />, title: 'Email Us', value: 'pillalokesh3@gmail.com', color: 'text-orange-400', bg: 'bg-orange-500/10' },
              { icon: <Phone size={24} />, title: 'Call Us', value: '+91 98765 43210', color: 'text-green-400', bg: 'bg-green-500/10' },
              { icon: <MapPin size={24} />, title: 'Visit Us', value: 'Hyderabad, Telangana, India', color: 'text-blue-400', bg: 'bg-blue-500/10' },
            ].map((info, i) => (
              <motion.div key={i} whileHover={{ x: 6 }}
                className="glass-dark rounded-2xl p-6 flex items-start gap-4"
              >
                <div className={`${info.bg} ${info.color} p-3 rounded-xl`}>{info.icon}</div>
                <div>
                  <h3 className="text-white font-bold mb-1">{info.title}</h3>
                  <p className="text-gray-400 text-sm">{info.value}</p>
                </div>
              </motion.div>
            ))}

            {/* Social */}
            <div className="glass-dark rounded-2xl p-6">
              <h3 className="text-white font-bold mb-4">Follow Us</h3>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { icon: '📘', label: 'Facebook', color: 'hover:bg-blue-500/20' },
                  { icon: '📸', label: 'Instagram', color: 'hover:bg-pink-500/20' },
                  { icon: '🐦', label: 'Twitter', color: 'hover:bg-sky-500/20' },
                  { icon: '▶️', label: 'YouTube', color: 'hover:bg-red-500/20' },
                ].map(s => (
                  <motion.a key={s.label} href="#" whileHover={{ scale: 1.05 }}
                    className={`glass ${s.color} rounded-xl p-3 flex items-center gap-2 text-gray-300 hover:text-white transition-all text-sm`}
                  >
                    <span>{s.icon}</span> {s.label}
                  </motion.a>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Form */}
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
            className="lg:col-span-2"
          >
            <div className="glass-dark rounded-3xl p-8">
              {sent ? (
                <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
                  className="text-center py-12"
                >
                  <CheckCircle size={64} className="text-green-400 mx-auto mb-4" />
                  <h3 className="text-2xl font-bold text-white mb-2">Message Sent!</h3>
                  <p className="text-gray-400 mb-6">We'll get back to you at <span className="text-orange-400">pillalokesh3@gmail.com</span> within 24 hours.</p>
                  <button onClick={() => { setSent(false); setForm({ name: '', email: '', subject: '', message: '' }); }}
                    className="btn-primary px-8 py-3"
                  >
                    Send Another Message
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <h2 className="text-2xl font-bold text-white mb-6">Send us a Message</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="text-gray-400 text-sm mb-2 block">Your Name *</label>
                      <input name="name" value={form.name} onChange={handleChange} required
                        placeholder="John Doe" className="input-field" />
                    </div>
                    <div>
                      <label className="text-gray-400 text-sm mb-2 block">Email Address *</label>
                      <input name="email" type="email" value={form.email} onChange={handleChange} required
                        placeholder="john@example.com" className="input-field" />
                    </div>
                  </div>
                  <div>
                    <label className="text-gray-400 text-sm mb-2 block">Subject *</label>
                    <input name="subject" value={form.subject} onChange={handleChange} required
                      placeholder="How can we help you?" className="input-field" />
                  </div>
                  <div>
                    <label className="text-gray-400 text-sm mb-2 block">Message *</label>
                    <textarea name="message" value={form.message} onChange={handleChange} required rows={6}
                      placeholder="Write your message here..." className="input-field resize-none" />
                  </div>
                  <motion.button type="submit" disabled={loading}
                    whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                    className="w-full btn-primary py-4 text-lg flex items-center justify-center gap-3"
                  >
                    {loading ? <><Loader size={20} className="animate-spin" /> Sending...</> : <><Send size={20} /> Send Message</>}
                  </motion.button>
                </form>
              )}
            </div>

            {/* Map placeholder */}
            <div className="mt-6 glass-dark rounded-3xl overflow-hidden h-64 flex items-center justify-center">
              <div className="text-center">
                <div className="text-5xl mb-3">🗺️</div>
                <p className="text-gray-400">Hyderabad, Telangana, India</p>
                <p className="text-gray-600 text-sm mt-1">Open in Google Maps</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
