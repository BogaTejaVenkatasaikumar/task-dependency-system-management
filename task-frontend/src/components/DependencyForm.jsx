import React, { useEffect, useState } from "react";
import API from "../services/api";

function DependencyForm({ refreshTasks }) {
  const [tasks, setTasks] = useState([]);
  const [task, setTask] = useState("");
  const [dependsOn, setDependsOn] = useState("");

  useEffect(() => {
    loadTasks();
  }, []);

  const loadTasks = async () => {
    const res = await API.get("tasks/");
    setTasks(res.data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await API.post("dependencies/create/", {
        task: task,
        depends_on: dependsOn,
      });

      alert("Dependency created");
      refreshTasks();
    } catch (error) {
      alert("Error creating dependency");
      console.error(error);
    }
  };

  return (
    <div style={{ marginTop: "30px" }}>
      <h2>Add Dependency</h2>

      <form onSubmit={handleSubmit}>
        {/* Task Select */}
        <select
          value={task}
          onChange={(e) => setTask(e.target.value)}
          required
        >
          <option value="">Select Task</option>
          {tasks.map((t) => (
            <option key={t.id} value={t.id}>
              {t.title}
            </option>
          ))}
        </select>

        <span style={{ margin: "0 10px" }}>depends on</span>

        {/* Dependency Select */}
        <select
          value={dependsOn}
          onChange={(e) => setDependsOn(e.target.value)}
          required
        >
          <option value="">Select Dependency</option>
          {tasks.map((t) => (
            <option key={t.id} value={t.id}>
              {t.title}
            </option>
          ))}
        </select>

        <button
          type="submit"
          style={{
            marginLeft: "10px",
            padding: "5px 10px",
          }}
        >
          Add
        </button>
      </form>
    </div>
  );
}

export default DependencyForm;