import React from "react";
import "./F_Dashboard.css";
import JobDetail from "../common/JobDetail"
import Menus from "./Menus";

function JobDetailPage() {
  return (
    <div className="JobDetail">
      <Menus />

      {/* Main */}
      <div className="JobDetail__main">
        <JobDetail />
      </div>
    </div>
  );
}

export default JobDetailPage;
