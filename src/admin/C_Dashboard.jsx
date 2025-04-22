import React from "react";
import "./C_Dashboard.css";
import Menus from "./Menus";
import Sidebar from "./Sidebar";

function Dashboard() {
  return (
    <div className="dashboard">
      <Menus />

      {/* Main */}
      <div className="dashboard__main">
        <Sidebar />
      </div>
    </div>
  );
}

export default Dashboard;
