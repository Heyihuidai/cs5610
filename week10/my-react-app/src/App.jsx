import React from "react";
import Header from "./components/Header";
import TasksList from "./components/TasksList";
import AddTask from './components/AddTask';

export default function App() {
  const appName = "My Awesome App";
  return (
    <div className="appContainer">
      <Header myAppName={appName} version={2} />
      <AddTask />
      <TasksList />
    </div>
  );
}