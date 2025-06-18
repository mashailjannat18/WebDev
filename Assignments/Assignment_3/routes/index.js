const express = require('express');
const router = express.Router();
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
  { name: 'Men Shirt 3', description: 'Linen shirt', image: '/assets/34.webp', category: 'Men', price: 85 }
];

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
    res.render('products', { 
      products: productsFromDB,
      user: req.session.user, 
      page: 'ViewAllPage' 
    });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

router.get('/about', (req, res) => {
  res.render('about', { user: req.session.user, page: 'About' });
});

module.exports = router;