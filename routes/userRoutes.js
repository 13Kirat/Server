const express = require('express');
const router = express.Router();
const { registerUser } = require('../controllers/userController');
const auth = require('../middleware/auth');

router.post('/register', auth, registerUser);

module.exports = router;
