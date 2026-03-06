import React, { useEffect, useState } from "react";
import ReactFlow from "reactflow";
import "reactflow/dist/style.css";
import API from "../services/api";

function TaskGraph() {
  const [nodes, setNodes] = useState([]);
  const [edges, setEdges] = useState([]);

  useEffect(() => {
    loadGraph();
  }, []);

  const loadGraph = async () => {
    const tasksRes = await API.get("tasks/");
    const depRes = await API.get("dependencies/");

    const tasks = tasksRes.data;
    const dependencies = depRes.data;

    const graphNodes = tasks.map((task, index) => ({
      id: task.id.toString(),
      data: { label: task.title },
      position: { x: 100 + index * 150, y: 100 },
    }));

    const graphEdges = dependencies.map((dep) => ({
      id: `${dep.task}-${dep.depends_on}`,
      source: dep.depends_on.toString(),
      target: dep.task.toString(),
    }));

    setNodes(graphNodes);
    setEdges(graphEdges);
  };

  return (
    <div style={{ height: 400, marginTop: "40px" }}>
      <h2>Task Dependency Graph</h2>
      <ReactFlow nodes={nodes} edges={edges} />
    </div>
  );
}

export default TaskGraph;
