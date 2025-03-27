import React, { useState } from "react";
import "./Signup.css";
import { Link, useNavigate } from "react-router-dom";
import Checkbox from "@mui/material/Checkbox";

function Signup() {
  const navigate = useNavigate(); // ✅ Fixed useNavigate
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const register = async (e) => {
    e.preventDefault();

    // ✅ Prevent empty form submission
    if (!email || !password) {
      alert("Please fill in all fields.");
      return;
    }

    try {
      const response = await fetch(
        "https://freelancer-backend-38jl.onrender.com/api/auth/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
        }
      );

      let data;
      try {
        data = await response.json(); // ✅ Ensure response is valid JSON
      } catch (jsonError) {
        throw new Error("Invalid JSON response from server");
      }

      if (response.ok) {
        alert("Account created successfully! Please log in.");
        navigate("/login"); // ✅ Fixed useNavigate usage
      } else {
        alert(data?.message || "Signup failed");
      }
    } catch (error) {
      alert("Error signing up: " + error.message);
    }
  };

  return (
    <div className="signup">
      <div className="signup__form">
        <div className="signup__formTop">
          <Link to="/">
            <img
              src="https://www.f-cdn.com/assets/main/en/assets/freelancer-logo.svg"
              alt="logo"
            />
          </Link>
          <h4>Sign Up</h4>
        </div>
        <h4> OR </h4>
        <div className="signup__formMiddle">
          <input
            type="email"
            placeholder="Email or Username"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <h5>
            <Checkbox color="primary" />I agree to the Freelancer
            <Link to="/terms"> User Agreement </Link> and
            <Link to="/privacy"> Privacy Policy. </Link>
          </h5>
          <button
            onClick={register}
            type="submit"
            className="login__signInButton"
          >
            Join Freelancer
          </button>
        </div>
        <div className="signup__formBottom">
          <hr />
          <h5>
            Already have an account?
            <Link to="/login"> Log in</Link>
          </h5>
        </div>
      </div>
    </div>
  );
}

export default Signup;
