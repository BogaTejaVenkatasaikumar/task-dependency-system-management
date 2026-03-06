 import React from "react";
import TaskList from "./components/TaskList";
import TaskGraph from "./components/TaskGraph";

function App() {
  return (
    <div style={{ padding: "40px", fontFamily: "Arial" }}>
      <h1>Task Dependency System</h1>

      <TaskList />

      <TaskGraph />
    </div>
  );
}

export default App;