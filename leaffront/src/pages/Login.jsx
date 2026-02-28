import "./login.css";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { loginUser } from "../api/auth";

const Login = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.placeholder.includes("email") ? "email" : "password"]:
        e.target.value,
    });
  };

  const handleLogin = async () => {
    try {
      const res = await loginUser(formData);

      // 🔐 Store token
      localStorage.setItem("token", res.data.token);

      // Store user info
      localStorage.setItem("user", JSON.stringify(res.data.user));

      alert("Login Successful");

      // Redirect to home page
      navigate("/");
    } catch (error) {
      alert(error.response?.data?.message || "Login Failed");
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <div className="login-left">
          <img src="img11.png" alt="login" />
        </div>

        <div className="login-right">
          <h2>Login</h2>

          <input
            type="email"
            placeholder="Enter email"
            className="login-input"
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
          />

          <input
            type="password"
            placeholder="Enter password"
            className="login-input"
            onChange={(e) =>
              setFormData({ ...formData, password: e.target.value })
            }
          />

          <button className="login-btn" onClick={handleLogin}>
            Login
          </button>

          <p className="signup-text">
            Don't have account? <Link to="/register">Sign up</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;