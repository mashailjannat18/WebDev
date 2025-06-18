const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  user: {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
  },
  address: {
    country: { type: String, required: true },
    address: { type: String, required: true },
    city: { type: String, required: true },
    apartment: { type: String },
    postalCode: { type: String },
  },
  items: [
    {
      productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
      title: { type: String, required: true },
      quantity: { type: Number, required: true, min: 1 },
      price: { type: Number, required: true, min: 0 },
      image: { type: String, required: true },
    },
  ],
  totalPrice: { type: Number, required: true, min: 0 },
  status: { type: String, default: 'Pending', enum: ['Pending', 'Confirmed', 'Shipped', 'Delivered'] },
  paymentMethod: { type: String, default: 'Cash', enum: ['Cash', 'Card', 'PayPal'] },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Order', orderSchema);