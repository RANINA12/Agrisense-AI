import React, { useState } from "react";
import Spline from "@splinetool/react-spline";
import "./Hero3D.css";
function Hero3D() {
    const [isLoading, setIsLoading] = useState(true);
    return (
        <div className="spline-container">
            {isLoading && (
                <div className="spline-loader">
                    <div className="spinner"></div>
                    <p>Loading 3D Experience...</p>
                </div>
            )}
            <Spline
                scene="https://prod.spline.design/2d1NRljwo2hx0jlF/scene.splinecode"
                onLoad={() => {
                    console.log("Spline loaded successfully!");
                    setIsLoading(false);
                }}
            />

        </div>
    );
}

export default Hero3D;