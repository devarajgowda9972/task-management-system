import React, { useState } from "react";

function AddTask() {
  const [task, setTask] = useState({
    title: "",
    description: "",
    dueDate: "",
    status: "Pending",
  });

  const API_URL = "https://localhost:5001/api/task";

  const handleChange = (e) => {
    setTask({ ...task, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!task.title || !task.dueDate) {
      alert("Title and Due Date are required.");
      return;
    }

    const response = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(task),
    });

    if (response.ok) {
      alert("Task added successfully!");
      setTask({ title: "", description: "", dueDate: "", status: "Pending" });
      window.location.reload(); // Refresh the task list
    } else {
      alert("Failed to add task.");
    }
  };

  return (
    <form className="mt-3" onSubmit={handleSubmit}>
      <div className="form-group">
        <label>Title</label>
        <input
          type="text"
          name="title"
          className="form-control"
          value={task.title}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-group">
        <label>Description</label>
        <textarea
          name="description"
          className="form-control"
          value={task.description}
          onChange={handleChange}
        ></textarea>
      </div>

      <div className="form-group">
        <label>Due Date</label>
        <input
          type="date"
          name="dueDate"
          className="form-control"
          value={task.dueDate}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-group">
        <label>Status</label>
        <select
          name="status"
          className="form-control"
          value={task.status}
          onChange={handleChange}
        >
          <option value="Pending">Pending</option>
          <option value="InProgress">In Progress</option>
          <option value="Completed">Completed</option>
        </select>
      </div>

      <button type="submit" className="btn btn-primary mt-3">
        Add Task
      </button>
    </form>
  );
}

export default AddTask;
