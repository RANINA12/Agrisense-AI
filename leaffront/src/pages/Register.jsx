import "./register.css";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../utils/auth";
import data from "../Data/District";
import { useToast } from "../utils/ToastContext"
const Register = () => {
  const navigate = useNavigate();
  const { showToast } = useToast();
  const { register, isLoading, error } = useAuth();
  const [state, setState] = useState("");
  const [districts, setDistricts] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    state: "",
    district: "",
    city: "",
    agreeToTerms: false,
  });

  const handleStateChange = (e) => {
    const selectedState = e.target.value;
    setState(selectedState);

    setFormData({
      ...formData,
      state: selectedState,
      district: "",
    });

    if (selectedState === "") {
      setDistricts([]);
      showToast(error, "error");
    } else {
      setDistricts(data[selectedState] || []);
    }
  };

  const handleDistrictChange = (e) => {
    setFormData({
      ...formData,
      district: e.target.value,
    });
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };
  const handleSubmit = async (e) => {
    console.log(formData);
    e.preventDefault();
    if (!formData.agreeToTerms) {
      alert("Please agree to the Terms of Service and Privacy Policy");
      return;
    }
    const { success } = await register(formData);
    if (success) {
      navigate("/AgriSenseAI/login")
      showToast("Register Successfully", "success");
    }
    else {
      showToast(error, "error");
    }
  };
  return (
    <div className="register-container">
      <div className="register-box">
        <h2 className="register-title">Sign Up</h2>

        <form className="register-form" onSubmit={handleSubmit}>
          <input type="text" name="name" placeholder="Name" required onChange={handleChange} />
          <input type="email" name="email" placeholder="Email" required onChange={handleChange} />
          <input type="tel" name="phone" placeholder="Phone Number" required onChange={handleChange} />
          <input type="password" name="password" placeholder="Password" required onChange={handleChange} />
          <select value={state} onChange={handleStateChange} required>
            <option value="">Select State</option>
            {Object.keys(data).map((st, index) => (
              <option key={index} value={st}>
                {st}
              </option>
            ))}
          </select>
          
          <select value={formData.district} onChange={handleDistrictChange} disabled={!state} required>
            <option value="">Select District</option>
            {districts.map((dist, index) => (
              <option key={index} value={dist}>
                {dist}
              </option>
            ))}
          </select>
          <input type="text" name="city" placeholder="City" required onChange={handleChange} />
          <div className="privacy-box">
            <input
              type="checkbox"
              name="agreeToTerms"
              id="agreeToTerms"
              onChange={handleChange}
            />
            <label htmlFor="agreeToTerms">
              I agree to the{" "}
              <a 
  href="/AgriSenseAI/terms-of-service" 
  target="_blank" 
  rel="noopener noreferrer"
>
  Terms Of Service
</a>{" "}
              and{" "}
              <a 
  href="/AgriSenseAI/privacy-policy" 
  target="_blank" 
  rel="noopener noreferrer"
>
  Privacy Policy
</a>
            </label>
          </div>

          <button type="submit" className="register-btn" disabled={isLoading}>
            {isLoading ? "Creating" : "create"}
          </button>
        </form>

        <p className="login-text">
          Already have an account? <Link to="/AgriSenseAI/login">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;