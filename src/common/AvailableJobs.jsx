import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./AvailableJobs.css"; 

function FreelancerDashboard() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await axios.get("https://freelancer-backend-38jl.onrender.com/api/jobs");
        setJobs(res.data);
      } catch (error) {
        console.error("Failed to fetch jobs", error);
        setMessage("Could not load jobs. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  if (loading) return <p>Loading jobs...</p>;
  if (message) return <p>{message}</p>;

  return (
    <div className="freelancer-dashboard-wrapper">
        <div className="freelancer-dashboard">
            <h2>Available Jobs</h2>
            {jobs.length === 0 ? (
            <p>No jobs available at the moment.</p>
            ) : (
            <div className="job-list">
                {jobs.map((job) => (
                <div key={job._id} className="job-card">
                    <h3>{job.title}</h3>
                    <p>{job.description.slice(0, 100)}...</p>
                    <p><strong>Posted On:</strong> {new Date(job.createdAt).toLocaleDateString()}</p>
                    <p><strong>Status:</strong> {job.status}</p>
                    <button onClick={() => navigate(`/job/view/${job._id}`)}>View Details</button>
                    {/* Later: Add "Apply" or "Show Interest" button here */}
                </div>
                ))}
            </div>
            )}
        </div>
    </div>
  );
}

export default FreelancerDashboard;
