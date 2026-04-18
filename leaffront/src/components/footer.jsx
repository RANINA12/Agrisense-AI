import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Footer.css";
const Footer = () => {
  const currentYear = new Date().getFullYear();
  const navigate = useNavigate();
  return (
    <footer className="footer">
      <div className="container footer-container">
        <div className="footer-section brand-section">
          <div className="footer-logo">
            <span className="logo-icon">🍃</span>
            <h2>AgriSense AI</h2>
          </div>
          <p className="footer-description">
            Empowering Indian farmers with state-of-the-art AI technology. Upload a photo of your crop, and let our machine learning model detect diseases instantly to protect your yield.
          </p>
        </div>

        <div className="footer-section">
          <h3 className="footer-heading">Quick Links</h3>
          <ul className="footer-links">
            <li><Link to="/">Home (Detection Lab)</Link></li>
            <li><Link to="AgriSenseAI/about">About Us</Link></li>
            <li><Link to="AgriSenseAI/services">Supported Crops</Link></li>
          </ul>
        </div>
        <div className="footer-section">
          <h3 className="footer-heading">Support & Legal</h3>
          <ul className="footer-links">
            <li><Link to="AgriSenseAI/help">Help Center & Support</Link></li>
            <li><Link to="AgriSenseAI/privacy-policy">Privacy Policy</Link></li>
            <li><Link to="AgriSenseAI/terms-of-service">Terms of Service</Link></li>
          </ul>
        </div>
      </div>
      <div className="footer-bottom">
        <div className="container footer-bottom-container">
          <p>&copy; {currentYear} AgriSense AI Pvt. Ltd. All rights reserved.</p>
          <a href="/AgriSenseAI/voteofthanks">vote of thanks</a>

          <div className="social-links">
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
              <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.005 4.15H5.059z" />
              </svg>
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
              <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;