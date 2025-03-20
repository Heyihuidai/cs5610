import React, { useState } from 'react';

export default function AddTask() {
  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const newTask = {
      id: Math.floor(Math.random() * 10000) + 1,
      title: title,
      date: date
    };
    
    console.log(newTask);
    
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
        />
      </div>
      <div className="form-control">
        <label>Date</label>
        <input 
          type="text" 
          value={date} 
          onChange={(e) => setDate(e.target.value)}
        />
      </div>
      <button type="submit"> Save </button>
    </form>
  );
}