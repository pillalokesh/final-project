const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const { pool } = require('../config/database');

// Auth middleware
const protect = async (req, res, next) => {
  try {
    let token;
    if (req.headers.authorization?.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1];
    } else if (req.cookies.token) {
      token = req.cookies.token;
    }
    if (!token) return res.status(401).json({ success: false, message: 'Not authorized' });
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'amrutha_juice_secret');
    req.userId = decoded.id;
    next();
  } catch {
    res.status(401).json({ success: false, message: 'Not authorized' });
  }
};

// POST /api/orders
router.post('/', protect, async (req, res) => {
  try {
    const { items, total, delivery, discount, coupon, address } = req.body;
    if (!items || items.length === 0) {
      return res.status(400).json({ success: false, message: 'No items in order' });
    }

    const orderId = 'AJ' + Date.now().toString().slice(-6);

    await pool.query(
      'INSERT INTO orders (user_id, order_id, items, total, delivery, discount, coupon, address) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
      [req.userId, orderId, JSON.stringify(items), total, delivery || 0, discount || 0, coupon || '', JSON.stringify(address)]
    );

    res.status(201).json({ success: true, orderId, message: 'Order placed successfully!' });
  } catch (error) {
    console.error('Order error:', error.message);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// GET /api/orders/my
router.get('/my', protect, async (req, res) => {
  try {
    const [orders] = await pool.query(
      'SELECT * FROM orders WHERE user_id = ? ORDER BY created_at DESC',
      [req.userId]
    );
    res.json({ success: true, orders });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// GET /api/orders/:id
router.get('/:id', protect, async (req, res) => {
  try {
    const [orders] = await pool.query(
      'SELECT * FROM orders WHERE order_id = ? AND user_id = ?',
      [req.params.id, req.userId]
    );
    if (orders.length === 0) return res.status(404).json({ success: false, message: 'Order not found' });
    res.json({ success: true, order: orders[0] });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

module.exports = router;
