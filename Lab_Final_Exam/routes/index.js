const express = require('express');
const router = express.Router();
const Order = require('../models/Order');
const Complaint = require('../models/Complaint');
const User = require('../models/User');
const Product = require('../models/Product');

const products = [
  { name: 'Women Collection 1', description: 'Light cashmere dress', image: '/assets/8.webp', category: 'Women', price: 120 },
  { name: 'Men Shirt', description: 'Crisp poplin shirt', image: '/assets/9.webp', category: 'Men', price: 100 },
  { name: 'MHL Women Jacket', description: 'MHL Women jacket', image: '/assets/10.webp', category: 'MHL Women', price: 150 },
  { name: 'MHL Men Coat', description: 'MHL Men coat', image: '/assets/11.webp', category: 'MHL Men', price: 180 },
  { name: 'Women Sweater', description: 'Dense linen sweater', image: '/assets/12.webp', category: 'Women', price: 110 },
  { name: 'Men Trousers', description: 'Tailored trousers', image: '/assets/13.webp', category: 'Men', price: 90 },
  { name: 'Home Decor 1', description: 'Minimalist decor', image: '/assets/14.webp', category: 'Home Products', price: 50 },
  { name: 'Women Scarf', description: 'Light cashmere scarf', image: '/assets/15.webp', category: 'Women', price: 60 },
  { name: 'Men Jacket', description: 'Casual jacket', image: '/assets/16.webp', category: 'Men', price: 130 },
  { name: 'MHL Women Shirt', description: 'MHL poplin shirt', image: '/assets/17.webp', category: 'MHL Women', price: 95 },
  { name: 'MHL Men Sweater', description: 'MHL knit sweater', image: '/assets/18.webp', category: 'MHL Men', price: 120 },
  { name: 'Women Coat', description: 'Wool coat', image: '/assets/19.webp', category: 'Women', price: 200 },
  { name: 'Men Scarf', description: 'Wool scarf', image: '/assets/20.webp', category: 'Men', price: 55 },
  { name: 'Home Decor 2', description: 'Ceramic vase', image: '/assets/21.webp', category: 'Home Products', price: 70 },
  { name: 'Women Trousers', description: 'Linen trousers', image: '/assets/22.webp', category: 'Women', price: 85 },
  { name: 'Men Shirt 2', description: 'Cotton shirt', image: '/assets/23.webp', category: 'Men', price: 80 },
  { name: 'MHL Women Dress', description: 'MHL summer dress', image: '/assets/24.webp', category: 'MHL Women', price: 140 },
  { name: 'MHL Men Jacket', description: 'MHL denim jacket', image: '/assets/25.webp', category: 'MHL Men', price: 160 },
  { name: 'Women Blouse', description: 'Silk blouse', image: '/assets/26.webp', category: 'Women', price: 110 },
  { name: 'Men Sweater', description: 'Knit sweater', image: '/assets/27.webp', category: 'Men', price: 115 },
  { name: 'Home Decor 3', description: 'Wooden tray', image: '/assets/28.webp', category: 'Home Products', price: 45 },
  { name: 'Women Skirt', description: 'Linen skirt', image: '/assets/29.webp', category: 'Women', price: 90 },
  { name: 'Men Coat 2', description: 'Wool overcoat', image: '/assets/30.webp', category: 'Men', price: 210 },
  { name: 'MHL Women Scarf', description: 'MHL cashmere scarf', image: '/assets/31.webp', category: 'MHL Women', price: 65 },
  { name: 'MHL Men Trousers', description: 'MHL tailored trousers', image: '/assets/32.webp', category: 'MHL Men', price: 100 },
  { name: 'Women Jacket 2', description: 'Light jacket', image: '/assets/33.webp', category: 'Women', price: 130 },
  { name: 'Men Shirt 3', description: 'Linen shirt', image: '/assets/34.webp', category: 'Men', price: 85 },
];

// Middleware to ensure user is logged in
const ensureAuthenticated = (req, res, next) => {
  if (req.session.user) {
    return next();
  }
  res.redirect('/auth/signin?message=Please sign in to continue');
};

router.get('/', async (req, res) => {
  try {
    const productsFromDB = await Product.find();
    if (productsFromDB.length === 0) {
      await Product.deleteMany({});
      await Product.insertMany(products);
      console.log('Sample products inserted for home route');
    }
    res.render('index', { products: productsFromDB.slice(0, 4), user: req.session.user, page: 'LandingPage' });
  } catch (err) {
    console.error('Error in home route:', err);
    res.status(500).send('Server Error');
  }
});

router.get('/products', async (req, res) => {
  try {
    const productsFromDB = await Product.find();
    if (productsFromDB.length === 0) {
      await Product.deleteMany({});
      await Product.insertMany(products);
      console.log('Sample products inserted for products route');
    }
    res.render('products', { products: productsFromDB, user: req.session.user, page: 'ViewAllPage', message: req.query.message });
  } catch (err) {
    console.error('Error in products route:', err);
    res.status(500).send('Server Error');
  }
});

