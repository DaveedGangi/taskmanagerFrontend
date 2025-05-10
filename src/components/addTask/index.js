import React, { useState } from "react";
import Cookies from "js-cookie";
import "./index.css";

const AddTask = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    due_date: "", // backend expects yyyy-mm-dd
    status: "",
    remarks: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const submitTask = async (e) => {
    e.preventDefault();

    const jwtToken = Cookies.get("jwtOritso");

    const taskData = {
      ...formData,
      due_date: new Date(formData.due_date).toISOString().split("T")[0], // force yyyy-mm-dd
    };

    try {
      const response = await fetch("https://taskmanagerbackenddaveedgangi.onrender.com/task", {
        method: "POST",
        headers: {
          Authorization: "Bearer " + jwtToken,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(taskData),
      });

      if (response.ok) {
        alert("Task added successfully");
          // ✅ Reset form to initial values
      setFormData({
        title: "",
        description: "",
        due_date: "",
        status: "",
        remarks: "",
      });
        
      } else {
        alert("Failed to add task");
      }
    } catch (err) {
      alert("Error:", err);
    }
  };

  return (
    <div className="add-task-container">
      <form onSubmit={submitTask}>
        <input
          type="text"
          name="title"
          placeholder="Add title"
          value={formData.title}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="description"
          placeholder="Add Description"
          value={formData.description}
          onChange={handleChange}
          required
        />
        <input
          type="date"
          name="due_date"
          value={formData.due_date}
          onChange={handleChange}
          required
        />
        <select
          name="status"
          value={formData.status}
          onChange={handleChange}
          required
        >
          <option value="">Select status</option>
          <option value="pending">Pending</option>
          <option value="in_progress">In Progress</option>
          <option value="completed">Completed</option>
        </select>
        <input
          type="text"
          name="remarks"
          placeholder="Add remarks"
          value={formData.remarks}
          onChange={handleChange}
          required
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default AddTask;
