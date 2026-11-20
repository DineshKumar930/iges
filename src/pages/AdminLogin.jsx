
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { adminLogin } from "../api/api.js";
import "./AdminLogin.css";

export default function AdminLogin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const data = await adminLogin({
        username: username.trim(),
        password,
      });

      if (!data.token) {
        throw new Error("Login token was not received");
      }

      // Save the JWT token
      localStorage.setItem("adminToken", data.token);

      // Open the admin dashboard
      navigate("/admin/dashboard", { replace: true });
    } catch (err) {
      setError(err.message || "Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admin-login-page">
      <form className="admin-login-card" onSubmit={handleSubmit}>
        <h1>IGES Admin</h1>
        <p>Certificate Management Login</p>

        {error && (
          <p role="alert" style={{ color: "red" }}>
            {error}
          </p>
        )}

        <label htmlFor="admin-username">Username</label>
        <input
          id="admin-username"
          type="text"
          placeholder="Enter username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          autoComplete="username"
          required
        />

        <label htmlFor="admin-password">Password</label>
        <input
          id="admin-password"
          type="password"
          placeholder="Enter password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          autoComplete="current-password"
          required
        />
        <div className="forgot-password-link">
  <button
    type="button"
    onClick={() => navigate("/admin/forgot-password")}
  >
    Forgot Password?
  </button>
</div>

        <button type="submit" disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  );
}
