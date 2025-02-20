const express = require('express');
const app = express();
app.use(express.static('public'));

const tasksRouter = require('./routes/tasks');
app.use('/tasks', tasksRouter);

app.get('/', (req, res) => {
  res.send('Hello and welcome to my site!');
});

const port = 3000;
app.listen(port, function() {
  console.log(`Example app listening on port ${port}!`)
});