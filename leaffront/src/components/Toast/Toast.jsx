import { useEffect, useState } from "react";
import "./Toast.css"
function Toast({ message, type }) {
    const [visible, setVisible] = useState(true);
    const [leaving, setLeaving] = useState(false);
    useEffect(() => {
        const fadeTimer = setTimeout(() => setLeaving(true), 2700);
        const removeTimer = setTimeout(() => setVisible(false), 3000);
        return () => {
            clearTimeout(fadeTimer);
            clearTimeout(removeTimer);
        };
    }, [message]);
    if (!visible) return null;
    return (
        <div className={`toast toast--${type} ${leaving ? "toast--leaving" : "toast--entering"}`}>
            <span className="toast-icon">
                {type === "success" && "✅"}
                {type === "error" && "❌"}
                {type === "warning" && "⚠️"}
                {type === "info" && "ℹ️"}
            </span>
            <p className="toast-message">{message}</p>
        </div>
    );
}

export default Toast;