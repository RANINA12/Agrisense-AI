import { useLocation, useNavigate } from "react-router-dom";
import ResultDisplay from "./ResultDisplay";
import "./ResultPage.css";
import { Center } from "@react-three/drei";
function ResultPage() {
    const location = useLocation();
    const navigate = useNavigate();
    const { result, images, scan_id, user } = location.state || {};
    if (!result) {
        return (
            <div className="result-page error-state">
                <h2>No result found</h2>
                <button className="btn-primary" onClick={() => navigate("/")}>
                    Go Back to Lab
                </button>
            </div>
        );
    }
    return (
        <div className="result-page">
            <div className="container">

                <div className="result-header">
                    <button className="btn-primary" onClick={() => navigate("/")}>
                        🡠
                    </button>
                    <h2><Center>Detection Result</Center></h2>
                </div>
                <div className="result-images">
                    {images?.map((img, index) => (
                        <img
                            key={index}
                            src={URL.createObjectURL(img)}
                            alt={`Scanned leaf ${index + 1}`}
                            className="result-img"
                        />
                    ))}
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
export default ResultPage;