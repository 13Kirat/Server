const express = require('express');
const router = express.Router();
const { createTask, getUserTasks, completeTask } = require('../controllers/taskController');
const auth = require('../middleware/auth');
const upload = require('../middleware/upload');

router.post('/create', auth, createTask);
router.get('/user', auth, getUserTasks);
router.put('/:taskId/complete', auth, upload.array('images'), completeTask);

module.exports = router;
