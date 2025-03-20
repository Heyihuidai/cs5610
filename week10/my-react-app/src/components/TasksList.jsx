import React from "react";
import Task from "./Task";

export default function TasksList({ tasks, onDelete }) {
  return (
    <>
      {tasks.length > 0 ? (
        <ul>
          {tasks.map((task) => {
            return <Task key={task.id} taskObj={task} onDelete={onDelete} />;
          })}
        </ul>
      ) : (
        <p>• No Tasks Left</p>
      )}
    </>
  );
}