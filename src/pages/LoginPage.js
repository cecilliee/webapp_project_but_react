import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

function LoginPage() {
  const navigate = useNavigate();

  // State được đổi tên để rõ ràng hơn: identifier có thể là email hoặc username
  const [formData, setFormData] = useState({
    identifier: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // "Bản hợp đồng" với backend: Gửi dữ liệu dưới key là `username` và `password`
    const loginData = {
      username: formData.identifier, // <-- Gửi giá trị người dùng nhập dưới key `username`
      password: formData.password,
    };

    try {
      const response = await fetch(
        "http://localhost:8080/api/authentication/login",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(loginData),
        }
      );

      const resultText = await response.json();

      if (!response.ok) {
        throw new Error(
          resultText.message || resultText.error || "Login failed"
        );
      }

      if (resultText.code === 1000) {
        const token = resultText.data.token;

        // Bước 1: Lưu token vào localStorage
        localStorage.setItem("token", token);

        // Bước 2: Chuyển hướng đến trang dashboard
        const decodedToken = jwtDecode(token);
        console.log("Thông tin người dùng: ", decodedToken);
        // sẽ thấy User hoặc admin trong console

        localStorage.setItem("userRole", decodedToken.scope);
        localStorage.setItem("username", decodedToken.sub);

        alert("Login successful!");

        //Chuyển hướng đến trang dashboard nếu là admin
        if (decodedToken.scope === "ADMIN") {
          console.log("User is Admin");
          localStorage.setItem("isAdmin", "true"); // <--- DÒNG QUAN TRỌNG NHẤT
          localStorage.setItem("userRole", "ADMIN");
          navigate("/admin");
          alert("Login successful as Admin!");
        } else {
          console.log("User is Customer");
          localStorage.removeItem("isAdmin"); // Xóa cờ admin nếu có từ phiên trước
          localStorage.setItem("userRole", "USER");

          alert("Login successful!");
          navigate("/user/dashboard");
        }
      } else {
        throw new Error(resultText.message || "Login failed");
      }
    } catch (error) {
      console.error("Error:", error);
      alert(`Error: ${error.message}`);
    }
  };

  return (
    <div className="auth-page">
      <div className="form-container">
        <h1 className="page-title">Welcome Back</h1>
        <p className="form-subtitle">Log in to manage your bookings.</p>

        <form id="login-form" className="auth-form" onSubmit={handleSubmit}>
          <div className="form-group">
            {/* ==== THAY ĐỔI GIAO DIỆN ==== */}
            <label htmlFor="identifier">Email or Username</label>
            <input
              type="text" // Đổi thành text để chấp nhận cả email và username
              id="identifier"
              name="identifier" // Đổi name để khớp với state
              required
              placeholder="Enter your email or username"
              value={formData.identifier}
              onChange={handleChange}
            />
            {/* ============================= */}
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              required
              placeholder="••••••••"
              value={formData.password}
              onChange={handleChange}
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
