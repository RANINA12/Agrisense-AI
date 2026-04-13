import React from "react";
import "./about.css";
const About = () => {
    return (
        <section className="about-page">
            <div className="container">
                <div className="about-header">
                    <h1>Empowering Farmers with <span className="highlight">AI</span></h1>
                    <p>We bridge the gap between traditional farming and modern deep learning to protect crops and secure livelihoods.</p>
                </div>
                <div className="about-container">
                    <div className="about-text">
                        <h2>Our Mission</h2>
                        <p>
                            Crop diseases cause massive yield losses globally every year. Often, by the time a farmer identifies the disease, it is too late. Our mission is to put an expert agricultural pathologist in the pocket of every farmer.
                        </p>
                        <p>
                            Using a state-of-the-art deep learning model trained on thousands of plant images, AgriSense AI can diagnose diseases instantly and provide localized, actionable treatment plans in both English and Hindi.
                        </p>
                        <div className="stats-grid">
                            <div className="stat-box">
                                <h3>10</h3>
                                <span>Major Crops</span>
                            </div>
                            <div className="stat-box">
                                <h3>55+</h3>
                                <span>Diseases Detected</span>
                            </div>
                            <div className="stat-box">
                                <h3>95%</h3>
                                <span>Model Accuracy</span>
                            </div>
                        </div>
                    </div>

                    <div className="about-image">
                        <img
                            src="https://images.unsplash.com/photo-1586771107445-d3ca888129ff?auto=format&fit=crop&q=80&w=800"
                            alt="Farmer looking at healthy crops"
                        />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default About;