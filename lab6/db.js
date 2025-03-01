const { MongoClient, ObjectId } = require('mongodb');
require('dotenv').config();

const uri = process.env.MONGODB_URI;

const client = new MongoClient(uri);

const dbName = "cs5610";
const tasksCollection = "tasks";

async function connectToDatabase() {
  try {
    await client.connect();
    console.log("Successfully connected to MongoDB Atlas");
    return client;
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    process.exit(1);
  }
}


async function findAllTasks() {
  try {
    const db = client.db(dbName);
    const collection = db.collection(tasksCollection);
    
    const tasks = await collection.find({}).toArray();
    
    console.log(`Retrieved ${tasks.length} tasks from database`);
    return tasks;
  } catch (error) {
    console.error("Error retrieving tasks:", error);
    throw error;
  }
}

async function findTaskById(taskId) {
  try {
    const db = client.db(dbName);
    const collection = db.collection(tasksCollection);
    
    const objectId = new ObjectId(taskId);
    
    const task = await collection.findOne({ _id: objectId });
    
    if (task) {
      console.log(`Found task with ID: ${taskId}`);
    } else {
      console.log(`No task found with ID: ${taskId}`);
    }
    
    return task;
  } catch (error) {
    console.error(`Error finding task with ID ${taskId}:`, error);
    throw error;
  }
}

module.exports = {
  connectToDatabase,
  findAllTasks,
  findTaskById,
  ObjectId,
  client
};