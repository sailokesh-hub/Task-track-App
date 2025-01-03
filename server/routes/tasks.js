// routes/tasks.js
const express = require('express');
const router = express.Router();
const Task = require('../models/Task');
const authenticate = require('../middleware/verifyToken');

router.get('/tasks', authenticate, async (req, res) => {
  try {
    const tasks = await Task.find({ userId: req.user.userId });
    res.status(200).json(tasks);
  } catch (err) {
    res.status(500).json({ message: 'Server Error' });
  }
});


// Create a new task
router.post('/tasks', authenticate, async (req, res) => {
  try {
    const { taskName, description, dueDate, status, priority } = req.body;
    console.log(req.body)
    const newTask = new Task({ taskName, description, dueDate, status, priority, userId: req.user.userId });
    await newTask.save();
    res.status(201).json(newTask);
  } catch (err) {
    res.status(500).json({ message: 'Server Error' });
  }
});

// Update a task
router.put('/tasks/:id', authenticate, async (req, res) => {
  try {
    const { taskName, description, dueDate, status, priority } = req.body;
    const task = await Task.findByIdAndUpdate(
      req.params.id,
      { taskName, description, dueDate, status, priority },
      { new: true }
    );
    res.status(200).json(task);
  } catch (err) {
    res.status(500).json({ message: 'Server Error' });
  }
});

// Delete a task
router.delete('/tasks/:id', authenticate, async (req, res) => {
  try {
    await Task.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Task deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Server Error' });
  }
});

module.exports = router;
