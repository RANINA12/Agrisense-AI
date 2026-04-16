import React from "react";
import "./VoteOfThanks.css";

const datasets = [
    {
        name: "Sugarcane Leaf Disease Dataset",
        url: "https://www.kaggle.com/datasets/nirmalsankalana/sugarcane-leaf-disease-dataset",
        crop: "🎋 Sugarcane",
    },
    {
        name: "Rice Leaf Diseases",
        url: "https://www.kaggle.com/datasets/vbookshelf/rice-leaf-diseases",
        crop: "🌾 Rice",
    },
    {
        name: "Identifying Disease in Tea Leafs",
        url: "https://www.kaggle.com/datasets/shashwatwork/identifying-disease-in-tea-leafs",
        crop: "🍃 Tea",
    },
    {
        name: "Plant Disease Detection Dataset — Master Version",
        url: "https://www.kaggle.com/datasets/adiithape1/plant-disease-detection-dataset-master-version",
        crop: "🌿 Multi-plant",
    },
    {
        name: "Wheat Leaf Dataset",
        url: "https://www.kaggle.com/datasets/olyadgetch/wheat-leaf-dataset",
        crop: "🌱 Wheat",
    },
    {
        name: "Corn / Maize Leaf Disease Dataset",
        url: "https://www.kaggle.com/datasets/smaranjitghose/corn-or-maize-leaf-disease-dataset",
        crop: "🌽 Corn",
    },
];

function VoteOfThanks() {
    return (
        <section className="vot-section">
            <div className="container">
                <div className="vot-header">
                    <span className="vot-icon">🙏</span>
                    <h2 className="vot-title">Vote of Thanks</h2>
                    <p className="vot-subtitle">
                        This project stands on the shoulders of open data contributors
                    </p>
                </div>
                <div className="vot-card vot-message">
                    <p>
                        First and foremost, I want to thank{" "}
                        <a
                            href="https://www.kaggle.com"
                            target="_blank"
                            rel="noreferrer"
                            className="vot-link"
                        >
                            Kaggle
                        </a>{" "}
                        and its incredible community for making this project possible. Without
                        their diverse, high-quality datasets, building an AI capable of
                        identifying crop diseases across multiple plant species would not have
                        been achievable.
                    </p>
                    <p>
                        I independently sourced, combined, and cleaned multiple datasets from
                        the platform — then used the resulting unified dataset to train the
                        model powering AgriSense AI. A huge thank you to every contributor
                        listed below.
                    </p>
                </div>
                <h3 className="vot-datasets-title">📦 Datasets Used</h3>
                <div className="vot-grid">
                    {datasets.map((ds, index) => (
                        <a
                            key={index}
                            href={ds.url}
                            target="_blank"
                            rel="noreferrer"
                            className="vot-dataset-card"
                        >
                            <span className="vot-crop-tag">{ds.crop}</span>
                            <p className="vot-dataset-name">{ds.name}</p>
                            <span className="vot-kaggle-badge">View on Kaggle ↗</span>
                        </a>
                    ))}
                </div>

                <p className="vot-footer-note">
                    🌍 Open data makes open science possible. Thank you to every farmer,
                    researcher, and contributor who made these datasets available.
                </p>

            </div>
        </section>
    );
}

export default VoteOfThanks;