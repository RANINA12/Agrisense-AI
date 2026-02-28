import "./register.css";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { registerUser } from "../api/auth";

const Register = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    state: "",
    district: "",
    city: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await registerUser(formData);
      alert(res.data.message);
      navigate("/login");
    } catch (error) {
      alert(error.response?.data?.message || "Registration Failed");
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
          <input type="text" name="state" placeholder="State" required onChange={handleChange} />
          <input type="text" name="district" placeholder="District" required onChange={handleChange} />
          <input type="text" name="city" placeholder="City" required onChange={handleChange} />

          <button type="submit" className="register-btn">
            Create
          </button>
        </form>

        <p className="login-text">
          Already have account? <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;


// import "./register.css";

// import { Link } from "react-router-dom";

// const Register = () => {
//   return (
//     <div className="register-container">
      
//       <div className="register-box">
//         <h2 className="register-title">Sign In</h2>

//         <form className="register-form">
//           <input type="text" placeholder="Name" required />
//           <input type="email" placeholder="Email" required />
//           <input type="tel" placeholder="Phone Number" required />
//           <input type="password" placeholder="Password" required />

//           <input type="text" placeholder="State" required />
//           <input type="text" placeholder="District" required />
//           <input type="text" placeholder="City" required />

//           <button type="submit" className="register-btn">
//             Create
//           </button>
//         </form>

//         <p className="login-text">
//           Already have account? <Link to="/login">Login</Link>
//         </p>
//       </div>
//     </div>
//   );
// };

// export default Register;


