import React, { useEffect, useState } from "react";
import axios from "axios";
import "./AllJobs.css"; // Create this for styling if needed

const AllJobs = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await axios.get(
          `https://freelancer-backend-38jl.onrender.com/api/jobs?postedBy=${userId}`
        );
        setJobs(response.data);
      } catch (error) {
        console.error("Error fetching jobs:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, [userId]);

  return (
    <div className="all-jobs-page">
      <h2>All My Posted Jobs</h2>
      {loading ? (
        <p>Loading jobs...</p>
      ) : jobs.length === 0 ? (
        <p>No jobs posted yet.</p>
      ) : (
        <div className="jobs-list">
          {jobs.map((job) => (
            <div key={job._id} className="job-card">
              <h3>{job.title}</h3>
              <p>{job.description}</p>
              <p><strong>Budget:</strong> ${job.price}</p>
              <p><strong>Status:</strong> {job.status}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AllJobs;
