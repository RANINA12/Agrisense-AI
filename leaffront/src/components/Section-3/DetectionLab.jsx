

import "./DetectionLab.css";
import { useNavigate } from "react-router-dom";
import { isLoggedIn } from "../../utils/auth";


function DetectionLab() {

  const navigate = useNavigate();

          const handleDetectClick = () => {
            console.log("Button clicked")

           if (!isLoggedIn()) {
              alert("Please login first");
              navigate("/login");
              return;
            }

            // If logged in → allow action
            console.log("User is logged in. Continue...");
          };

  return (
    <section className="lab-section">

      <div className="lab-header">
        <h2>AI Detection Lab</h2>
        <p>Experience real-time AI-powered plant analysis</p>
      </div>

      <div className="lab-wrapper">

        {/* LEFT SIDE */}
        <div className="lab-left">

          <div className="upload-box">
            <div className="upload-content">
              <div className="upload-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                  <polyline points="17 8 12 3 7 8"/>
                  <line x1="12" y1="3" x2="12" y2="15"/>
                </svg>
              </div>

              <h3>Drag & Drop Leaf Image</h3>
              <p>or click to upload</p>
            </div>
          </div>

          <div className="lab-features">
            <span >Instant Scan</span>
            <span >AI Powered</span>
            <span >Accurate Results</span>
          </div>

          <button className="scan-btn" onClick={handleDetectClick}>Start Scanning</button>

        </div>

        {/* RIGHT SIDE */}
        <div className="lab-right">

          <div className="hologram-container">

            <div className="hologram-glow"></div>
            <div className="grid-overlay"></div>

            <div className="hologram-leaf">
              🌿
            </div>

            <div className="scan-line"></div>

            <div className="particles">
              {Array.from({ length: 20 }).map((_, i) => (
                <span key={i}></span>
              ))}
            </div>

          </div>

        </div>

      </div>

    </section>
  );
}

export default DetectionLab;