const bcrypt = require('bcryptjs');
const User = require('../models/User');

exports.registerUser = async (req, res) => {
  const { /*username,*/ email, password, isAdmin } = req.body;

  try {
    let user = await User.findOne({ email });
    if (user) return res.status(400).json({ msg: 'User already exists' });

    user = new User({ /*username,*/ email, password, isAdmin });

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

    await user.save();
    res.json({ msg: 'User registered successfully' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// Fetch all users (Admin only)
exports.getAllUsers = async (req, res) => {
  try {
    // Check if the requesting user is an admin
    if (!req.user.isAdmin) {
      return res.status(403).json({ msg: 'Access denied. Admins only.' });
    }

    // Fetch all users, excluding passwords
    const users = await User.find().select('-password');
    res.json(users);
  } catch (error) {
    console.error('Error fetching users:', error.message);
    res.status(500).send('Server error');
  }
};

