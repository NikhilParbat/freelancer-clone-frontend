import React from "react";
import "./C_Dashboard.css";
import DashboardContent from "./DashboardContent";
import Menus from "./Menus";
import Sidebar from "./Sidebar";

function Dashboard() {
  return (
    <div className="dashboard">
      <Menus />

      {/* Main */}
      <div className="dashboard__main">
        <DashboardContent />
        <Sidebar />
      </div>
    </div>
  );
}

export default Dashboard;
