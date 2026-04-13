import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../utils/auth";
import axios from "axios";
import "./History.css";
function History() {
    const navigate = useNavigate();
    const { token, user } = useAuth();
    const [scans, setScans] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    useEffect(() => {
        if (!user) {
            navigate("AgriSenseAI/login");
        }
    }, [user, navigate]);
    useEffect(() => {
        if (!user) return;
        const getHistory = async () => {
            setIsLoading(true);
            setError(null);
            try {
                const response = await axios.get(
                    `${import.meta.env.VITE_API_URL}/api/getAllScans`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );
                setScans(response.data.data || []);
            } catch (err) {
                setError(err.response?.data?.message || "Failed to load history.");
            } finally {
                setIsLoading(false);
            }
        };
        getHistory();
    }, []);
    if (isLoading) {
        return (
            <div className="history-page">
                <div className="container">
                    <div className="history-loading">
                        <div className="loader-circle"></div>
                        <p>Loading your scan history...</p>
                    </div>
                </div>
            </div>
        );
    }
    if (error) {
        return (
            <div className="history-page">
                <div className="container">
                    <div className="history-error">
                        <h3>Something went wrong</h3>
                        <p>{error}</p>
                        <button className="btn-primary" onClick={() => window.location.reload()}>
                            Retry
                        </button>
                    </div>
                </div>
            </div>
        );
    }
    return (
        <div className="history-page">
            <div className="container">

                <div className="history-header">
                    <h2>Your Scan History</h2>
                    <p className="history-subtitle">
                        {scans.length} scan{scans.length !== 1 ? "s" : ""} found
                    </p>
                </div>
                {scans.length === 0 ? (

                    <div className="history-empty">
                        <span className="empty-icon">🌿</span>
                        <h3>No scans yet</h3>
                        <p>Upload a leaf image to get started.</p>
                        <button className="btn-primary" onClick={() => navigate("/")}>
                            Start Scanning
                        </button>
                    </div>
                ) : (
                    <div className="history-grid">
                        {scans.map((scan) => (
                            <div className="history-card" key={scan._id}>

                                {/* Scan image */}
                                <div className="history-card-image">
                                    <img
                                        src={scan.image_url}
                                        alt={scan.predicted_class}
                                        className="history-img"
                                        onError={(e) => {
                                            e.target.src = "/placeholder-leaf.png";
                                        }}
                                    />
                                </div>
                                <div className="history-card-body">
                                    <h4 className="history-card-disease">
                                        {scan.predicted_class.replace(/_/g, " ")}
                                    </h4>
                                    <p className="history-card-confidence">
                                        Confidence: <strong>{scan.confidence_score}%</strong>
                                    </p>
                                    <p className="history-card-date">
                                        {new Date(scan.createdAt).toLocaleDateString("en-IN", {
                                            day: "numeric",
                                            month: "short",
                                            year: "numeric",
                                        })}
                                    </p>
                                    <p className="history-card-scanid">
                                        Scan ID: <code>{scan._id}</code>
                                    </p>
                                </div>
                                <div className="history-card-actions">
                                    <button
                                        className="btn-primary"
                                        onClick={() =>
                                            navigate(`AgriSenseAI/scans/${scan_id}`, {
                                                state: { scan_id: scan._id },
                                            })
                                        }
                                    >
                                        View Details
                                    </button>
                                    <button
                                        className="btn-secondary"
                                        onClick={() =>
                                            navigate(`AgriSenseAI/scans/${scan_id}/feedback `, {
                                                state: { scan_id: scan._id, user },
                                            })
                                        }
                                    >
                                        Give Feedback
                                    </button>
                                </div>

                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
export default History;