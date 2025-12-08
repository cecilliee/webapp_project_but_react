import React from "react";
import { Navigate } from "react-router-dom";

/**
 * ProtectedRoute Component
 * Component bảo vệ các route, chỉ cho phép người dùng đã đăng nhập và có quyền admin truy cập
 *
 * @param {Object} props - Props của component
 * @param {React.ReactElement} props.children - Component con sẽ được render nếu có quyền truy cập
 * @param {boolean} props.requireAdmin - Nếu true, yêu cầu quyền admin (mặc định: true)
 */

function ProtectedRoute({ children, requireAdmin = true }) {
  // Kiểm tra xem người dùng đã đăng nhập chưa
  const isAuthenticated = () => {
    const token = localStorage.getItem("token");
    const user = localStorage.getItem("user");
    return !!(token && user);
  };

  // Kiểm tra xem người dùng có quyền admin không
  const isAdmin = () => {
    const adminStatus = localStorage.getItem("isAdmin");
    const user = localStorage.getItem("user");

    // Nếu có flag isAdmin trong localStorage
    if (adminStatus === "true") {
      return true;
    }

    // Hoặc kiểm tra trong object user nếu có
    if (user) {
      try {
        const userData = JSON.parse(user);
        return userData.role === "admin" || userData.isAdmin === true;
      } catch (e) {
        // Nếu không parse được, kiểm tra string
        return user.includes("admin");
      }
    }

    return false;
  };

  // Nếu chưa đăng nhập, chuyển hướng về trang login
  if (!isAuthenticated()) {
    return <Navigate to="/login" replace />;
  }

  // Nếu yêu cầu quyền admin nhưng người dùng không phải admin
  if (requireAdmin && !isAdmin()) {
    // Chuyển hướng về trang chủ với thông báo lỗi
    alert("Bạn không có quyền truy cập trang này!");
    return <Navigate to="/" replace />;
  }

  // Nếu đã đăng nhập và có quyền, render component con
  return children;
}

export default ProtectedRoute;
