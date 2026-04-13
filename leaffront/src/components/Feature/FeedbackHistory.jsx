import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../utils/auth";
import axios from "axios";
import FeedBackModal from "./FeedBackModal";
import "./FeedBackHistory.css";
const isEditable = (createdAt) => {
    const created = new Date(createdAt).getTime();
    const now = Date.now();
    const hours24 = 24 * 60 * 60 * 1000;
    return (now - created) < hours24;
};
const timeRemaining = (createdAt) => {
    const created = new Date(createdAt).getTime();
    const now = Date.now();
    const hours24 = 24 * 60 * 60 * 1000;
    const remaining = hours24 - (now - created);
    if (remaining <= 0) return "Editing closed";
    const hrs = Math.floor(remaining / (1000 * 60 * 60));
    const mins = Math.floor((remaining % (1000 * 60 * 60)) / (1000 * 60));
    return `${hrs}h ${mins}m left to edit`;
};
function FeedBack() {
    const navigate = useNavigate();
    const { user, token } = useAuth();
    const [feedbacks, setFeedbacks] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedFeedback, setSelectedFeedback] = useState(null);
    useEffect(() => {
        if (!user) navigate("AgriSenseAI/login");
    }, [user, navigate]);
    useEffect(() => {
        if (!user) return;
        const getFeedbacks = async () => {
            setIsLoading(true);
            setError(null);
            try {
                const response = await axios.get(
                    `${import.meta.env.VITE_API_URL}/api/feedback`,
                    {
                        headers: { Authorization: `Bearer ${token}` },
                    }
                );
                setFeedbacks(response.data.data || []);
            } catch (err) {
                setError(err.response?.data?.message || "Failed to load feedback.");
            } finally {
                setIsLoading(false);
            }
        };
        getFeedbacks();
    }, []);
    const handleUpdate = (feedback) => {
        setSelectedFeedback(feedback);
        setModalOpen(true);
    };
    const handleUpdateSuccess = (updatedFeedback) => {
        setFeedbacks((prev) =>
            prev.map((f) => (f._id === updatedFeedback._id ? updatedFeedback : f))
        );
        setModalOpen(false);
        setSelectedFeedback(null);
    };
    if (isLoading) {
        return (
            <div className="feedback-page">
                <div className="container">
                    <div className="history-loading">
                        <div className="loader-circle"></div>
                        <p>Loading your feedback...</p>
                    </div>
                </div>
            </div>
        );
    }
    if (error) {
        return (
            <div className="feedback-page">
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
        <div className="feedback-page">
            <div className="container">
                <div className="history-header">
                    <h2>Your Feedback</h2>
                    <p className="history-subtitle">
                        {feedbacks.length} feedback{feedbacks.length !== 1 ? "s" : ""} submitted
                    </p>
                </div>

                {feedbacks.length === 0 ? (
                    <div className="history-empty">
                        <span className="empty-icon">📋</span>
                        <h3>No feedback yet</h3>
                        <p>After scanning a leaf, you can submit feedback on the result.</p>
                        <button className="btn-primary" onClick={() => navigate("/")}>
                            Start Scanning
                        </button>
                    </div>
                ) : (
                    <div className="history-grid">
                        {feedbacks.map((feedback) => {
                            const editable = isEditable(feedback.createdAt);
                            return (
                                <div className="history-card" key={feedback._id}>
                                    <div className="history-card-body">
                                        <p className="history-card-scanid">
                                            Feedback ID: <code>{feedback._id}</code>
                                        </p>
                                        <p className="history-card-scanid">
                                            Scan ID: <code>{feedback.scan_id}</code>
                                        </p>
                                        <p className="history-card-confidence">
                                            Prediction was:{" "}
                                            <strong style={{ color: feedback.is_accurate ? "#28a745" : "#d9534f" }}>
                                                {feedback.is_accurate ? "✅ Accurate" : "❌ Inaccurate"}
                                            </strong>
                                        </p>
                                        {feedback.is_accurate === false && (
                                            <ul className="feedback-issues">
                                                {feedback.wrong_leaf_detected && <li>Wrong leaf detected</li>}
                                                {feedback.wrong_disease && <li>Wrong disease identified</li>}
                                                {feedback.wrong_treatment && <li>Wrong treatment suggested</li>}
                                            </ul>
                                        )}
                                        {feedback.user_comment && (
                                            <p className="history-card-date">
                                                Comment: "{feedback.user_comment}"
                                            </p>
                                        )}
                                        <p className="history-card-date">
                                            Submitted:{" "}
                                            {new Date(feedback.createdAt).toLocaleDateString("en-IN", {
                                                day: "numeric",
                                                month: "short",
                                                year: "numeric",
                                                hour: "2-digit",
                                                minute: "2-digit",
                                            })}
                                        </p>
                                        <p className="history-card-scanid"
                                            style={{ color: editable ? "#28a745" : "#888" }}>
                                            {timeRemaining(feedback.createdAt)}
                                        </p>
                                    </div>
                                    <div className="history-card-actions">
                                        <button
                                            className="btn-secondary"
                                            onClick={() =>
                                                navigate(`/AgriSenseAI/scan/${feedback.scan_id}`, {
                                                    state: { scan_id: feedback.scan_id },
                                                })
                                            }
                                        >
                                            View AI Result
                                        </button>
                                        <button
                                            className="btn-primary"
                                            onClick={() => handleUpdate(feedback)}
                                            disabled={!editable}
                                            title={!editable ? "Editing window has closed" : "Edit your feedback"}
                                        >
                                            {editable ? "Update Feedback" : "Editing Closed"}
                                        </button>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>
            {modalOpen && selectedFeedback && (
                <FeedBackModal
                    feedback={selectedFeedback}
                    scan_id={selectedFeedback.scan_id}
                    onSuccess={handleUpdateSuccess}
                    onClose={() => {
                        setModalOpen(false);
                        setSelectedFeedback(null);
                    }}
                />
            )}
        </div>
    );
}
export default FeedBack;