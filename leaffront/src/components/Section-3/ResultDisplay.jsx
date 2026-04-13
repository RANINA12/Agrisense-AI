import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./ResultDisplay.css";
import { useToast } from "../../utils/ToastContext";
function ResultDisplay({ result, scan_id, user }) {
    const navigate = useNavigate();
    const [lang, setLang] = useState("en");
    const { showToast } = useToast();
    if (!result?.success) {
        return (
            <div className="result-card error-card animate-fade-in">
                <h3>{lang === "en" ? "Analysis Failed" : "विश्लेषण विफल रहा"}</h3>
                <p>{result?.error}</p>
                <button className="btn-danger" onClick={() => window.location.reload()}>
                    {lang === "en" ? "Try Again" : "पुनः प्रयास करें"}
                </button>
            </div>
        );
    }
    const { prescription, ai_prediction, ai_greeting } = result;
    const confidence = ai_prediction?.confidence ?? "N/A";
    const greetingText = ai_greeting || (
        lang === "en"
            ? `Based on my analysis, your ${prescription.crop_en} is diagnosed with ${prescription.disease_en} with ${confidence}% confidence. Here are my suggestions for you:`
            : `मेरे विश्लेषण के आधार पर, आपके ${prescription.crop_hi} में ${confidence}% संभावना के साथ ${prescription.disease_hi} की पहचान की गई है। यहाँ आपके लिए मेरे सुझाव हैं:`
    )
    const getText = (key) => prescription?.[`${key}_${lang}`];
    const getTreatment = (key) => prescription?.treatment?.[`${key}_${lang}`] ?? null;
    const handleFeedback = () => {
        if (!scan_id) {
            showToast("Scan Id not found . Please try scanning again ", "error");
            return;
        }
        navigate(`/AgriSenseAI/scans/${scan_id}/feedback`, {
            state: { scan_id, user }
        });
    };

    return (
        <div className="result-card success-card animate-fade-in">
            <div className="lang-toggle-container">
                <button className="btn-feedback" onClick={handleFeedback}>
                    📋 Feedback
                </button>
                <button className="btn-lang" onClick={() => setLang(lang === "en" ? "hi" : "en")}>
                    {lang === "en" ? "🇮🇳 हिंदी" : "🇬🇧 English"}
                </button>
            </div>

            <div className="ai-greeting">
                <span className="ai-icon">🤖</span>
                <p>{greetingText}</p>
            </div>
            {prescription && (
                <div className="prescription-content">

                    <div className="data-row">
                        <span className="label">{lang === "en" ? "Crop:" : "फसल:"}</span>
                        <span className="value">{getText("crop")}</span>
                    </div>

                    <div className="data-row">
                        <span className="label">{lang === "en" ? "Disease:" : "बीमारी:"}</span>
                        <span className="value highlight">{getText("disease")}</span>
                    </div>

                    {prescription.scientific_name && (
                        <div className="data-row">
                            <span className="label">{lang === "en" ? "Scientific Name:" : "वैज्ञानिक नाम:"}</span>
                            <span className="value" style={{ fontStyle: "italic" }}>{prescription.scientific_name}</span>
                        </div>
                    )}

                    {getText("type") && (
                        <div className="data-row">
                            <span className="label">{lang === "en" ? "Type:" : "प्रकार:"}</span>
                            <span className="value">{getText("type")}</span>
                        </div>
                    )}

                    {getText("severity") && (
                        <div className="data-row">
                            <span className="label">{lang === "en" ? "Severity:" : "गंभीरता:"}</span>
                            <span className="value" style={{ fontWeight: "bold", color: "#d9534f" }}>
                                {getText("severity")}
                            </span>
                        </div>
                    )}

                    {getText("symptoms") && (
                        <div className="data-section">
                            <h4>🔍 {lang === "en" ? "Symptoms" : "लक्षण"}</h4>
                            <p>{getText("symptoms")}</p>
                        </div>
                    )}

                    {getText("possible_reason") && (
                        <div className="data-section">
                            <h4>⚠️ {lang === "en" ? "Possible Reason" : "संभावित कारण"}</h4>
                            <p>{getText("possible_reason")}</p>
                        </div>
                    )}

                    {getText("precaution_method") && (
                        <div className="data-section">
                            <h4>🛡️ {lang === "en" ? "Precautions" : "सावधानियां"}</h4>
                            <p>{getText("precaution_method")}</p>
                        </div>
                    )}

                    {prescription.treatment && (
                        <div className="treatment-box">
                            <h4>💊 {lang === "en" ? "Recommended Treatment" : "अनुशंसित उपचार"}</h4>

                            {getTreatment("pesticide") && (
                                <p><strong>{lang === "en" ? "Pesticide:" : "कीटनाशक:"}</strong> {getTreatment("pesticide")}</p>
                            )}

                            {getTreatment("dosage_per_acre") && (
                                <p><strong>{lang === "en" ? "Dosage:" : "खुराक:"}</strong> {getTreatment("dosage_per_acre")}</p>
                            )}

                            {getTreatment("water_required") && (
                                <p><strong>{lang === "en" ? "Water:" : "पानी:"}</strong> {getTreatment("water_required")}</p>
                            )}
                        </div>
                    )}

                    {getText("other_suggestion") && (
                        <div className="data-section">
                            <h4>💡 {lang === "en" ? "Additional Suggestions" : "अन्य सुझाव"}</h4>
                            <p>{getText("other_suggestion")}</p>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}

export default ResultDisplay;