router.post('/cart/add', async (req, res) => {
  try {
    const { productId } = req.body;
    const product = await Product.findById(productId);
    if (!product) {
      return res.redirect('/products?message=Product not found');
    }

    req.session.cart = req.session.cart || [];
    const existingItem = req.session.cart.find(item => item.productId.toString() === productId);
    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      req.session.cart.push({
        productId: product._id,
        title: product.name,
        price: product.price,
        image: product.image,
        quantity: 1,
      });
    }

    res.redirect('/products?message=Item added to cart');
  } catch (err) {
    console.error('Error adding to cart:', err);
    res.redirect('/products?message=Error adding to cart');
  }
});

router.get('/cart', (req, res) => {
  const cart = req.session.cart || [];
  const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  res.render('cart', { cart, totalPrice, user: req.session.user, page: 'Cart', message: req.query.message });
});

router.post('/cart/update', (req, res) => {
  const { productId, quantity } = req.body;
  const cart = req.session.cart || [];
  const item = cart.find(item => item.productId.toString() === productId);
  if (item) {
    const newQuantity = parseInt(quantity, 10);
    if (newQuantity > 0) {
      item.quantity = newQuantity;
    } else {
      req.session.cart = cart.filter(i => i.productId.toString() !== productId);
    }
  }
  res.redirect('/cart?message=Cart updated');
});

router.post('/cart/remove', (req, res) => {
  const { productId } = req.body;
  req.session.cart = (req.session.cart || []).filter(item => item.productId.toString() !== productId);
  res.redirect('/cart?message=Item removed');
});

router.get('/checkout', ensureAuthenticated, (req, res) => {
  const cart = req.session.cart || [];
  if (cart.length === 0) {
    return res.redirect('/cart?message=Cart is empty');
  }
  const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  res.render('checkout', { cart, totalPrice, user: req.session.user, page: 'Checkout', message: req.query.message });
});

router.post('/checkout', ensureAuthenticated, async (req, res) => {
  try {
    const { firstName, lastName, phone, country, address, city, apartment, postalCode } = req.body;
    const cart = req.session.cart || [];
    if (cart.length === 0) {
      return res.redirect('/checkout?message=Cart is empty');
    }

    const user = await User.findOne({ email: req.session.user.email });
    const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const order = new Order({
      userId: user._id,
      user: {
        firstName,
        lastName,
        email: req.session.user.email,
        phone,
      },
      address: {
        country,
        address,
        city,
        apartment,
        postalCode,
      },
      items: cart.map(item => ({
        productId: item.productId,
        title: item.title,
        quantity: item.quantity,
        price: item.price,
        image: item.image,
      })),
      totalPrice,
      paymentMethod: 'Cash',
    });

    await order.save();
    req.session.cart = [];
    res.redirect('/cart?message=Order placed successfully');
  } catch (err) {
    console.error('Error placing order:', err);
    res.redirect('/checkout?message=Error placing order');
  }
});

router.get('/orders', ensureAuthenticated, async (req, res) => {
  try {
    const user = await User.findOne({ email: req.session.user.email });
    const orders = await Order.find({ userId: user._id }).sort({ createdAt: -1 });
    res.render('orders', { orders, user: req.session.user, page: 'Orders', message: req.query.message });
  } catch (err) {
    console.error('Error fetching orders:', err);
    res.status(500).send('Server Error');
  }
});

router.get('/contact', ensureAuthenticated, async (req, res) => {
  try {
    const user = await User.findOne({ email: req.session.user.email });
    const orders = await Order.find({ userId: user._id }).select('_id');
    const complaints = await Complaint.find({ userId: user._id }).populate('orderId').sort({ createdAt: -1 });
    res.render('contact', { orders, complaints, user: req.session.user, page: 'Contact', message: req.query.message });
  } catch (err) {
    console.error('Error fetching contact data:', err);
    res.status(500).send('Server Error');
  }
});

router.post('/contact', ensureAuthenticated, async (req, res) => {
  try {
    const { orderId, message } = req.body;
    const user = await User.findOne({ email: req.session.user.email });
    const order = await Order.findOne({ _id: orderId, userId: user._id });
    if (!order) {
      return res.redirect('/contact?message=Invalid order ID');
    }
    const complaint = new Complaint({
      userId: user._id,
      orderId,
      message,
    });
    await complaint.save();
    res.redirect('/contact?message=Complaint submitted successfully');
  } catch (err) {
    console.error('Error submitting complaint:', err);
    res.redirect('/contact?message=Error submitting complaint');
  }
});

router.get('/about', (req, res) => {
  res.render('about', { user: req.session.user, page: 'About' });
});

module.exports = router;