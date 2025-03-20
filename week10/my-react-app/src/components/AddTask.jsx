import React, { useState } from 'react';

export default function AddTask({ onAdd }) {
  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Form validation
    if (!title) {
      alert('Please add a title');
      return;
    }
    
    const newTask = {
      title: title,
      date: date
    };
    
    // Call the onAdd prop function to send POST request
    onAdd(newTask);
    
    // Clear the form
    setTitle('');
    setDate('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-control">
        <label>Title</label>
        <input 
          type="text" 
          value={title} 
          onChange={(e) => setTitle(e.target.value)} 
          placeholder="Add Task Title"
        />
      </div>
      <div className="form-control">
        <label>Date</label>
        <input 
          type="text" 
          value={date} 
          onChange={(e) => setDate(e.target.value)}
          placeholder="Add Date & Time"
        />
      </div>
      <button type="submit"> Save </button>
    </form>
  );
}