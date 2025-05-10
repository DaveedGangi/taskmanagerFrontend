import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import Cookies from "js-cookie";
import "./index.css";

const EditTask = () => {
  const { id } = useParams();
  const history = useHistory();


  const [task, setTask] = useState({
    title: "",
    description: "",
    due_date: "",
    remarks: "",
    status: "pending",
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTask = async () => {
      const jwtToken = Cookies.get("jwtOritso");
      try {
        const response = await fetch(`https://taskmanagerbackenddaveedgangi.onrender.com/${id}`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${jwtToken}`,
          },
        });

        const data = await response.json();
        setTask(data.task);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching task:", error);
        setLoading(false);
      }
    };

    fetchTask();
  }, [id]);

  const handleChange = (e) => {
    setTask({ ...task, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const jwtToken = Cookies.get("jwtOritso");

    try {
      const response = await fetch(`https://taskmanagerbackenddaveedgangi.onrender.com/task/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${jwtToken}`,
        },
        body: JSON.stringify(task),
      });

      if (response.ok) {
        alert("Task updated successfully");
        history.push("/tasks");
      } else {
        alert("Failed to update task");
      }
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  if (loading) {
    return <div className="edit-task-container"><p>Loading task...</p></div>;
  }

  return (
    <div className="edit-task-container">
      <h1>Edit Task</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          value={task.title}
          onChange={handleChange}
          placeholder="Title"
          required
        />
        <textarea
          name="description"
          value={task.description}
          onChange={handleChange}
          placeholder="Description"
          required
        />
        <input
          type="date"
          name="due_date"
          value={task.due_date}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="remarks"
          value={task.remarks}
          onChange={handleChange}
          placeholder="Remarks"
        />
        <select name="status" value={task.status} onChange={handleChange}>
          <option value="pending">Pending</option>
          <option value="in_progress">In Progress</option>
          <option value="completed">Completed</option>
        </select>
        <button type="submit">Update Task</button>
      </form>
    </div>
  );
};

export default EditTask;
