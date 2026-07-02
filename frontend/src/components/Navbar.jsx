import React from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  
  // Fetch session parameters including the active role tier
  const token = localStorage.getItem("token");
  const username = localStorage.getItem("username") || "User";
  const role = localStorage.getItem("role") || "STUDENT"; 
  const isLoggedIn = !!token;

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  const isActive = (path) => location.pathname === path;

  const navLinkStyle = (path) => ({
    textDecoration: "none",
    color: isActive(path) ? "#4F46E5" : "#4B5563",
    background: isActive(path) ? "#EEF2FF" : "transparent",
    padding: "6px 12px",
    borderRadius: "8px",
    fontSize: "14px",
    fontWeight: isActive(path) ? "600" : "500",
    transition: "all 0.2s"
  });

  return (
    <nav style={{
      display: "flex", justifyContent: "space-between", alignItems: "center",
      padding: "0.75rem 2rem", background: "#fff", borderBottom: "1px solid #E5E7EB",
      fontFamily: "system-ui, sans-serif", position: "sticky", top: 0, zIndex: 50
    }}>
      {/* Brand Logo Redirect Link based on active roles */}
      <Link to={isLoggedIn ? (role === "INSTRUCTOR" ? "/instructor/home" : "/student/home") : "/"} style={{ display: "flex", alignItems: "center", gap: "8px", textDecoration: "none" }}>
        <span style={{ fontSize: "24px" }}>📚</span>
        <span style={{ fontWeight: "800", fontSize: "20px", color: "#111827" }}>LearnHub</span>
      </Link>

      {/* ─── CASE A: USER IS LOGGED IN ─── */}
      {isLoggedIn ? (
        <>
          {/* NAVIGATION LINKS SEGMENTED BY ROLE TYPE */}
          <div style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}>
            {role === "INSTRUCTOR" ? (
              /* 👨‍🏫 INSTRUCTOR NAVIGATION MENU LINX */
              <>
                <Link to="/instructor/home" style={navLinkStyle("/instructor/home")}>Overview</Link>
                <Link to="/instructor/dashboard" style={navLinkStyle("/instructor/dashboard")}>My Courses</Link>
              </>
            ) : (
              /* 🎓 STUDENT NAVIGATION MENU LINX */
              <>
                <Link to="/student/home" style={navLinkStyle("/student/home")}>Home</Link>
                <Link to="/student/courses" style={navLinkStyle("/student/courses")}>Courses</Link>
                <Link to="/student/progress" style={navLinkStyle("/student/progress")}>My Progress</Link>
              </>
            )}
          </div>

          {/* USER PROFILE CARD AND LOGOUT SECTION */}
          <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "6px", background: "#F3F4F6", padding: "6px 12px", borderRadius: "20px", fontSize: "13px", fontWeight: "600", color: "#374151" }}>
              <span>👤</span>
              <span style={{ 
                textTransform: "uppercase", fontSize: "10px", color: "#fff", padding: "2px 6px", borderRadius: "4px", marginRight: "4px", fontWeight: "700",
                background: role === "INSTRUCTOR" ? "#7C3AED" : "#4F46E5"
              }}>
                {role}
              </span>
              <span>{username}</span>
            </div>
            <button onClick={handleLogout} style={{ background: "#fff", border: "1px solid #D1D5DB", padding: "8px 16px", borderRadius: "8px", cursor: "pointer", fontWeight: "600", fontSize: "14px", color: "#374151" }}>
              Logout
            </button>
          </div>
        </>
      ) : (
        /* ─── CASE B: LOGGED OUT PATHS ─── */
        <div style={{ display: "flex", gap: "0.75rem" }}>
          <Link to="/login" style={{ textDecoration: "none", background: "#fff", border: "1px solid #D1D5DB", color: "#374151", padding: "8px 16px", borderRadius: "8px", fontSize: "14px", fontWeight: "600" }}>
            Login
          </Link>
          <Link to="/register" style={{ textDecoration: "none", background: "#4F46E5", color: "#fff", padding: "8px 16px", borderRadius: "8px", fontSize: "14px", fontWeight: "600" }}>
            Get Started
          </Link>
        </div>
      )}
    </nav>
  );
}