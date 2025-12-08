import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Import the Layout wrapper component
import Layout from "./components/Layout";
import AdminLayout from "./components/AdminLayout";
import ProtectedRoute from "./components/ProtectedRoute";

// Import all the Page components
import HomePage from "./pages/HomePage";
import CarsPage from "./pages/CarsPage";
import CarDetailPage from "./pages/CarDetailPage";
import AboutPage from "./pages/AboutPage";
import ContactPage from "./pages/ContactPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";

// Import Admin pages
import AdminDashboardPage from "./pages/AdminDashboardPage";
import UserManagementPage from "./pages/UserManagementPage";

// The main App component that defines all the routes
function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* 
          This is a wrapper route. Any route nested inside it will
          render inside the Layout's <Outlet />. This is how we get
          a shared Header and Footer for all these pages.
        */}
        <Route path="/" element={<Layout />}>
          {/* The 'index' route is the default page for the parent path "/" */}
          <Route index element={<HomePage />} />

          <Route path="cars" element={<CarsPage />} />

          {/* The ':id' is a URL parameter. It will match /cars/1, /cars/2, etc. */}
          <Route path="cars/:id" element={<CarDetailPage />} />

          <Route path="about" element={<AboutPage />} />
          <Route path="contact" element={<ContactPage />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="register" element={<RegisterPage />} />

          {/* Optional: A "catch-all" route for 404 pages */}
          {/* <Route path="*" element={<NotFoundPage />} /> */}
        </Route>

        {/* Admin Routes - Protected với AdminLayout */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute requireAdmin={true}>
              <AdminLayout />
            </ProtectedRoute>
          }
        >
          {/* Dashboard mặc định cho /admin */}
          <Route index element={<AdminDashboardPage />} />
          
          {/* Trang quản lý người dùng */}
          <Route path="users" element={<UserManagementPage />} />
          
          {/* Các trang admin khác sẽ được thêm sau */}
          {/* <Route path="cars" element={<CarManagementPage />} /> */}
          {/* <Route path="bookings" element={<BookingManagementPage />} /> */}
          {/* <Route path="settings" element={<SettingsPage />} /> */}
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
