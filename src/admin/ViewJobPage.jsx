import React from "react";
import "./F_Dashboard.css";
import ViewJobDetail from "../common/ViewJobDetail"
import Menus from "./Menus";

function JobDetailPage() {
  return (
    <div className="JobDetail">
      <Menus />

      {/* Main */}
      <div className="JobDetail__main">
        <ViewJobDetail/>
      </div>
    </div>
  );
}

export default JobDetailPage;
