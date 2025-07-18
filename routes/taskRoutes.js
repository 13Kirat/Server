const express = require('express');
const router = express.Router();
const { createTask, getUserTasks, completeTask, getTaskById, getAllTasks } = require('../controllers/taskController');
const auth = require('../middleware/auth');
const upload = require('../middleware/upload');

router.post('/create', auth, createTask);
router.get('/user', auth, getUserTasks);
router.get('/all', auth, getAllTasks);
router.put('/:taskId/complete', auth, upload.array('images'), completeTask);
router.get('/:id', auth, getTaskById);

module.exports = router;
