import { useState, useEffect, useRef } from "react";
import "./navbar.css";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../utils/auth";
import { useToast } from "../utils/ToastContext";
import logo from "../assets/images/logo.png"
const Navbar = () => {
  const navigate = useNavigate();
  const { showToast } = useToast();
  const { isLoggedIn, logout } = useAuth();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scanOpen, setScanOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(() => {
    return localStorage.getItem("theme") === "dark";
  });
  const closeTimer = useRef(null);
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", isDarkMode ? "dark" : "light");
    localStorage.setItem("theme", isDarkMode ? "dark" : "light");
  }, [isDarkMode]);

  useEffect(() => {
    setMobileOpen(false);
  }, [navigate]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  const handleMouseEnter = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setDropdownOpen(true);
  };
  const handleMouseLeave = () => {
    closeTimer.current = setTimeout(() => setDropdownOpen(false), 150);
  };
  const handleLogout = () => {
    logout();
    showToast("Logged out successfully", "success");
    setMobileOpen(false);
    navigate("AgriSenseAI/login");
  };
  return (
    <>
      <nav className="navbar">
        <div className="container nav-container">
          <Link to="/" className="nav-logo">
            <img src={logo} alt="AgriSense AI Logo" />
            <span className="logo-text">AgriSense AI</span>
          </Link>
          <div className="nav-links-wrapper desktop-nav">
            <div className="nav-links">
              <Link to="AgriSenseAI/services" className="nav-link">Services</Link>
              <Link to="AgriSenseAI/about" className="nav-link">About Us</Link>
              <Link to="AgriSenseAI/help" className="nav-link">Help</Link>

              {isLoggedIn && (
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
                      <Link to="AgriSenseAI/getAllScan" className="nav-dropdown-item"
                        onClick={() => setDropdownOpen(false)}>
                        🌿 All Scans
                      </Link>
                      <Link to="AgriSenseAI/feedback" className="nav-dropdown-item"
                        onClick={() => setDropdownOpen(false)}>
                        📋 Your Feedbacks
                      </Link>
                    </div>
                  )}
                </div>
              )}
            </div>
            <div className="nav-actions">
              <button onClick={() => setIsDarkMode(p => !p)} className="theme-toggle"
                aria-label="Toggle theme">
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
          <div className="mobile-nav-right">
            <button onClick={() => setIsDarkMode(p => !p)} className="theme-toggle"
              aria-label="Toggle theme">
              {isDarkMode ? "☀️" : "🌙"}
            </button>
            <button
              className={`hamburger ${mobileOpen ? "open" : ""}`}
              onClick={() => setMobileOpen(p => !p)}
              aria-label="Toggle menu"
            >
              <span></span>
              <span></span>
              <span></span>
            </button>
          </div>

        </div>
      </nav>
      <div
        className={`mobile-overlay ${mobileOpen ? "visible" : ""}`}
        onClick={() => setMobileOpen(false)}
      />
      <div className={`mobile-drawer ${mobileOpen ? "open" : ""}`}>
        <div className="drawer-header">
          <span className="logo-text">AgriSense AI</span>
          <button className="drawer-close" onClick={() => setMobileOpen(false)}>✕</button>
        </div>
        <nav className="drawer-links">
          <Link to="AgriSenseAI/services" className="drawer-link"
            onClick={() => setMobileOpen(false)}>
            Services
          </Link>
          <Link to="AgriSenseAI/about" className="drawer-link"
            onClick={() => setMobileOpen(false)}>
            About Us
          </Link>
          <Link to="AgriSenseAI/help" className="drawer-link"
            onClick={() => setMobileOpen(false)}>
            Help
          </Link>

          {/* Scan History accordion — only when logged in */}
          {isLoggedIn && (
            <div className="drawer-accordion">
              <button
                className="drawer-link drawer-accordion-trigger"
                onClick={() => setScanOpen(p => !p)}
              >
                <span>Scan History</span>
                <span className={`dropdown-arrow ${scanOpen ? "open" : ""}`}>▾</span>
              </button>
              {scanOpen && (
                <div className="drawer-accordion-body">
                  <Link to="AgriSenseAI/getAllScan" className="drawer-sub-link"
                    onClick={() => setMobileOpen(false)}>
                    🌿 All Scans
                  </Link>
                  <Link to="AgriSenseAI/feedback" className="drawer-sub-link"
                    onClick={() => setMobileOpen(false)}>
                    📋 Your Feedbacks
                  </Link>
                </div>
              )}
            </div>
          )}
        </nav>
        <div className="drawer-footer">
          {isLoggedIn ? (
            <button onClick={handleLogout} className="btn-primary drawer-auth-btn">
              Logout
            </button>
          ) : (
            <>
              <Link to="AgriSenseAI/login" className="btn-secondary drawer-auth-btn"
                onClick={() => setMobileOpen(false)}>
                Login
              </Link>
              <Link to="AgriSenseAI/register" className="btn-primary drawer-auth-btn"
                onClick={() => setMobileOpen(false)}>
                Register
              </Link>
            </>
          )}
        </div>

      </div>
    </>
  );
};
export default Navbar;