const Task = require('../models/Task');

exports.createTask = async (req, res) => {
  const { title, assignedTo } = req.body;

  try {
    const newTask = new Task({
      title,
      assignedTo,
    });

    const task = await newTask.save();
    res.json(task);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

exports.getUserTasks = async (req, res) => {
  try {
    const tasks = await Task.find({ assignedTo: req.user.id });
    res.json(tasks);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

exports.completeTask = async (req, res) => {
  const { taskId } = req.params;
  const { note } = req.body;

  try {
    let task = await Task.findById(taskId);
    if (!task) return res.status(404).json({ msg: 'Task not found' });

    if (task.assignedTo.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'Not authorized' });
    }

    task.status = 'completed';
    task.note = note;
    if (req.files) {
      task.images = req.files.map(file => file.path);
    }

    await task.save();
    res.json(task);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// Fetch task by ID
exports.getTaskById = async (req, res) => {
  try {
    const taskId = req.params.id;

    // Find the task by ID
    const task = await Task.findById(taskId).populate('assignedTo', 'email'/*, 'username'*/);

    if (!task) {
      return res.status(404).json({ msg: 'Task not found' });
    }

    res.json(task);
  } catch (error) {
    console.error('Error fetching task:', error.message);
    res.status(500).send('Server error');
  }
};
