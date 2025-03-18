import React, { useState, useEffect } from "react";

function EditTask({ taskId, onClose }) {
  const [task, setTask] = useState({
    title: "",
    description: "",
    dueDate: "",
    status: "Pending",
  });

  const API_URL = `https://localhost:5001/api/task/${taskId}`;

  useEffect(() => {
    fetch(API_URL)
      .then((res) => res.json())
      .then((data) => setTask(data));
  }, [taskId]);

  const handleChange = (e) => {
    setTask({ ...task, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch(API_URL, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(task),
    });

    if (response.ok) {
      alert("Task updated successfully!");
      window.location.reload();
    } else {
      alert("Failed to update task.");
    }
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <h4>Edit Task</h4>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="title"
            value={task.title}
            onChange={handleChange}
            required
          />
          <textarea
            name="description"
            value={task.description}
            onChange={handleChange}
          ></textarea>
          <input
            type="date"
            name="dueDate"
            value={task.dueDate}
            onChange={handleChange}
            required
          />
          <select name="status" value={task.status} onChange={handleChange}>
            <option value="Pending">Pending</option>
            <option value="InProgress">In Progress</option>
            <option value="Completed">Completed</option>
          </select>
          <button type="submit">Save Changes</button>
          <button onClick={onClose}>Cancel</button>
        </form>
      </div>
    </div>
  );
}

export default EditTask;
