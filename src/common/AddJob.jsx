import React, { useState, useEffect } from "react";
import axios from "axios";
import "./AddJob.css";

const AddJobs = () => {
  const [jobData, setJobData] = useState({
    title: "",
    description: "",
    price: 0,
    paymentType: "one-time",
    postedBy: "", // initially empty
    assignedTo: "",
    status: "open",
  });

  const [message, setMessage] = useState("");

  // 🟡 Step 1: Load user ID from localStorage (or auth context)
  useEffect(() => {
    const userId = localStorage.getItem("userId"); // or sessionStorage or from context
    if (userId) {
      setJobData((prev) => ({
        ...prev,
        postedBy: userId,
      }));
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setJobData((prevData) => ({
      ...prevData,
      [name]: name === "price" ? Number(value) : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/api/jobs", jobData);
      console.log("Job Posted:", response.data);
      setMessage("Job posted successfully!");

      // Reset form but keep postedBy intact
      setJobData((prev) => ({
        ...prev,
        title: "",
        description: "",
        price: 0,
        paymentType: "one-time",
        assignedTo: "",
        status: "open",
      }));
    } catch (err) {
      console.error("Error posting job:", err);
      setMessage("Failed to post job.");
    }
  };

  return (
    <div className="addJobs">
      <div className="addjobs--heading">
        <h3>Post a New Job</h3>
      </div>
      <form className="addJobs--form" onSubmit={handleSubmit}>
        <label>
          Job Title:
          <input type="text" name="title" value={jobData.title} onChange={handleChange} required />
        </label>

        <label>
          Description:
          <textarea name="description" value={jobData.description} onChange={handleChange} required></textarea>
        </label>

        <label>
          Budget/Price:
          <input type="number" name="price" value={jobData.price} onChange={handleChange} required />
        </label>

        <label>
          Payment Type:
          <select name="paymentType" value={jobData.paymentType} onChange={handleChange}>
            <option value="one-time">One-Time</option>
            <option value="monthly-installments">Monthly Installments</option>
            <option value="two-stage">Two Stage</option>
          </select>
        </label>

        <label>
          Status:
          <select name="status" value={jobData.status} onChange={handleChange}>
            <option value="open">Open</option>
            <option value="in-progress">In Progress</option>
            <option value="completed">Completed</option>
          </select>
        </label>

        <button type="submit">Add Job</button>
        {message && <p className="job-message">{message}</p>}
      </form>
    </div>
  );
};

export default AddJobs;
