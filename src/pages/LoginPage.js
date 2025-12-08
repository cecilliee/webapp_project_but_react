import React from "react";
import { Link } from "react-router-dom";

function LoginPage() {
  return (
    <div className="auth-page">
      <div className="form-container">
        <h1 className="page-title">Welcome Back</h1>
        <p className="form-subtitle">Log in to manage your bookings.</p>
        <form id="login-form" className="auth-form">
          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              id="email"
              name="email"
              required
              placeholder="you@example.com"
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              required
              placeholder="••••••••"
            />
          </div>
          <button type="submit" className="btn btn-accent btn-block">
            Log In
          </button>
        </form>
        <p className="form-switch-link">
          Don't have an account? <Link to="/register">Sign up now</Link>
          <br />
          <br />
          <Link to="/">Back to Home</Link>
        </p>
      </div>
    </div>
  );
}

export default LoginPage;
