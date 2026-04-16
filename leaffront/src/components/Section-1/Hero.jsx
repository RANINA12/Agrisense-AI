import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Spline from "@splinetool/react-spline";
import { useAuth } from "../../utils/auth";
import { useToast } from "../../utils/ToastContext";
import "./Hero.css";
const HeroText = () => {
  const navigate = useNavigate();
  const { isLoggedIn } = useAuth();
  const { showToast } = useToast();
  const handleDetectClick = () => {
    if (!isLoggedIn) {
      showToast("Please login first to access the AI tools", "erorr")
      navigate("/AgriSenseAI/login");
      return;
    }
  };
  return (
    <div className="hero-text-wrapper">
      <div className="hero-badge">🌱 AgriSense AI</div>

      <h1 className="hero-main-title">
        AI-Powered <br />
        <span className="hero-highlight">Leaf Disease</span> <br />
        Detection
      </h1>

      <p className="hero-description">
        Upload a leaf image and let our deep learning model detect plant diseases instantly. Fast, accurate, and built for farmers.
      </p>
      <button
        type="button"
        className="btn-primary hero-btn"
        onClick={handleDetectClick}
      >
        Detect Crop Now
      </button>
    </div>
  );
};
const Hero3D = () => {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div className="hero-spline-container">
      {isLoading && (
        <div className="spline-loader">
          <div className="spinner"></div>
          <p>Loading 3D Experience...</p>
        </div>
      )}
      <Spline
        scene="https://prod.spline.design/2d1NRljwo2hx0jlF/scene.splinecode"
        onLoad={() => setIsLoading(false)}
      />
    </div>
  );
};
const Hero = () => {
  return (
    <section className="hero-section">
      <div className="container hero-container">

        <div className="hero-left">
          <HeroText />
        </div>

        <div className="hero-right">
          <Hero3D />
        </div>
      </div>
    </section>
  );
};
export default Hero;