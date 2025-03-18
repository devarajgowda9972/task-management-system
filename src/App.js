import React from "react";
import TaskList from "./Components/TaskList";
import AddTask from "./Components/AddTask";

function App() {
  return (
    <div className="container mt-4">
      <h2 className="text-center">Task Management System</h2>
      <AddTask />
      <TaskList />
    </div>
  );
}

export default App;
