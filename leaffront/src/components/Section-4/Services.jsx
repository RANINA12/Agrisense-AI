import React from "react";
import "./services.css";
import Apple from "../../assets/images/Apple.jpg"
import Cabbage from "../../assets/images/cabbage.png"
import Corn from "../../assets/images/Corn.jpg"
import Grapes from "../../assets/images/Grapes.jpg"
import Potato from "../../assets/images/potato.jpg"
import Rice from "../../assets/images/Rice.jpg"
import Sugarcane from "../../assets/images/SugarCane.jpg"
import Tea from "../../assets/images/Tea.jpg"
import Tomato from "../../assets/images/Tomato.jpg"
import Wheat from "../../assets/images/Wheat.jpg"

const Services = () => {
    const crops = [
        { name: "Apple", icon: "🍎", image: Apple },
        { name: "Cabbage", icon: "🥬", image: Cabbage },
        { name: "Corn", icon: "🌽", image: Corn },
        { name: "Grapes", icon: "🍇", image: Grapes },
        { name: "Potato", icon: "🥔", image: Potato },
        { name: "Rice", icon: "🌾", image: Rice },
        { name: "Sugarcane", icon: "🎋", image: Sugarcane },
        { name: "Tea", icon: "🍃", image: Tea },
        { name: "Tomato", icon: "🍅", image: Tomato },
        { name: "Wheat", icon: "🌾", image: Wheat }
    ];

    return (
        <section className="services-page">
            <div className="container">
                <div className="services-header">
                    <h1>Supported <span className="services-highlight">Crops</span></h1>
                    <p>Our AI is trained to detect diseases across 10 vital crops, offering tailored chemical and organic treatments for over 50 specific conditions.</p>
                </div>
                <div className="crops-grid">
                    {crops.map((crop, index) => (
                        <div className="crop-card" key={index}>

                            <div className="crop-image" style={{ backgroundImage: `url(${crop.image})` }}></div>
                            {/* <div className="crop-image"><img src={crop.image} /></div> */}
                            <div className="crop-info">
                                <h3>{crop.icon} {crop.name}</h3>
                                <p>Instant detection of leaf blights, rots, and pests.</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};
export default Services;