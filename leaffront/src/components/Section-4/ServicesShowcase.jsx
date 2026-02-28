import React, { useState, useEffect, useRef } from "react";
import "./ServicesShowcase.css";
import { crops } from "./servicesData";
import { useNavigate } from "react-router-dom";
import { isLoggedIn } from "../../utils/auth";


const ServicesShowcase = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [fade, setFade] = useState(true);
  const intervalRef = useRef(null);

  const startAutoSwitch = () => {
    intervalRef.current = setInterval(() => {
      setFade(false);

      setTimeout(() => {
        setActiveIndex((prev) => (prev + 1) % crops.length);
        setFade(true);
      }, 400);
    }, 6000);
  };

  useEffect(() => {
    startAutoSwitch();
    return () => clearInterval(intervalRef.current);
  }, []);

  const handleManualSelect = (index) => {
    clearInterval(intervalRef.current);

    setFade(false);

    setTimeout(() => {
      setActiveIndex(index);
      setFade(true);
    }, 300);

    startAutoSwitch();
  };

  const activeCrop = crops[activeIndex];

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
    <section className="services-section">
      <div className="overlay"></div>

      <div className="services-container">
        <h2 className="services-title">Crop Disease Detection</h2>
        <p className="services-subtitle">
          We provide AI-powered detection for the following crops
        </p>

        <div className={`main-display ${fade ? "fade-in" : "fade-out"}`}>
          
          <div className="image-section">
            <img src={activeCrop.image} alt={activeCrop.name} />
          </div>

          <div className="content-section">
            <h3>{activeCrop.name} Leaf Detection</h3>
            <ul>
              {activeCrop.diseases.map((disease, index) => (
                <li key={index}>{disease}</li>
              ))}
            </ul>
            <button className="view-btn" onClick={handleDetectClick}>View Diseases</button>
          </div>
        </div>

        <div className="thumbnail-selector">
          {crops.map((crop, index) => (
            <button
              key={index}
              className={`thumb-btn ${
                index === activeIndex ? "active" : ""
              }`}
              onClick={() => handleManualSelect(index)}
            >
              {crop.name}
            </button>
          ))}
        </div>

        <div className="view-all-wrapper">
          <button className="view-all-btn" onClick={handleDetectClick}>View All Services</button>
        </div>

      </div>
    </section>
  );
};

export default ServicesShowcase;