const express = require('express');
const router = express.Router();
const axios = require('axios');

router.get('/', async (req, res) => {
    try {
        const response = await axios.get('https://jsonplaceholder.typicode.com/todos/');
        res.json(response.data);
      } catch (error) {
        console.error('Error fetching tasks:', error);
        res.status(500).json({ error: 'Failed to fetch tasks' });
      }
});

router.get('/:taskId', async (req, res) => {
  try {
    const taskId = req.params.taskId;
    const response = await axios.get(`https://jsonplaceholder.typicode.com/todos/${taskId}`);
    const task = response.data;
 
    res.render('task', { 
      id: taskId,
      title: task.title,
      completed: task.completed,
    });
  } catch (error) {

    console.error('Error fetching task:', error);
    res.status(500).json({ error: 'Failed to fetch task data' });
  }
});

module.exports = router;