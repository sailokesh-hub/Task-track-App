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
      {/* Container for the navbar content */}
      <div className="container">
        {/* Row to organize logo and logout button with space between */}
        <div className="row w-100 d-flex align-items-center justify-content-between">
          {/* Left Section: Task Manager */}
          <div className="col-auto">
            <Link
              to="/"
              className="navbar-brand fw-bold text-decoration-none fs-4 fs-sm-3 fs-md-2"
              style={{
                transition: "all 0.3s ease",
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
          </div>

          {/* Right Section: Navbar Toggler or Logout Button */}
          <div className="col-auto">
            {!jwtToken ? (
              <button
                className="navbar-toggler"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#navbarNav"
                aria-controls="navbarNav"
                aria-expanded="false"
                aria-label="Toggle navigation"
                style={{
                  fontSize: "1.2rem", // Decrease the toggler size
                  padding: "0.25rem 0.5rem", // Adjust padding for smaller toggler
                }}
              >
                <span className="navbar-toggler-icon"></span>
              </button>
            ) : (
              <button
                onClick={handleLogout}
                className="btn btn-outline-light nav-link text-light mx-2 fs-5 fw-semibold px-3 py-2 rounded-pill shadow-sm"
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
        </div>
      </div>

      {/* Collapse Navigation Links */}
      {!jwtToken ? (
        <div className="collapse navbar-collapse" id="navbarNav">
          <div className="d-flex align-items-center ms-auto">
            {/* Login/Register Links when user is not logged in */}
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
            ) : null}
          </div>
        </div>
      ) : (
        ""
      )}
    </nav>
  );
};

export default Navbar;
