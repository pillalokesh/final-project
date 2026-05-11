const express = require('express');
const router = express.Router();
const Order = require('../models/Order');
const { protect } = require('../middleware/auth');

// POST /api/orders — Create order
router.post('/', protect, async (req, res) => {
  try {
    const { items, total, delivery, discount, coupon, address } = req.body;

    if (!items || items.length === 0) {
      return res.status(400).json({ success: false, message: 'No items in order' });
    }

    const order = await Order.create({
      user: req.user._id,
      items,
      total,
      delivery: delivery || 0,
      discount: discount || 0,
      coupon: coupon || '',
      address
    });

    res.status(201).json({ success: true, order });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// GET /api/orders/my — Get user's orders
router.get('/my', protect, async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id }).sort({ createdAt: -1 });
    res.json({ success: true, orders });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// GET /api/orders/:id — Get single order
router.get('/:id', protect, async (req, res) => {
  try {
    const order = await Order.findOne({ orderId: req.params.id, user: req.user._id });
    if (!order) return res.status(404).json({ success: false, message: 'Order not found' });
    res.json({ success: true, order });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;
