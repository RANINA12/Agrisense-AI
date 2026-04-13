import { useState, useEffect } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { useAuth } from "../../utils/auth";
import axios from "axios";
import ResultDisplay from "../Section-3/ResultDisplay";
import "../Section-3/ResultDisplay";
function DetailedHistory() {
    const navigate = useNavigate();
    const location = useLocation();
    const { scan_id } = useParams() || location.state || null;
    const [result, setResult] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const { user, token } = useAuth();
    useEffect(() => {
        if (!user) navigate("/AgriSenseAI/login");
    }, [user, navigate]);
    useEffect(() => {
        if (!user || !scan_id) return;

        const fetchDetail = async () => {
            setIsLoading(true);
            setError(null);
            try {
                const response = await axios.get(
                    `${import.meta.env.VITE_API_URL}/api/scan/${scan_id}`,
                    {
                        headers: { Authorization: `Bearer ${token}` },
                    }
                );
                const { scan, prescription } = response.data.data;
                setResult({
                    success: true,
                    scan_id: scan._id,
                    image_url: scan.image_url,
                    ai_prediction: {
                        class: scan.predicted_class,
                        confidence: scan.confidence_score,
                    },
                    prescription,
                });
            } catch (err) {
                setError(err.response?.data?.message || "Failed to load scan details.");

            } finally {
                setIsLoading(false);
            }
        };
        fetchDetail();
    }, [scan_id]);
    if (isLoading) {
        return (
            <div className="result-page">
                <div className="container">
                    <div className="loading-container">
                        <div className="loader-circle"></div>
                        <p>Loading scan details...</p>
                    </div>
                </div>
            </div>
        );
    }
    if (error) {
        return (
            <div className="result-page">
                <div className="container">
                    <div className="result-header">
                        <button className="btn-primary" onClick={() => navigate(`AgriSenseAI/users/${user_id}/scans`)}>
                            Back to History
                        </button>
                    </div>
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
        <div className="result-page">
            <div className="container">
                <div className="result-header">
                    <button className="btn-primary" onClick={() => navigate(`/AgrisenseAI/getAllScan`)}>
                        Back to History
                    </button>
                    <h2>Scan Detail</h2>
                </div>
                <div className="result-images">
                    <img
                        src={result.image_url}
                        alt="Scanned leaf"
                        className="result-img"
                        onError={(e) => { e.target.src = "/placeholder-leaf.png"; }}
                    />
                </div>
                <ResultDisplay
                    result={result}
                    scan_id={scan_id}
                    user={user}
                />
            </div>
        </div>
    );
}
export default DetailedHistory;