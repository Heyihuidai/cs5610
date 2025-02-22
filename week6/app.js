const express = require('express');
const app = express();
app.use(express.static('css'));
app.use(express.static('public'));

app.set('view engine', 'pug');
app.set('views', './views');

const tasksRouter = require('./routes/tasks');
app.use('/tasks', tasksRouter);

const usersRouter = require('./routes/users');
app.use('/users', usersRouter);

app.get('/', (req, res) => {
  res.send('Hello and welcome to my site!');
});

const port = 3000;
app.listen(port, function() {
  console.log(`Example app listening on port ${port}!`)
});