import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [tasks, setTasks] = useState([]);
  const [task, setTask] = useState("");

  // Fetch tasks
  useEffect(() => {
    axios.get("http://localhost:5000/tasks").then(res => setTasks(res.data));
  }, []);

  // Add Task
  const addTask = () => {
    axios.post("http://localhost:5000/tasks", { task }).then(res => {
      setTasks([...tasks, res.data]);
      setTask("");
    });
  };

  // Mark Completed
  const completeTask = (id) => {
    axios.put(`http://localhost:5000/tasks/${id}`).then(() => {
      setTasks(tasks.map(t => t.id === id ? { ...t, status: "completed" } : t));
    });
  };

  // Delete Task
  const deleteTask = (id) => {
    axios.delete(`http://localhost:5000/tasks/${id}`).then(() => {
      setTasks(tasks.filter(t => t.id !== id));
    });
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1> ToDo App</h1>
      <input 
        value={task}
        onChange={(e) => setTask(e.target.value)}
        placeholder="Enter a task"
      />
      <button onClick={addTask}>Add</button>

      <ul>
        {tasks.map(t => (
          <li key={t.id}>
            <span style={{ textDecoration: t.status === "completed" ? "line-through" : "none" }}>
              {t.task}
            </span>
            {t.status === "pending" && (
              <button onClick={() => completeTask(t.id)}>Complete</button>
            )}
            <button onClick={() => deleteTask(t.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;

