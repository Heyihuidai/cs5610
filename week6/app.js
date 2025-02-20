//const fs = require('fs');
//function writeCB() {}
//fs.writeFile("data.txt", "This is a message for you", (err) => {
    //if (err) {
      //return console.error('Error writing file:', err);
    //} else {
      //console.log('File written successfully.');
      //fs.readFile("data.txt", "utf8", (err, data) => {
        //if (err) {
          //return console.error('Error reading file:', err);
        //} else {
          //console.log('File contents:', data);
        //}
    //});
    //}
//});

//const logger = require('./logger.js');
//logger.log();

const express = require('express');
const app = express();

app.use(express.static('public'));

app.get('/', (req, res) => {
  res.send('Hello and welcome to my site!');
});

app.get('/tasks', (req, res) => {
  res.send('<h1>List of all the tasks</h1>');
});

app.get('/tasks/:taskId', (req, res) => {
  const taskId = req.params.taskId;
  console.log(req.params.taskId);
  res.send(`You are viewing task ${taskId}`);
});

const port = 3000;
app.listen(port, function() {
  console.log(`Example app listening on port ${port}!`)
});