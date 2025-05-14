import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "./JobDetail.css";

function JobDetail() {
  const { id } = useParams(); // Get job ID from the URL
  const [job, setJob] = useState(null);
  const [interestedUsers, setInterestedUsers] = useState([]);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchJobAndUsers = async () => {
      try {
        // Fetch job details
        const res = await axios.get(`https://freelancer-backend-38jl.onrender.com/api/jobs/${id}`);
        setJob(res.data);

        // Fetch interested user details
        const usersRes = await axios.get(`https://freelancer-backend-38jl.onrender.com/api/jobs/${id}/interested-users`);
        setInterestedUsers(usersRes.data.interestedUsers);
      } catch (error) {
        console.error("Failed to fetch job or interested users", error);
        setMessage("Job not found or failed to fetch.");
      }
    };

    fetchJobAndUsers();
  }, [id]);

  const handleDelete = async () => {
    try {
      await axios.delete(`https://freelancer-backend-38jl.onrender.com/api/jobs/${id}`);
      alert("Job deleted successfully!");
      navigate("/client-dashboard");
    } catch (error) {
      console.error("Failed to delete job", error);
      alert("Failed to delete job.");
    }
  };

  const handleUpdate = () => {
    navigate(`/jobs/update/${id}`);
  };

  const assignJob = async (userId) => {
    try {
      await axios.put(`https://freelancer-backend-38jl.onrender.com/api/jobs/${id}/assign`, {
        userId,
      });
      alert("Job assigned successfully!");
      const res = await axios.get(`https://freelancer-backend-38jl.onrender.com/api/jobs/${id}`);
      setJob(res.data); // Refresh job to show updated assignment
    } catch (error) {
      console.error("Failed to assign job", error);
      alert("Failed to assign job.");
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
      <p><strong>Assigned To:</strong> {job.assignedTo?.name || "Not assigned"}</p>

      {interestedUsers.length > 0 ? (
        <div className="interested-users">
          <h3>Interested Users</h3>
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Assign</th>
              </tr>
            </thead>
            <tbody>
              {interestedUsers.map((user) => (
                <tr key={user._id}>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>
                    <button onClick={() => assignJob(user._id)}>Assign</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p><strong>No interested users yet.</strong></p>
      )}

      <div className="button-group">
        <button onClick={() => navigate(-1)}>Back</button>
        <button className="update-btn" onClick={handleUpdate}>Update</button>
        <button className="delete-btn" onClick={handleDelete}>Delete</button>
      </div>
    </div>
  ) : (
    <p>Loading job details...</p>
  );
}

export default JobDetail;
