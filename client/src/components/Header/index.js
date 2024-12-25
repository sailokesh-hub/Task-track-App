import React from "react";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

const Navbar = () => {
  const navigate = useNavigate();
  const jwtToken = Cookies.get("jwt_token");

  const handleLogout = () => {
    Cookies.remove("jwt_token", { path: "/" });
    navigate("/login");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary p-3">
      {/* Left Section: Task Manager */}
      <Link
        to="/"
        className="navbar-brand fw-bold text-decoration-none"
        style={{
          fontSize: "1.8rem",
          // background: "linear-gradient(90deg, #00c6ff, #0072ff)", // Gradient color
          // WebkitBackgroundClip: "text",
          // WebkitTextFillColor: "transparent",
          // transition: "all 0.3s ease",
        }}
        onMouseEnter={(e) => {
          e.target.style.transform = "scale(1.1)"; // Slight zoom on hover
        }}
        onMouseLeave={(e) => {
          e.target.style.transform = "scale(1)"; // Revert zoom
        }}
      >
        Task Manager
      </Link>

      {/* Right Section: Navigation Links */}
      <div className="d-flex align-items-center">
        {!jwtToken ? (
          <>
            <Link
              to="/login"
              className="nav-link text-light mx-2 fs-5 fw-semibold"
              style={{ textDecoration: "none" }}
            >
              Login
            </Link>
            <Link
              to="/register"
              className="nav-link text-light mx-2 fs-5 fw-semibold"
              style={{ textDecoration: "none" }}
            >
              Register
            </Link>
          </>
        ) : (
          <button
            onClick={handleLogout}
            className="btn btn-outline-light nav-link text-light mx-2 fs-5 fw-semibold px-4 py-2 rounded-pill shadow-sm"
            style={{
              border: "2px solid #ffffff",
              backgroundColor: "transparent",
              transition: "all 0.3s ease",
            }}
            onMouseEnter={(e) => {
              e.target.style.backgroundColor = "#ffffff";
              e.target.style.color = "#0d6efd"; // Primary color
            }}
            onMouseLeave={(e) => {
              e.target.style.backgroundColor = "transparent";
              e.target.style.color = "#ffffff"; // Text light color
            }}
          >
            Logout
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
