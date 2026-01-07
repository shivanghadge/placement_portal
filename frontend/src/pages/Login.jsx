import React, { useState } from "react";
import API from "../api/axios";
import "./Login.css"; // Make sure this file exists for styling

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      setError("Please fill all fields");
      return;
    }

    try {
      const res = await API.post("/auth/login", { email, password });

      localStorage.setItem("token", res.data.token); // Save JWT token
      alert("Login successful ✅");

      setError("");
      console.log(res.data); // Optional: check user info

    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2 className="title">Placement Portal</h2>
        <p className="subtitle">Login to your account</p>

        {error && <p className="error">{error}</p>}

        <form onSubmit={handleSubmit}>
          <label>Email</label>
          <input
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <label>Password</label>
          <div className="password-box">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <span onClick={() => setShowPassword(!showPassword)}>
              {showPassword ? "Hide" : "Show"}
            </span>
          </div>

          <button type="submit">Login</button>
        </form>

        <p className="footer-text">
          Don’t have an account? <span>Register</span>
        </p>
      </div>
    </div>
  );
};

export default Login;
