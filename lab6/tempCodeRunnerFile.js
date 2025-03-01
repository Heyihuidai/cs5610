const express = require('express');
const path = require('path');
const { connectToDatabase } = require('./db');
const tasksRouter = require('./routes/tasks');

const app = express();
const port = process.env.PORT || 3000;

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// Ensure middleware is loaded before routes
app.use(express.urlencoded({ extended: true })); // Parses form data
app.use(express.json()); // Parses JSON data
app.use(express.static(path.join(__dirname, 'public')));

// Debugging middleware to log incoming requests
app.use((req, res, next) => {
  console.log(`Incoming request: ${req.method} ${req.url}`);
  console.log("Request Body:", req.body);
  next();
});

app.use('/tasks', tasksRouter);

app.get('/', (req, res) => {
  res.redirect('/tasks');
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error("Error occurred:", err);
  res.status(err.status || 500).render('error', {
    message: err.message,
    error: process.env.NODE_ENV === 'development' ? err : {}
  });
});

async function startServer() {
  try {
    await connectToDatabase();
    app.listen(port, () => {
      console.log(`Server running at http://localhost:${port}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
}

startServer();

module.exports = app;