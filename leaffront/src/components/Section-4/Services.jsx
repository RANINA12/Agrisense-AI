import React from "react";
import "./services.css";

const Services = () => {
    const crops = [
        { name: "Apple", icon: "🍎", image: "https://images.unsplash.com/photo-1567306226416-28f0efdc88ce?auto=format&fit=crop&q=80&w=400" },
        { name: "Cabbage", icon: "🥬", image: "https://images.unsplash.com/photo-1599813295822-4a004eb6a58f?auto=format&fit=crop&q=80&w=400" },
        { name: "Corn", icon: "🌽", image: "https://images.unsplash.com/photo-1599940824399-b87987ceb72a?auto=format&fit=crop&q=80&w=400" },
        { name: "Grapes", icon: "🍇", image: "https://images.unsplash.com/photo-1596189181426-7f5fbba3b2a3?auto=format&fit=crop&q=80&w=400" },
        { name: "Potato", icon: "🥔", image: "https://images.unsplash.com/photo-1518977676601-b53f82aba655?auto=format&fit=crop&q=80&w=400" },
        { name: "Rice", icon: "🌾", image: "https://images.unsplash.com/photo-1536625737227-92a1fc042e7e?auto=format&fit=crop&q=80&w=400" },
        { name: "Sugarcane", icon: "🎋", image: "https://images.unsplash.com/photo-1626241776510-7521abf83d9f?auto=format&fit=crop&q=80&w=400" },
        { name: "Tea", icon: "🍃", image: "https://images.unsplash.com/photo-1582791650394-bb9e03d36b8e?auto=format&fit=crop&q=80&w=400" },
        { name: "Tomato", icon: "🍅", image: "https://images.unsplash.com/photo-1592841200221-a6898f307baa?auto=format&fit=crop&q=80&w=400" },
        { name: "Wheat", icon: "🌾", image: "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?auto=format&fit=crop&q=80&w=400" }
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