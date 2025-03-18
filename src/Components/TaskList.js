import React, { useEffect, useState } from "react";

function TaskList() {
  const [tasks, setTasks] = useState([]);
  const API_URL = "https://localhost:5001/api/task";

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    const response = await fetch(API_URL);
    const data = await response.json();
    setTasks(data);
  };

  const deleteTask = async (id) => {
    if (window.confirm("Are you sure you want to delete this task?")) {
      await fetch(`${API_URL}/${id}`, { method: "DELETE" });
      fetchTasks();
    }
  };

  return (
    <table className="table table-bordered mt-4">
      <thead className="thead-dark">
        <tr>
          <th>Title</th>
          <th>Description</th>
          <th>Due Date</th>
          <th>Status</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {tasks.map((task) => (
          <tr key={task.taskId}>
            <td>{task.title}</td>
            <td>{task.description}</td>
            <td>{new Date(task.dueDate).toLocaleDateString()}</td>
            <td>{task.status}</td>
            <td>
              <button
                className="btn btn-warning btn-sm mx-1"
                onClick={() => alert("Edit feature coming soon")}
              >
                Edit
              </button>
              <button
                className="btn btn-danger btn-sm mx-1"
                onClick={() => deleteTask(task.taskId)}
              >
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default TaskList;
