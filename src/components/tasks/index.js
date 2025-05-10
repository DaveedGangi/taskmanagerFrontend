import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";
import "./index.css";

const Tasks = () => {
  const [tasks, setTasks] = useState([]);
  const [filteredTasks, setFilteredTasks] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchTasks = async () => {
    const jwtToken = Cookies.get("jwtOritso");
    setLoading(true);

    try {
      const response = await fetch("https://taskmanagerbackenddaveedgangi.onrender.com/task", {
        method: "GET",
        headers: {
          Authorization: "Bearer " + jwtToken,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setTasks(data.tasks);
        setFilteredTasks(data.tasks); // Initial load
      } else {
        console.error("Failed to fetch tasks");
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  // Filter tasks whenever search changes
  useEffect(() => {
    const filtered = tasks.filter((task) =>
      task.title.toLowerCase().includes(search.toLowerCase())
    );
    setFilteredTasks(filtered);
  }, [search, tasks]);

  const deleteTask = async (taskId) => {
    const jwtToken = Cookies.get("jwtOritso");
    const confirmDelete = window.confirm("Are you sure you want to delete this task?");
    if (!confirmDelete) return;

    try {
      const response = await fetch(`https://taskmanagerbackenddaveedgangi.onrender.com/task/${taskId}`, {
        method: "DELETE",
        headers: {
          Authorization: "Bearer " + jwtToken,
        },
      });

      if (response.ok) {
        const updated = tasks.filter((task) => task.id !== taskId);
        setTasks(updated);
        setFilteredTasks(updated);
      } else {
        alert("Failed to delete task");
      }
    } catch (error) {
      alert("Error deleting task:", error);
    }
  };

  return (
    <div className="tasks-container">
      <h1>Your Tasks</h1>

      <input
        type="search"
        placeholder="Search task"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="task-search-input"
      />
      <br/>

      <Link to="/addTask">
        <button className="add-task-button">+ Add Task</button>
      </Link>

      {loading ? (
        <div className="spinner">Loading...</div>
      ) : filteredTasks.length === 0 ? (
        <div className="no-tasks">
          <h2>No tasks found</h2>
        </div>
      ) : (
        <ul className="task-list">
          {filteredTasks.map((task) => (
            <li key={task.id} className="task-item">
              <div className="task-info">
                <h3>{task.title}</h3>
                <p><strong>Description:</strong> {task.description}</p>
                <p><strong>Remarks:</strong> {task.remarks}</p>
                <p><strong>Status:</strong> {task.status}</p>
                <p><strong>Due Date:</strong> {task.due_date}</p>
                <p><strong>Created At:</strong> {new Date(task.created_at).toLocaleString()}</p>
              </div>
              <div className="task-actions">
                <Link to={`/editTask/${task.id}`}>
                  <button>Edit</button>
                </Link>
                <button onClick={() => deleteTask(task.id)}>Delete</button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Tasks;
