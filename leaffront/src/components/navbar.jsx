import React, { useState, useEffect, useRef } from "react";
import "./navbar.css";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../utils/auth";
import { useToast } from "../utils/ToastContext"
const Navbar = () => {
  const navigate = useNavigate();
  const { showToast } = useToast();
  const { isLoggedIn, logout } = useAuth();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(() => {
    return localStorage.getItem("theme") === "dark";
  });
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.setAttribute("data-theme", "dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.setAttribute("data-theme", "light");
      localStorage.setItem("theme", "light");
    }
  }, [isDarkMode]);
  const closeTimer = useRef(null);
  const handleMouseEnter = () => {
    // Cancel any pending close when mouse re-enters
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setDropdownOpen(true);
  };
  const handleMouseLeave = () => {
    closeTimer.current = setTimeout(() => {
      setDropdownOpen(false);
    }, 150);
  };
  const handleLogout = () => {
    logout();
    showToast("Logged out Successfully", "success")
    navigate("AgriSenseAI/login");
  };
  const toggleTheme = () => {
    setIsDarkMode((prevMode) => !prevMode);
  };
  return (
    <nav className="navbar">
      <div className="container nav-container">
        <Link to="/" className="nav-logo">
          <img src="src/assets/logo.png" alt="AgriSense AI Logo" />
          <span className="logo-text">AgriSense AI</span>
        </Link>
        <div className="nav-links-wrapper">
          <div className="nav-links">
            <Link to="AgriSenseAI/services" className="nav-link">Services</Link>
            <Link to="AgriSenseAI/about" className="nav-link">About Us</Link>
            <Link to="AgriSenseAI/help" className="nav-link">Help</Link>
            <div
              className="nav-dropdown"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <span className="nav-link nav-dropdown-trigger">
                Scan History
                <span className={`dropdown-arrow ${dropdownOpen ? "open" : ""}`}>▾</span>
              </span>
              {dropdownOpen && (
                <div className="nav-dropdown-menu">
                  <Link
                    to="AgriSenseAI/getAllScan"
                    className="nav-dropdown-item"
                    onClick={() => setDropdownOpen(false)}
                  >
                    🌿 All Scans
                  </Link>
                  <Link
                    to="AgriSenseAI/feedback"
                    className="nav-dropdown-item"
                    onClick={() => setDropdownOpen(false)}
                  >
                    📋 Your Feedbacks
                  </Link>
                </div>
              )}
            </div>
          </div>
          <div className="nav-actions">
            <button onClick={toggleTheme} className="theme-toggle" aria-label="Toggle Dark Mode">
              {isDarkMode ? "☀️" : "🌙"}
            </button>
            {isLoggedIn ? (
              <button onClick={handleLogout} className="btn-primary logout-btn">
                Logout
              </button>
            ) : (
              <>
                <Link to="AgriSenseAI/login" className="nav-link login-link">Login</Link>
                <Link to="AgriSenseAI/register" className="btn-primary auth-btn">Register</Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};
export default Navbar;