const express = require('express');
const router = express.Router();
const { findAllTasks, findTaskById } = require('../db');

router.get('/', async (req, res) => {
  try {
    const tasks = await findAllTasks();
    res.render('tasks', { 
      title: 'All Tasks',
      tasks: tasks 
    });
  } catch (error) {
    console.error("Error retrieving tasks:", error);
    res.status(500).render('error', { 
      message: 'Error retrieving tasks',
      error: process.env.NODE_ENV === 'development' ? error : {}
    });
  }
});

router.get('/:taskId', async (req, res) => {
  try {
    const taskId = req.params.taskId;
    
    const task = await findTaskById(taskId);
    
    if (!task) {
      return res.status(404).render('error', { 
        message: 'Task not found',
        error: { status: 404 }
      });
    }
    
    res.render('taskDetail', {
      title: task.title,
      task: task
    });
  } catch (error) {
    console.error("Error retrieving task details:", error);
    
    if (error.name === 'BSONError' || error.name === 'BSONTypeError') {
      return res.status(400).render('error', { 
        message: 'Invalid task ID format',
        error: { status: 400 }
      });
    }
    
    res.status(500).render('error', { 
      message: 'Error retrieving task details',
      error: process.env.NODE_ENV === 'development' ? error : {}
    });
  }
});

module.exports = router;