import "./login.css";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../utils/auth";
import { useToast } from "../utils/ToastContext"
import img11 from "../assets/images/img11.png"
const Login = () => {
  const navigate = useNavigate();
  const { login, isLoading } = useAuth();
  const { showToast } = useToast();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  const handleLogin = async (e) => {
    e.preventDefault();
    const { success, message } = await login(formData.email, formData.password);
    if (success) {
      navigate("/");
      showToast("Login Successfully ", "success")
    }
    else {
      showToast(message, "error")
    }
  };
  return (
    <div className="login-container">
      <div className="login-box">
        <div className="login-left">
          <img src={img11} alt="login illustration" />
        </div>
        <div className="login-right">
          <h2>Login</h2>

          <form onSubmit={handleLogin} className="login-form">
            <input
              type="email"
              name="email"
              placeholder="Enter email"
              className="login-input"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <input
              type="password"
              name="password"
              placeholder="Enter password"
              className="login-input"
              value={formData.password}
              onChange={handleChange}
              required
            />
            <button type="submit" className="login-btn btn-primary" disabled={isLoading}>
              {isLoading ? "Logging" : "Login"}
            </button>
          </form>
          <p className="signup-text">
            Don't have an account? <Link to="/AgriSenseAI/register">Sign up</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;