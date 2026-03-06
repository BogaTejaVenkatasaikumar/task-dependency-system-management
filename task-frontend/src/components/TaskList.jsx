import React, { useEffect, useState } from "react";
import API from "../services/api";
import TaskForm from "./TaskForm";
import DependencyForm from "./DependencyForm";

function TaskList() {
  const [tasks, setTasks] = useState([]);

  // Fetch tasks from backend
  const fetchTasks = async () => {
    try {
      const response = await API.get("tasks/");
      setTasks(response.data);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  // Load tasks when page loads
  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div style={{ marginTop: "30px" }}>
      {/* Create Task Form */}
      <TaskForm refreshTasks={fetchTasks} />
      <DependencyForm refreshTasks={fetchTasks} />

      <h2>All Tasks</h2>

      {tasks.length === 0 && <p>No tasks available</p>}

      {tasks.map((task) => (
        <div
          key={task.id}
          style={{
            border: "1px solid gray",
            padding: "15px",
            marginBottom: "10px",
            borderRadius: "5px",
          }}
        >
          <h3>{task.title}</h3>

          <p>Description: {task.description}</p>

          {/* Status Dropdown */}
          <label>Status: </label>
          <select
            value={task.status}
            onChange={async (e) => {
              try {
                await API.patch(`tasks/${task.id}/`, {
                  status: e.target.value,
                });
                fetchTasks();
              } catch (error) {
                console.error("Error updating status:", error);
              }
            }}
          >
            <option value="pending">Pending</option>
            <option value="in_progress">In Progress</option>
            <option value="completed">Completed</option>
            <option value="blocked">Blocked</option>
          </select>

          {/* Delete Button */}
          <button
            onClick={async () => {
              try {
                await API.delete(`tasks/${task.id}/delete/`);
                fetchTasks();
              } catch (error) {
                console.error("Error deleting task:", error);
              }
            }}
            style={{
              marginLeft: "15px",
              backgroundColor: "red",
              color: "white",
              border: "none",
              padding: "5px 10px",
              cursor: "pointer",
            }}
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}

export default TaskList;