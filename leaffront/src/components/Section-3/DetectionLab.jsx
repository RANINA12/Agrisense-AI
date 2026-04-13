import "./DetectionLab.css";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../utils/auth";
import { useToast } from "../../utils/ToastContext"
import axios from "axios";
import { useRef, useState } from "react";
import ResultDisplay from "./ResultDisplay";
function DetectionLab() {
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [resultData, setResultData] = useState(null);
  const fileInputRef = useRef(null);
  const navigate = useNavigate();
  const { isLoggedIn, user, token } = useAuth();
  const { showToast } = useToast();
  const handleClick = () => fileInputRef.current.click();
  const handleFiles = (files) => {
    const selected = Array.from(files);
    if (selected.length + images.length > 4) {
      alert("Maximum 4 images allowed");
      return;
    }
    setImages((prev) => [...prev, ...selected]);
  };
  const handleChange = (e) => handleFiles(e.target.files);
  const handleDrop = (e) => { e.preventDefault(); handleFiles(e.dataTransfer.files); };
  const handleDragOver = (e) => e.preventDefault();
  const removeImage = (index) => setImages(images.filter((_, i) => i !== index));
  const handleUpload = async () => {
    if (!isLoggedIn) {
      showToast("You are not a logged user , Login first", "error");
      navigate("/AgriSenseAI/login");
      return;
    }
    if (images.length === 0) {
      showToast("Minimum one Images is required to upload", "error");
      return;
    }
    const formData = new FormData();
    images.forEach((img) => formData.append("images", img));
    formData.append("userName", user?.name || "Farmer");
    formData.append("language", "en");
    setIsLoading(true);
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/detect-disease`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      navigate(`/AgriSenseAI/scans/${res.data.scan_id}/analyzedResult`, {
        state: {
          result: res.data,
          images,
          scan_id: res.data.scan_id,
          user,
        },
      });
    } catch (error) {
      console.error(error);
      showToast(error.response?.data?.message || "Detection failed. Please try again.", "error");
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <section className="lab-section" id="detect-section">
      <div className="container">
        <div className="lab-header">
          <h2>AI Detection Lab</h2>
          <p>Experience real-time AI-powered plant analysis</p>
        </div>
        <div className="lab-wrapper">
          {/* LEFT SIDE */}
          <div className="lab-left">
            <div
              className="upload-box"
              onClick={handleClick}
              onDrop={handleDrop}
              onDragOver={handleDragOver}
            >
              <input
                type="file"
                ref={fileInputRef}
                multiple
                accept="image/*"
                hidden
                onChange={handleChange}
              />
              <div className="upload-content">
                <h3>Drag & Drop Leaf Image</h3>
                <p>or click to upload (max 4)</p>
              </div>
            </div>
            {images.length > 0 && (
              <div className="preview-grid">
                {images.map((img, index) => (
                  <div className="preview-box" key={index}>
                    <img
                      src={URL.createObjectURL(img)}
                      alt="preview"
                      className="preview-img"
                    />
                    <button
                      className="remove-btn"
                      onClick={(e) => {
                        e.stopPropagation();
                        removeImage(index);
                      }}
                    >
                      ✕
                    </button>
                  </div>
                ))}
              </div>
            )}
            <div className="lab-features">
              <span>Instant Scan</span>
              <span>AI Powered</span>
              <span>Accurate Results</span>
            </div>

            <button className="btn-primary scan-btn" onClick={handleUpload} disabled={isLoading}>
              {isLoading ? "Scanning..." : "Start Scanning"}
            </button>
          </div>

          {/* RIGHT SIDE */}
          <div className="lab-right">
            {isLoading ? (
              <div className="loading-container">
                <div className="loader-circle"></div>
                <p>Analyzing images with AI...</p>
              </div>
            ) : resultData ? (
              <ResultDisplay result={resultData} scan_id={resultData.scan_id} />
            ) : (
              <div className="hologram-container">
                <div className="hologram-glow"></div>
                <div className="grid-overlay"></div>
                <div className="hologram-leaf">🌿</div>
                <div className="scan-line"></div>
                <div className="particles">
                  {Array.from({ length: 20 }).map((_, idx) => (
                    <span key={idx}></span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

      </div>
    </section>
  );
}

export default DetectionLab;