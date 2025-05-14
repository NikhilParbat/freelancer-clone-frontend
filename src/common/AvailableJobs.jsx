import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Select from "react-select";
import "./AvailableJobs.css";

const domainOptions = [
  { value: "Web Development", label: "Web Development" },
  { value: "Data Science", label: "Data Science" },
  { value: "AI", label: "AI" },
  { value: "Design", label: "Design" },
  { value: "Marketing", label: "Marketing" },
  // Add more domains as needed
];

function FreelancerDashboard() {
  const [jobs, setJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDomains, setSelectedDomains] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await axios.get("https://freelancer-backend-38jl.onrender.com/api/jobs");
        setJobs(res.data);
        setFilteredJobs(res.data); // initially all
      } catch (error) {
        console.error("Failed to fetch jobs", error);
        setMessage("Could not load jobs. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  // Filter logic
  useEffect(() => {
    const term = searchTerm.toLowerCase();
    const selected = selectedDomains.map(d => d.value);

    const result = jobs.filter((job) => {
      const matchesKeyword =
        job.title.toLowerCase().includes(term) ||
        job.description.toLowerCase().includes(term);
      const matchesDomain =
        selected.length === 0 || selected.includes(job.domain);
      return matchesKeyword && matchesDomain;
    });

    setFilteredJobs(result);
  }, [searchTerm, selectedDomains, jobs]);

  if (loading) return <p>Loading jobs...</p>;
  if (message) return <p>{message}</p>;

  return (
    <div className="freelancer-dashboard-wrapper">
      <div className="freelancer-dashboard">
        <h2>Available Jobs</h2>

        {/* Search & Filter */}
        <div className="job-filters">
          <input
            type="text"
            placeholder="Search by title or description..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Select
            isMulti
            options={domainOptions}
            value={selectedDomains}
            onChange={(selected) => setSelectedDomains(selected)}
            placeholder="Filter by domain..."
            className="domain-select"
          />
        </div>

        {/* Job Cards */}
        {filteredJobs.length === 0 ? (
          <p>No jobs found.</p>
        ) : (
          <div className="job-list">
            {filteredJobs.map((job) => (
              <div key={job._id} className="job-card">
                <h3>{job.title}</h3>
                <p>{job.description.slice(0, 100)}...</p>
                <p><strong>Domain:</strong> {job.domain}</p>
                <p><strong>Posted On:</strong> {new Date(job.createdAt).toLocaleDateString()}</p>
                <p><strong>Status:</strong> {job.status}</p>
                <button onClick={() => navigate(`/job/view/${job._id}`)}>View Details</button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default FreelancerDashboard;
