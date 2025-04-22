import React from "react";
import "./C_Dashboard.css";
import Menus from "./Menus";
import Sidebar from "./Sidebar";
import AvailableJobs from "../common/AvailableJobs"

function Dashboard() {
  return (
    <div className="dashboard">
      <Menus />

      {/* Main */}
      <div className="dashboard__main">
        <AvailableJobs />
        <Sidebar />
      </div>
    </div>
  );
}

export default Dashboard;
