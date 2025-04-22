import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "./ViewJobDetail.css";

function JobDetail() {
  const { id } = useParams(); // Job ID from URL\
  const { jobId } = id;
  const [job, setJob] = useState(null);
  const [message, setMessage] = useState("");
  const [applyStatus, setApplyStatus] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const res = await axios.get(`https://freelancer-backend-38jl.onrender.com/api/jobs/${id}`);
        setJob(res.data);
      } catch (error) {
        console.error("Failed to fetch job", error);
        setMessage("Job not found or failed to fetch.");
      }
    };

    fetchJob();
  }, [id]);

  const handleApply = async () => {
    const userId = localStorage.getItem("userId"); // 🔑 Replace with how you're storing auth

    if (!userId) {
      setApplyStatus("User not logged in. Please log in to apply.");
      return;
    }

    try {
      const res = await axios.post(`https://freelancer-backend-38jl.onrender.com/api/jobs/${id}/interest`, {
        userId,
      });

      setApplyStatus("✅ You have successfully applied for this job.");
      navigate("/freelancer-dashboard");
    } catch (error) {
      console.error("Failed to apply", error);
      setApplyStatus("❌ Failed to apply. Please try again later.");
    }
  };

  if (message) return <p>{message}</p>;

  return job ? (
    <div className="job-detail">
      <h2>{job.title}</h2>
      <p><strong>Description:</strong> {job.description}</p>
      <p><strong>Payment:</strong> {job.price}</p>
      <p><strong>Payment Type:</strong> {job.paymentType}</p>
      <p><strong>Created At:</strong> {new Date(job.createdAt).toLocaleDateString()}</p>
      <p><strong>Status:</strong> {job.status}</p>

      {applyStatus && <p className="apply-status">{applyStatus}</p>}

      <div className="button-group">
      {applyStatus && (
        <p style={{ color: "green", margin: "1rem 0", fontWeight: "bold" }}>
          {applyStatus}
        </p>
      )}
        <button onClick={() => navigate(-1)}>Back</button>
        <button className="apply-btn"onClick={handleApply}>Apply</button>
      </div>
    </div>
  ) : (
    <p>Loading job details...</p>
  );
}

export default JobDetail;
