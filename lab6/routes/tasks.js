const express = require('express');
const router = express.Router();
const path = require('path');
const { findAllTasks, findTaskById, ObjectId } = require('../db');

// Fetch all tasks
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

// Serve the task creation form
router.get('/newtask', function (req, res) {
  res.sendFile(path.join(__dirname, '../public', 'newtask.html'));
});

// Handle task creation (POST /tasks)
router.post('/', async (req, res) => {
  try {
    console.log("Raw request body:", req.body);  // Debugging

    const { title, date, completed, description } = req.body;

    if (!title || title.trim() === "") {
        console.log("Title is missing!");  // Debugging
        return res.status(400).render('error', { 
          message: 'Task title is required', 
          error: { status: 400 } 
        });
      }

    const newTask = {
      title,
      date: date || null,
      completed: completed === "on",
      description: description || "",
    };

    const db = require('../db').client.db("cs5610");
    const collection = db.collection("tasks");

    const result = await collection.insertOne(newTask);
    console.log("Task created successfully:", result.insertedId);

    res.redirect('/tasks');
  } catch (error) {
    console.error("Error creating task:", error);
    res.status(500).render('error', { 
      message: 'Error creating task',
      error: process.env.NODE_ENV === 'development' ? error : {}
    });
  }
});

// Fetch a specific task by ID
router.get('/:taskId', async (req, res) => {
  try {
    const taskId = req.params.taskId;

    if (!ObjectId.isValid(taskId)) {
      return res.status(400).render('error', { 
        message: 'Invalid task ID format',
        error: { status: 400 }
      });
    }
    
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
    res.status(500).render('error', { 
      message: 'Error retrieving task details',
      error: process.env.NODE_ENV === 'development' ? error : {}
    });
  }
});

module.exports = router;