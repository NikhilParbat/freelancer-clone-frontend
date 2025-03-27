import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Login.css";
import Checkbox from "@mui/material/Checkbox";
import { useStateValue } from "./StateProvider";
import { actionTypes } from "./reducer";

function Login() {
  const history = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [checked, setChecked] = useState(true);
  const [state, dispatch] = useStateValue();

  const handleChange = (event) => {
    setChecked(event.target.checked);
  };

  const signIn = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        "https://freelancer-backend-38jl.onrender.com/api/auth/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        // Store token in localStorage or context
        localStorage.setItem("token", data.token);

        dispatch({
          type: actionTypes.SET_USER,
          user: data.user, // Assuming backend returns user details
        });

        history("/dashboard");
      } else {
        alert(data.message || "Login failed");
      }
    } catch (error) {
      alert("Error logging in: " + error.message);
    }
  };

  return (
    <div className="login">
      <div className="login__form">
        <div className="login__formTop">
          <Link to="/">
            <img
              src="https://www.f-cdn.com/assets/main/en/assets/freelancer-logo.svg"
              alt="logo"
            />
          </Link>
          <h4>Welcome Back</h4>
        </div>
        <h4> OR </h4>
        <div className="login__formMiddle">
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
            <Checkbox
              checked={checked}
              color="primary"
              onChange={handleChange}
              inputProps={{ "aria-label": "secondary checkbox" }}
            />
            Remember Me
            <span className="login__formMiddle-space">
              <Link to="/forgot-password">Forgot Password?</Link>
            </span>
          </h5>
          <button
            onClick={signIn}
            type="submit"
            className="login__signInButton"
          >
            Log In
          </button>
        </div>
        <div className="login__formBottom">
          <hr />
          <h5>
            Don't have an account?
            <Link to="/signup"> Sign Up</Link>
          </h5>
        </div>
      </div>
    </div>
  );
}

export default Login;
