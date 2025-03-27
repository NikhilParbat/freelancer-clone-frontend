// src/pages/PostJob.js
import React from "react";
import "./PostJob.css";

const PostJob = () => {
  return (
    <div className="postjob-container">
      <h1>Post a Job</h1>
      <form>
        <input type="text" placeholder="Job Title" required />
        <textarea placeholder="Job Description" required></textarea>
        <button type="submit">Post Job</button>
      </form>
    </div>
  );
};

export default PostJob;
