import React, { useEffect, useState } from "react";
import "./DashboardContent.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";

function DashboardContent() {
  const navigate = useNavigate();
  const [jobs, setJobs] = useState([]);
  const [message, setMessage] = useState(""); // To display error messages

  // 🟡 Step 1: Get the client ID from localStorage
  const clientId = localStorage.getItem("userId"); // Retrieve the client/user ID from localStorage

  useEffect(() => {
    // 🟡 Step 2: Fetch jobs based on the clientId from localStorage
    if (clientId) {
      const fetchJobs = async () => {
        try {
          const res = await axios.get(`https://freelancer-backend-38jl.onrender.com/api/jobs/client/${clientId}`);
          setJobs(res.data); // Set the jobs data
        } catch (error) {
          console.error("Failed to fetch jobs", error);
          setMessage("Failed to fetch jobs.");
        }
      };

      fetchJobs(); // Call the function to fetch the jobs
    } else {
      setMessage("User ID not found. Please log in."); // Show a message if the user ID is not found
    }
  }, [clientId]); // Only run when clientId changes

  return (
    <div className="dashboardContent">
      {/* Projects */}
      <div className="dashboardContent__projects">
        <div className="dashboardContent__projects--heading">
          <h3>Recent Projects</h3>
          <button onClick={() => navigate("/post-job")}>Post a Project</button>
        </div>
        <div className="dashboardContent__projects--table">
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="projects table">
              <TableHead>
                <TableRow>
                  <TableCell>Project Title</TableCell>
                  <TableCell align="right">Assigned to</TableCell>
                  <TableCell align="right">Created At</TableCell>
                  <TableCell align="right">Status</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {jobs.length > 0 ? (
                  jobs.map((job) => (
                    <TableRow key={job._id}>
                      <TableCell align="left">
                        <EmojiEventsIcon />{" "}
                        <Link to={`/job/${job._id}`} style={{ textDecoration: "none", color: "inherit" }}>
                          {job.title}
                        </Link>
                      </TableCell>
                      <TableCell align="right">
                        {job.assignedTo ? job.assignedTo.name : "-"}
                      </TableCell>
                      <TableCell align="right">
                        {new Date(job.createdAt).toLocaleDateString()}
                      </TableCell>
                      <TableCell align="right">{job.status}</TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={4} align="center">
                      No recent projects found.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
        <p>
          <Link onClick={() => navigate("/all-jobs")}>
            View All <ArrowRightAltIcon />
          </Link>
        </p>
      </div>

      {/* News Feed */}
      <div className="dashboardContent__news">
        <div className="dashboardContent__news--heading">
          <h3>News Feed</h3>
        </div>
        <div className="dashboardContent__news--main">
          <img
            src="https://www.f-cdn.com/assets/main/en/assets/default-notification-image.svg"
            alt="News"
          />
          <span>
            <p>
              This is where you'll receive updates for project and account
              activity. Select an option below to get started.
              <br />
              about 2 hours ago.
            </p>
            <button onClick={() => navigate("/post-job")}>Post a Project</button>
            <button onClick={() => navigate("/browse-projects")}>Browse Projects</button>
          </span>
        </div>
      </div>

      {/* Show message if there's an error */}
      {message && <p>{message}</p>}
    </div>
  );
}

export default DashboardContent;
