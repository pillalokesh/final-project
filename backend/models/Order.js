const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  items: [{
    juiceId: Number,
    name: String,
    price: Number,
    qty: Number,
    size: String,
    sugar: String,
    ice: String,
    image: String
  }],
  total: { type: Number, required: true },
  delivery: { type: Number, default: 0 },
  discount: { type: Number, default: 0 },
  coupon: { type: String, default: '' },
  address: {
    name: String,
    phone: String,
    addr: String,
    pincode: String
  },
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'preparing', 'out_for_delivery', 'delivered', 'cancelled'],
    default: 'confirmed'
  },
  orderId: { type: String, unique: true },
  createdAt: { type: Date, default: Date.now }
});

// Auto-generate orderId
orderSchema.pre('save', function (next) {
  if (!this.orderId) {
    this.orderId = 'AJ' + Date.now().toString().slice(-6);
  }
  next();
});

module.exports = mongoose.model('Order', orderSchema);
