import React from "react";
import "./F_Dashboard.css";
import Menus from "./Menus";
import Sidebar from "./Sidebar";
import AddJobs from "../common/AddJob";

function PostJob() {
  return (
    <div className="dashboard">
      <Menus />

      {/* Main */}
      <div className="dashboard__main">
        <AddJobs />
        <Sidebar />
      </div>
    </div>
  );
}

export default PostJob;
