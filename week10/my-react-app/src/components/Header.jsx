import React from "react";

export default function Header({ myAppName }) {
  return (
    <div>
      <header className="headerContainer">
        <h1>Welcome to {myAppName} </h1>
        <button>Add a Task</button>
      </header>
    </div>
  );
}
