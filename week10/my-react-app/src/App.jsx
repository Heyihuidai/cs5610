import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import TasksList from "./components/TasksList";
import AddTask from './components/AddTask';

export default function App() {
  const appName = "My Awesome App";
  const [tasks, setTasks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Function to fetch all tasks from the server
  const fetchTasks = async () => {
    setIsLoading(true);
    try {
      const response = await fetch("http://localhost:5001/tasks");
      
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      
      const data = await response.json();
      setTasks(data);
      setIsLoading(false);
    } catch (error) {
      console.error("Fetching error:", error);
      setError(error.message);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    // Call the fetchTasks function when component mounts
    fetchTasks();
  }, []);

  const deleteTask = async (id) => {
    try {
      const response = await fetch(`http://localhost:5001/tasks/${id}`, {
        method: 'DELETE'
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      
      // Fetch updated tasks after successful deletion
      fetchTasks();
    } catch (error) {
      console.error("Error deleting task:", error);
      setError(error.message);
    }
  };
  
  const addTask = async (newTask) => {
    try {
      const response = await fetch("http://localhost:5001/tasks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newTask),
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      
      // Fetch updated tasks after successful addition
      fetchTasks();
    } catch (error) {
      console.error("Error adding task:", error);
      setError(error.message);
    }
  };

  return (
    <div className="appContainer">
      <Header myAppName={appName} version={2} />
      <AddTask onAdd={addTask} />
      {error && <div className="error-message">Error: {error}</div>}
      {isLoading ? (
        <div>Loading tasks...</div>
      ) : (
        <TasksList tasks={tasks} onDelete={deleteTask} />
      )}
    </div>
  );
}