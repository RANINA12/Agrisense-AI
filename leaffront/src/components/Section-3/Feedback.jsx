import { useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../../utils/auth";
import { useToast } from "../../utils/ToastContext"
import axios from "axios";
import "./Feedback.css";
const FeedbackForm = () => {
    const navigate = useNavigate();
    const { scan_id } = useParams() || location.state || {};
    const location = useLocation();
    const { token, user } = useAuth();
    const { showToast } = useToast();
    const [isAccurate, setIsAccurate] = useState(null);
    const [issues, setIssues] = useState({
        wrong_leaf_detected: false,
        wrong_disease: false,
        wrong_treatment: false,
    });
    const [comment, setComment] = useState("");
    const [submitted, setSubmitted] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    if (!scan_id) {
        return (
            <div className="feedback-container">
                <h3>Invalid feedback link.</h3>
                <button className="btn-primary" onClick={() => navigate("/")}>
                    Go Back
                </button>
            </div>
        );
    }
    const handleIssueChange = (e) => {
        const { name, checked } = e.target;
        setIssues((prev) => ({ ...prev, [name]: checked }));
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        if (isAccurate === null) {
            setError("Please select whether the prediction was accurate or not.");
            showToast(error, "error")
            return;
        }
        const feedbackPayload = {
            scan_id: scan_id,
            is_accurate: isAccurate,
            wrong_leaf_detected: isAccurate === false ? issues.wrong_leaf_detected : false,
            wrong_disease: isAccurate === false ? issues.wrong_disease : false,
            wrong_treatment: isAccurate === false ? issues.wrong_treatment : false,
            user_comment: comment.trim(),
        };
        setIsLoading(true);
        try {
            await axios.post(
                `${import.meta.env.VITE_API_URL}/api/feedback`,
                feedbackPayload,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,  // required by auth middleware
                    },
                }
            );
            setSubmitted(true);
        } catch (err) {
            setError(err.response?.data?.message || "Failed to submit feedback. Please try again.");
            showToast(error, "error")

        } finally {
            setIsLoading(false);
        }
    };
    if (submitted) {
        return (
            <div className="feedback-container success-state animate-fade-in">
                <h3>Thank you for your feedback! 🌾</h3>
                <p>Your response helps us train our AI to be more accurate for farmers everywhere.</p>
                <button className="btn-primary" onClick={() => navigate("/")}>
                    Back to Lab
                </button>
            </div>
        );
    }
    return (
        <div className="feedback-container">
            <h3>Help Us Improve</h3>
            <p className="feedback-subtitle">Was this AI prediction accurate?</p>
            {user?.name && (
                <p className="feedback-subtitle">Submitting as: <strong>{user.name}</strong></p>
            )}
            <div className="accuracy-buttons">
                <button
                    className={`btn-rate ${isAccurate === true ? "selected-yes" : ""}`}
                    onClick={() => setIsAccurate(true)}
                    type="button"
                >
                    👍 Yes, Spot On
                </button>
                <button
                    className={`btn-rate ${isAccurate === false ? "selected-no" : ""}`}
                    onClick={() => setIsAccurate(false)}
                    type="button"
                >
                    👎 No, It's Wrong
                </button>
            </div>
            {isAccurate === false && (
                <form onSubmit={handleSubmit} className="feedback-form animate-fade-in">
                    <p className="question-text">What went wrong? (Select all that apply)</p>
                    <div className="checkbox-group">
                        <label className="checkbox-label">
                            <input
                                type="checkbox"
                                name="wrong_leaf_detected"
                                checked={issues.wrong_leaf_detected}
                                onChange={handleIssueChange}
                            />
                            <span>Image is not a leaf / Invalid photo</span>
                        </label>

                        <label className="checkbox-label">
                            <input
                                type="checkbox"
                                name="wrong_disease"
                                checked={issues.wrong_disease}
                                onChange={handleIssueChange}
                            />
                            <span>Wrong plant or disease identified</span>
                        </label>
                        <label className="checkbox-label">
                            <input
                                type="checkbox"
                                name="wrong_treatment"
                                onChange={handleIssueChange}
                                checked={issues.wrong_treatment}
                            />
                            <span>Treatment or pesticide suggestion is incorrect/unhelpful</span>
                        </label>
                    </div>
                    <div className="textarea-group">
                        <label>How can we improve? (Optional)</label>
                        <textarea
                            rows="3"
                            placeholder="Tell us what the actual disease is, or how we can do better..."
                            value={comment}
                            maxLength={1000}
                            onChange={(e) => setComment(e.target.value)}
                        />
                        <small style={{ color: "#888" }}>{comment.length}/1000</small>
                    </div>
                    <button type="submit" className="btn-primary" disabled={isLoading}>
                        {isLoading ? "Submitting..." : "Submit Feedback"}
                    </button>
                </form>
            )}
            {isAccurate === true && (
                <form onSubmit={handleSubmit} className="feedback-form animate-fade-in">
                    <div className="textarea-group">
                        <label>Any additional comments? (Optional)</label>
                        <textarea
                            rows="2"
                            placeholder="E.g., Great suggestion, saved my crop!"
                            value={comment}
                            maxLength={1000}
                            onChange={(e) => setComment(e.target.value)}
                        />
                        <small style={{ color: "#888" }}>{comment.length}/1000</small>
                    </div>

                    <button type="submit" className="btn-primary" disabled={isLoading}>
                        {isLoading ? "Submitting..." : "Submit Feedback"}
                    </button>
                </form>
            )}
        </div>
    );
};
export default FeedbackForm;