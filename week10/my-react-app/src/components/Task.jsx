import React from "react";
import { FaTrash } from "react-icons/fa";

export default function Task({ taskObj, onDelete }) {
  const handleDeleteClick = () => {
    onDelete(taskObj.id);
  };

  return (
    <li>
      <div className="taskContainer" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <p>{taskObj.title}</p>
          <p>{taskObj.date}</p>
        </div>
        <div 
          style={{ color: '#ff6b6b', cursor: 'pointer', fontSize: '1.2rem' }} 
          onClick={handleDeleteClick}
        >
          <FaTrash />
        </div>
      </div>
    </li>
  );
}