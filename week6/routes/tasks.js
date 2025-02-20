const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.send('<h1>List of all the tasks</h1>');
});

router.get('/:taskId', (req, res) => {
  const taskId = req.params.taskId;
  console.log(req.params.taskId);
  res.send(`You are viewing task ${taskId}`);
});

module.exports = router;