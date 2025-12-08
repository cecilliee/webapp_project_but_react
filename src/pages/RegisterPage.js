import React from "react";
import { Link } from "react-router-dom";

function RegisterPage() {
  return (
    <div className="auth-page">
      <div className="form-container">
        <h1 className="form-title">Create Your Account</h1>
        <p className="form-subtitle">
          Join us and get access to the world's finest cars.
        </p>
        <form id="register-form" className="auth-form">
          <div className="form-group">
            <label htmlFor="name">Full Name</label>
            <input
              type="text"
              id="name"
              name="name"
              required
              placeholder="e.g., Minh Nguyễn"
            />
          </div>
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
              placeholder="Choose a strong password"
            />
          </div>
          <div className="form-group">
            <label htmlFor="confirm-password">Confirm Password</label>
            <input
              type="password"
              id="confirm-password"
              name="confirm-password"
              required
              placeholder="Re-enter your password"
            />
          </div>
          <button type="submit" className="btn btn-accent btn-block">
            Create Account
          </button>
        </form>
        <p className="form-switch-link">
          Already have an account? <Link to="/login">Log In</Link>
          <br />
          <br />
          <Link to="/">Back to Home</Link>
        </p>
      </div>
    </div>
  );
}

export default RegisterPage;
