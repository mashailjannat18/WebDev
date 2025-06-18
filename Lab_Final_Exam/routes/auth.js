const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const User = require('../models/User');

router.get('/signup', (req, res) => {
  res.render('signup', { user: req.session.user, error: null, page: 'SignUp' });
});

router.post('/signup', async (req, res) => {
  const { firstName, lastName, email, password } = req.body;
  try {
    let user = await User.findOne({ email });
    if (user) {
      return res.render('signup', { user: req.session.user, error: 'Email already exists', page: 'SignUp' });
    }
    user = new User({ firstName, lastName, email, password });
    await user.save();
    req.session.user = { firstName, email };
    res.redirect('/orders');
  } catch (err) {
    console.error('Error in signup:', err);
    res.render('signup', { user: req.session.user, error: 'Registration failed', page: 'SignUp' });
  }
});

router.get('/signin', (req, res) => {
  res.render('signin', { user: req.session.user, error: null, page: 'SignIn' });
});

router.post('/signin', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user || !(await user.comparePassword(password))) {
      return res.render('signin', { user: req.session.user, error: 'Invalid credentials', page: 'SignIn' });
    }
    req.session.user = { firstName: user.firstName, email: user.email };
    res.redirect('/orders');
  } catch (err) {
    console.error('Error in signin:', err);
    res.render('signin', { user: req.session.user, error: 'Login failed', page: 'SignIn' });
  }
});

router.get('/logout', (req, res) => {
  req.session.destroy();
  res.redirect('/');
});

module.exports = router;