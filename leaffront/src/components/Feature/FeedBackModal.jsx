import { useAuth } from "../../utils/auth";
import axios from "axios";
import "./FeedbackModal.css";
import { useState } from "react";
import { useToast } from "../../utils/ToastContext";
function FeedBackModal({ feedback, scan_id, onSuccess, onClose }) {
    const { token } = useAuth();
    const { showToast } = useToast();
    const [isAccurate, setIsAccurate] = useState(feedback.is_accurate);
    const [issues, setIssues] = useState({
        wrong_leaf_detected: feedback.wrong_leaf_detected || false,
        wrong_disease: feedback.wrong_disease || false,
        wrong_treatment: feedback.wrong_treatment || false,
    });
    const [comment, setComment] = useState(feedback.user_comment || "");
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const handleIssueChange = (e) => {
        const { name, checked } = e.target;
        setIssues((prev) => ({ ...prev, [name]: checked }));
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setIsLoading(true);
        try {
            const response = await axios.patch(
                `${import.meta.env.VITE_API_URL}/api/feedback/${scan_id}`,
                {
                    is_accurate: isAccurate,
                    wrong_leaf_detected: isAccurate === false ? issues.wrong_leaf_detected : false,
                    wrong_disease: isAccurate === false ? issues.wrong_disease : false,
                    wrong_treatment: isAccurate === false ? issues.wrong_treatment : false,
                    user_comment: comment.trim(),
                },
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            );
            onSuccess(response.data.data);
            showToast("Feedback updated successfully", "success")
        } catch (err) {
            setError(err.response?.data?.message || "Failed to update feedback.");
            showToast(err.response?.data?.message || "Failed to update feedback.", "error")

        } finally {
            setIsLoading(false);
        }
    };
    return (
        // Overlay
        <div className="modal-overlay" onClick={onClose}>
            {/* Stop click bubbling to overlay */}
            <div className="modal-box" onClick={(e) => e.stopPropagation()}>

                <div className="modal-header">
                    <h3>Update Feedback</h3>
                    <button className="modal-close" onClick={onClose}>✕</button>
                </div>
                <form onSubmit={handleSubmit} className="feedback-form">
                    <p className="feedback-subtitle">Was the prediction accurate?</p>
                    <div className="accuracy-buttons">
                        <button
                            type="button"
                            className={`btn-rate ${isAccurate === true ? "selected-yes" : ""}`}
                            onClick={() => setIsAccurate(true)}
                        >
                            👍 Yes, Spot On
                        </button>
                        <button
                            type="button"
                            className={`btn-rate ${isAccurate === false ? "selected-no" : ""}`}
                            onClick={() => setIsAccurate(false)}
                        >
                            👎 No, It's Wrong
                        </button>
                    </div>
                    {isAccurate === false && (
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
                                    checked={issues.wrong_treatment}
                                    onChange={handleIssueChange}
                                />
                                <span>Treatment or pesticide suggestion is incorrect</span>
                            </label>
                        </div>
                    )}
                    <div className="textarea-group">
                        <label>Additional comments (Optional)</label>
                        <textarea
                            rows="3"
                            maxLength={1000}
                            placeholder="Update your comment..."
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                        />
                        <small style={{ color: "#888" }}>{comment.length}/1000</small>
                    </div>

                    <div className="history-card-actions">
                        <button type="button" className="btn-secondary" onClick={onClose}>
                            Cancel
                        </button>
                        <button type="submit" className="btn-primary" disabled={isLoading}>
                            {isLoading ? "Saving..." : "Save Changes"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
export default FeedBackModal;