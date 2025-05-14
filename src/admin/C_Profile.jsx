import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Menus from "./Menus";
import "./C_Profile.css";

const ClientProfile = () => {
  const { id } = useParams();
  const [clientData, setClientData] = useState(null);
  const [uploadedDoc, setUploadedDoc] = useState(null);
  const [verificationStatus, setVerificationStatus] = useState("Not uploaded");

  useEffect(() => {
    const fetchClientData = async () => {
      try {
        const response = await axios.get(
          `https://freelancer-backend-38jl.onrender.com/api/auth/client/${id}`
        );
        setClientData(response.data);
      } catch (error) {
        console.error("Error fetching client data:", error);
      }
    };

    fetchClientData();
  }, [id]);

  const handleDocumentUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setUploadedDoc(file);
      setVerificationStatus("Verifying");
    }
  };

  if (!clientData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="client-profile-container">
      <Menus />
      <div className="profile-card">
        <h1>PROFILE</h1>

        <div className="profile-header">
          <img
            src={
              clientData?.profile?.photoURL
                ? clientData?.profile?.photoURL
                : "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
            }
            alt="Profile"
            className="profile-img"
          />
          <div>
            <h2>Name: {clientData?.profile?.name}</h2>
            <p>Email: {clientData?.profile?.email}</p>
          </div>
        </div>

        <div className="profile-details">
          <div>
            <strong>Role:</strong> <span>{clientData?.profile?.role}</span>
          </div>
          <div>
            <strong>Account Balance:</strong> ${clientData?.profile?.balance || 0}
          </div>
        </div>

        {/* <div className="skills-section">
          <strong>Skills:</strong>
          <ul>
            {(clientData?.profile?.skills || []).map((skill, index) => (
              <li key={index}>{skill}</li>
            ))}
          </ul>
        </div> */}

        <div className="verification-section">
          <strong>Verification:</strong>
          <input type="file" onChange={handleDocumentUpload} />
          {uploadedDoc && (
            <p>
              File: {uploadedDoc.name} <br />
              Status: <strong>{verificationStatus}</strong>
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ClientProfile;
