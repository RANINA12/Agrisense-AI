import { createContext, useContext, useState, useCallback } from "react";
import Toast from "../components/Toast/Toast";
const ToastContext = createContext(null);
export const ToastProvider = ({ children }) => {
    const [toastState, setToastState] = useState({
        message: "",
        type: "",
        visible: false,
    });

    const showToast = useCallback((message, type = "error") => {
        setToastState({ message: "", type: "", visible: false });
        setTimeout(() => {
            setToastState({ message, type, visible: true });
        }, 10);
        setTimeout(() => {
            setToastState({ message: "", type: "", visible: false });
        }, 3000);
    }, []);
    return (
        <ToastContext.Provider value={{ showToast }}>
            {children}
            {toastState.visible && (
                <Toast
                    message={toastState.message}
                    type={toastState.type}
                />
            )}
        </ToastContext.Provider>
    );
};
export const useToast = () => {
    const context = useContext(ToastContext);
    if (!context) throw new Error("useToast must be used inside <ToastProvider>");
    return context;
};
export default ToastProvider;