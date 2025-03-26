const express = require('express');
const router = express.Router();
const { registerUser, getAllUsers } = require('../controllers/userController');
const auth = require('../middleware/auth');

router.post('/register', auth, registerUser);
router.get('/getAll', auth, getAllUsers);
module.exports = router;
