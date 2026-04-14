import React, { useState } from "react";
import "./help.css";
import { useToast } from "../../utils/ToastContext"
import axios from "axios";
const Help = () => {
    const { showToast } = useToast();
    const [formData, setFormData] = useState({ name: "", email: "", issue: "", message: "" });
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post(`${import.meta.env.VITE_API_URL}/help/query`, {
                formData
            });
            if (res.data.message === "success") {
                showToast("Thank you! Our support team will contact you shortly.", "success")
                setFormData({ name: "", email: "", issue: "", message: "" });
            }
        }
        catch (error) {
            showToast("Something went wrong , pls try again", "error");
            console.log(error);
        }
    };
    return (
        <section className="help-page">
            <div className="container">
                <div className="help-container">
                    <div className="help-info">
                        <h1>How can we <span className="help-highlight">help you?</span></h1>
                        <p>Experiencing an issue with an image upload? Need help understanding a prescription? Let our agricultural experts assist you.</p>

                        <div className="contact-methods">
                            <div className="method">
                                <strong>📧 Email Us</strong>
                                <span>nikunjbisani@gmail.com</span>
                            </div>
                            <div className="method">
                                <strong>📞 Call us </strong>
                                <span> 6232426158 (Helpline)</span>
                            </div>
                        </div>
                    </div>
                    <div className="help-form-container">
                        <form className="help-form" onSubmit={handleSubmit}>
                            <h2>Raise an Issue</h2>
                            <div className="form-group">
                                <label>Full Name</label>
                                <input type="text" required value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} />
                            </div>
                            <div className="form-group">
                                <label>Email Address</label>
                                <input type="email" required value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} />
                            </div>
                            <div className="form-group">
                                <label>Type of Issue</label>
                                <select required value={formData.issue} onChange={(e) => setFormData({ ...formData, issue: e.target.value })}>
                                    <option value="">Select an issue...</option>
                                    <option value="upload">Image Upload Failing</option>
                                    <option value="accuracy">Wrong AI Prediction</option>
                                    <option value="account">Account/Login Issue</option>
                                    <option value="other">Other</option>
                                </select>
                            </div>
                            <div className="form-group">
                                <label>Description</label>
                                <textarea rows="4" required value={formData.message} onChange={(e) => setFormData({ ...formData, message: e.target.value })}></textarea>
                            </div>
                            <button type="submit" className="btn-primary">Send Message</button>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Help;