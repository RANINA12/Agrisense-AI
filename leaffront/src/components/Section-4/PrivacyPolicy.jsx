import React, { useState, useEffect } from "react";
import "./PrivacyPolicy.css";
const TOC = [
    { id: "overview", num: "01", label: "Overview", icon: "🌿" },
    { id: "collection", num: "02", label: "Data We Collect", icon: "🗂️" },
    { id: "usage", num: "03", label: "How We Use Your Data", icon: "⚙️" },
    { id: "ai-accuracy", num: "04", label: "AI Accuracy Disclaimer", icon: "🔬" },
    { id: "sharing", num: "05", label: "Data Sharing", icon: "🔗" },
    { id: "storage", num: "06", label: "Storage & Security", icon: "🔒" },
    { id: "rights", num: "07", label: "Your Rights", icon: "⚖️" },
    { id: "children", num: "08", label: "Children's Privacy", icon: "👶" },
    { id: "changes", num: "09", label: "Policy Changes", icon: "📋" },
    { id: "contact", num: "10", label: "Contact Us", icon: "📬" },
    { id: "disputes", num: "11", label: "Dispute Resolution", icon: "🏛️" },
];

const COLLECTED_DATA = [
    { icon: "📸", label: "Leaf Images" },
    { icon: "📍", label: "Location (optional)" },
    { icon: "🌾", label: "Crop Type" },
    { icon: "📅", label: "Scan Timestamps" },
    { icon: "📱", label: "Device Info" },
    { icon: "🌐", label: "IP Address" },
    { icon: "📊", label: "Usage Analytics" },
    { icon: "🔑", label: "Account Details" },
];

export default function PrivacyPolicy() {
    const [activeSection, setActiveSection] = useState("overview");

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) setActiveSection(entry.target.id);
                });
            },
            { rootMargin: "-20% 0px -70% 0px" }
        );
        TOC.forEach(({ id }) => {
            const el = document.getElementById(id);
            if (el) observer.observe(el);
        });
        return () => observer.disconnect();
    }, []);
    const handleScroll = (e, id) => {
        e.preventDefault();
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: "smooth", block: "start" });
        }
    };
    return (
        <div className="pp-page">
            <header className="pp-hero">
                <div className="container">
                    <div className="pp-hero-inner">
                        <div className="pp-badge">
                            <span className="pp-badge-dot" />
                            Official Legal Document
                        </div>
                        <span className="pp-hero-icon">🍃</span>
                        <h1 className="pp-title">
                            Privacy <span className="pp-highlight">Policy</span>
                        </h1>
                        <p className="pp-subtitle">
                            How AgriSense AI collects, uses, and protects your data while
                            helping Indian farmers detect crop diseases with AI trained on
                            125,000+ leaf images.
                        </p>
                        <div className="pp-meta-row">
                            <span className="pp-meta-item"><span>📅</span> Effective: January 1, 2025</span>
                            <span className="pp-meta-item"><span>🔄</span> Last Updated: June 15, 2025</span>
                            <span className="pp-meta-item"><span>📍</span> Jurisdiction: India</span>
                            <span className="pp-meta-item"><span>🌾</span> Version: 2.1</span>
                        </div>
                    </div>
                </div>
            </header>
            <div className="pp-layout container">

                {/* Sidebar TOC */}
                <aside className="pp-sidebar">
                    <nav className="pp-toc">
                        <p className="pp-toc-title">Contents</p>
                        <ul className="pp-toc-list">
                            {TOC.map(({ id, num, label }) => (
                                <li key={id}>
                                    <a
                                        href={`#${id}`}
                                        onClick={(e) => handleScroll(e, id)}
                                        className={`pp-toc-link ${activeSection === id ? "active" : ""}`}
                                    >
                                        <span className="pp-toc-num">{num}</span>
                                        {label}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </nav>
                </aside>

                <main className="pp-content">
                    <div className="pp-alert">
                        <span className="pp-alert-icon">⚠️</span>
                        <p>
                            <strong>Important:</strong> AgriSense AI is an assistive tool trained
                            on 125,000+ leaf images across India. Our AI can and does make mistakes.
                            All disease identifications should be verified by a certified
                            agronomist or agricultural extension officer before taking action.
                        </p>
                    </div>
                    <section className="pp-section" id="overview">
                        <div className="pp-section-header">
                            <div className="pp-section-icon">🌿</div>
                            <div>
                                <span className="pp-section-num">Section 01</span>
                                <h2 className="pp-section-title">Overview</h2>
                            </div>
                        </div>
                        <p>
                            AgriSense AI ("we", "our", "the Application") is an artificial intelligence–powered
                            plant disease detection platform developed to assist Indian farmers, agronomists,
                            researchers, and agricultural professionals in identifying crop diseases from
                            leaf photographs.
                        </p>
                        <p>
                            Our AI model has been trained on <strong>125,000+ leaf images</strong> representing
                            5,000 images per disease category, covering major crops grown across India
                            including Wheat, Rice, Tomato, Cabbage, Apple, Corn, Sugarcane, Tea, Grapes, and Potatoes.
                        </p>
                        <p>
                            This Privacy Policy explains what personal and non-personal information we
                            collect when you use our application, how we use it, how we protect it, and
                            your rights with respect to that information. By using AgriSense AI, you
                            agree to the practices described in this policy.
                        </p>
                    </section>
                    <section className="pp-section" id="collection">
                        <div className="pp-section-header">
                            <div className="pp-section-icon">🗂️</div>
                            <div>
                                <span className="pp-section-num">Section 02</span>
                                <h2 className="pp-section-title">Data We Collect</h2>
                            </div>
                        </div>
                        <p>
                            We collect only the information necessary to provide accurate disease
                            detection results and to improve our AI model. The types of data we
                            collect include:
                        </p>
                        <div className="pp-data-grid">
                            {COLLECTED_DATA.map(({ icon, label }) => (
                                <div className="pp-data-chip" key={label}>
                                    <span className="pp-data-chip-icon">{icon}</span>
                                    {label}
                                </div>
                            ))}
                        </div>
                        <p style={{ marginTop: "16px" }}>
                            Leaf images you upload may be stored temporarily on our secure servers
                            for up to 30 days to process results, and may be used (in anonymized,
                            non-identifiable form) to improve our AI model unless you opt out.
                        </p>
                        <p>
                            Location data, if enabled, helps us provide region-specific disease
                            prevalence alerts and seasonal forecasting. This is entirely optional
                            and can be disabled in your account settings at any time.
                        </p>
                    </section>
                    <section className="pp-section" id="usage">
                        <div className="pp-section-header">
                            <div className="pp-section-icon">⚙️</div>
                            <div>
                                <span className="pp-section-num">Section 03</span>
                                <h2 className="pp-section-title">How We Use Your Data</h2>
                            </div>
                        </div>
                        <p>We use the information collected for the following purposes:</p>
                        <ul className="pp-list">
                            <li>To process leaf images and deliver AI-generated disease detection results</li>
                            <li>To improve and retrain our AI models using anonymized, aggregated image data</li>
                            <li>To provide regional crop disease alerts and seasonal risk notifications</li>
                            <li>To generate anonymous national and state-level disease prevalence reports for agricultural research</li>
                            <li>To maintain platform security, prevent fraud, and detect misuse</li>
                            <li>To send service-related communications and important updates</li>
                            <li>To comply with applicable Indian laws and regulatory requirements</li>
                            <li>To respond to your support requests and feedback submissions</li>
                        </ul>
                        <p>
                            We do <strong>not</strong> sell your personal data to third parties,
                            use your data for targeted advertising, or share identifiable information with
                            insurance companies, banks, or government agencies without a valid legal order.
                        </p>
                    </section>
                    <section className="pp-section" id="ai-accuracy">
                        <div className="pp-section-header">
                            <div className="pp-section-icon">🔬</div>
                            <div>
                                <span className="pp-section-num">Section 04</span>
                                <h2 className="pp-section-title">AI Accuracy Disclaimer</h2>
                            </div>
                        </div>
                        <div className="pp-alert" style={{ marginBottom: "16px" }}>
                            <span className="pp-alert-icon">🔬</span>
                            <p>
                                <strong>AI Can Make Mistakes.</strong> Our model is trained on 5,000 images
                                per disease category and 125,000+ total images — however, no AI system
                                achieves 100% accuracy. Real-world conditions, lighting, image quality,
                                and rare disease variants can affect results.
                            </p>
                        </div>
                        <p>
                            AgriSense AI's detection results are provided for <strong>informational and
                                assistive purposes only</strong>. They do not constitute professional agricultural advice,
                            diagnosis, or prescription.
                        </p>
                        <ul className="pp-list">
                            <li>Always confirm AI results with a licensed agronomist or Krishi Vigyan Kendra (KVK) expert</li>
                            <li>Do not apply pesticides, herbicides, or other treatments solely based on AI output</li>
                            <li>Image quality significantly affects accuracy — blurry or poorly-lit images reduce reliability</li>
                            <li>Our model performs best on the 25 crop-disease combinations it was trained on</li>
                            <li>Novel or geographically rare disease variants may not be accurately identified</li>
                            <li>Results may vary by crop growth stage, lighting conditions, and image angle</li>
                        </ul>
                        <p>
                            We continuously work to improve model accuracy. If you receive an incorrect
                            prediction, please use the in-app feedback feature — your corrections directly
                            improve future model versions.
                        </p>
                    </section>
                    <section className="pp-section" id="sharing">
                        <div className="pp-section-header">
                            <div className="pp-section-icon">🔗</div>
                            <div>
                                <span className="pp-section-num">Section 05</span>
                                <h2 className="pp-section-title">Data Sharing</h2>
                            </div>
                        </div>
                        <p>
                            We do not sell, trade, or rent your personal information to third parties.
                            We may share anonymized, aggregated, non-identifiable data with:
                        </p>
                        <ul className="pp-list">
                            <li><strong>Agricultural Research Institutions</strong> — for disease outbreak monitoring and crop health research</li>
                            <li><strong>State & Central Government Agencies</strong> — only when required by a valid court order or legal directive under Indian law</li>
                            <li><strong>Cloud Infrastructure Providers</strong> — to host and process data securely (bound by strict data processing agreements)</li>
                            <li><strong>Analytics Partners</strong> — only aggregated, non-personal usage statistics to improve app performance</li>
                        </ul>
                        <p>
                            Any third party receiving data from us is contractually obligated to
                            maintain equivalent or greater data security standards and is prohibited
                            from using the data for any purpose not specified in our agreement.
                        </p>
                    </section>
                    <section className="pp-section" id="storage">
                        <div className="pp-section-header">
                            <div className="pp-section-icon">🔒</div>
                            <div>
                                <span className="pp-section-num">Section 06</span>
                                <h2 className="pp-section-title">Storage & Security</h2>
                            </div>
                        </div>
                        <p>
                            Your data is stored on servers located within India or in jurisdictions
                            compliant with Indian data protection regulations. We implement
                            industry-standard security measures including:
                        </p>
                        <ul className="pp-list">
                            <li>AES-256 encryption for data at rest</li>
                            <li>TLS 1.3 encryption for all data in transit</li>
                            <li>Role-based access control limiting who can access user data</li>
                            <li>Regular security audits and penetration testing</li>
                            <li>Automatic deletion of uploaded images after 30 days unless consent to retain is given</li>
                            <li>Account data retained for the duration of your account plus 2 years after deletion</li>
                        </ul>
                        <p>
                            While we take reasonable steps to protect your information, no method of
                            electronic transmission or storage is 100% secure. In the event of a data
                            breach affecting your personal information, we will notify you within
                            72 hours as required under applicable Indian law.
                        </p>
                    </section>
                    <section className="pp-section" id="rights">
                        <div className="pp-section-header">
                            <div className="pp-section-icon">⚖️</div>
                            <div>
                                <span className="pp-section-num">Section 07</span>
                                <h2 className="pp-section-title">Your Rights</h2>
                            </div>
                        </div>
                        <p>
                            Under applicable Indian data protection laws, you have the following rights
                            with respect to your personal information:
                        </p>
                        <ul className="pp-list">
                            <li><strong>Right to Access</strong> — Request a copy of all personal data we hold about you</li>
                            <li><strong>Right to Correction</strong> — Request correction of inaccurate or incomplete data</li>
                            <li><strong>Right to Deletion</strong> — Request deletion of your account and associated personal data</li>
                            <li><strong>Right to Withdraw Consent</strong> — Withdraw consent for AI training use of your images at any time</li>
                            <li><strong>Right to Data Portability</strong> — Export your scan history and account data in a standard format</li>
                            <li><strong>Right to Object</strong> — Object to specific processing activities, including marketing communications</li>
                            <li><strong>Right to Lodge a Complaint</strong> — File a complaint with the relevant data protection authority</li>
                        </ul>
                        <p>
                            To exercise any of these rights, contact us at the details provided in Section 10.
                            We will respond to all verified requests within 30 days.
                        </p>
                    </section>
                    <section className="pp-section" id="children">
                        <div className="pp-section-header">
                            <div className="pp-section-icon">👶</div>
                            <div>
                                <span className="pp-section-num">Section 08</span>
                                <h2 className="pp-section-title">Children's Privacy</h2>
                            </div>
                        </div>
                        <p>
                            AgriSense AI is intended for use by farmers, agricultural students (18+),
                            researchers, and professionals. We do not knowingly collect personal
                            information from individuals under the age of 18.
                        </p>
                        <p>
                            If we become aware that a minor has provided us with personal information,
                            we will promptly delete such data. Parents or guardians who believe their
                            child has submitted data to our platform should contact us immediately
                            using the details in Section 10.
                        </p>
                    </section>
                    <section className="pp-section" id="changes">
                        <div className="pp-section-header">
                            <div className="pp-section-icon">📋</div>
                            <div>
                                <span className="pp-section-num">Section 09</span>
                                <h2 className="pp-section-title">Policy Changes</h2>
                            </div>
                        </div>
                        <p>
                            We may update this Privacy Policy from time to time to reflect changes
                            in our practices, technology, legal requirements, or other factors. When
                            we make material changes, we will:
                        </p>
                        <ul className="pp-list">
                            <li>Update the "Last Updated" date at the top of this document</li>
                            <li>Send an in-app notification to all registered users</li>
                            <li>For significant changes, provide at least 30 days' notice before the changes take effect</li>
                            <li>Require re-acceptance of the policy for major data practice changes</li>
                        </ul>
                        <p>
                            Continued use of AgriSense AI after the effective date of any changes
                            constitutes acceptance of the updated Privacy Policy.
                        </p>
                    </section>
                    <section className="pp-section" id="contact">
                        <div className="pp-section-header">
                            <div className="pp-section-icon">📬</div>
                            <div>
                                <span className="pp-section-num">Section 10</span>
                                <h2 className="pp-section-title">Contact Us</h2>
                            </div>
                        </div>
                        <p>
                            For any questions, concerns, or requests regarding this Privacy Policy
                            or your personal data, please contact our Data Protection Officer:
                        </p>
                        <div className="pp-contact-box">
                            <h4>Data Protection Officer — AgriSense AI</h4>
                            <div className="pp-contact-row">
                                <span>📧</span>
                                <span>nikunjbisani@gmail.com</span>
                            </div>
                            <div className="pp-contact-row">
                                <span>📮</span>
                                <span>AgriSense AI Pvt. Ltd., Agricultural Technology Hub, India</span>
                            </div>
                            <div className="pp-contact-row">
                                <span>⏱️</span>
                                <span>Response time: Within 30 working days</span>
                            </div>
                            <div className="pp-contact-row">
                                <span>🕐</span>
                                <span>Support hours: Monday–Saturday, 9:00 AM – 6:00 PM IST</span>
                            </div>
                        </div>
                    </section>
                    <section className="pp-section" id="disputes">
                        <div className="pp-section-header">
                            <div className="pp-section-icon">🏛️</div>
                            <div>
                                <span className="pp-section-num">Section 11</span>
                                <h2 className="pp-section-title">Dispute Resolution & Jurisdiction</h2>
                            </div>
                        </div>
                        <p>
                            Any dispute, claim, or controversy arising out of or relating to this
                            Privacy Policy, the use of AgriSense AI, or any services provided by us
                            shall be governed by and interpreted in accordance with the laws of India.
                        </p>
                        <p>
                            In the event of a dispute, users agree to first attempt to resolve the
                            matter informally by contacting us at the details provided in Section 10.
                            We will make reasonable efforts to resolve the issue within 30 days.
                        </p>
                        <p>
                            If the dispute is not resolved through informal negotiation, it shall be
                            subject to the exclusive jurisdiction of the courts located in
                            <strong> Indore, Madhya Pradesh, India</strong>.
                        </p>
                        <p>
                            By using this application, you expressly consent to the jurisdiction and
                            venue of these courts and waive any objections to such jurisdiction,
                            including claims of inconvenient forum.
                        </p>
                        <p>
                            All disputes shall be subject to arbitration under the Arbitration and
                            Conciliation Act, 1996, with the seat of arbitration in Indore, India.
                        </p>
                    </section>

                </main>
            </div>
            <footer className="pp-footer">
                <p>
                    © 2025 AgriSense AI Pvt. Ltd. · All rights reserved ·{" "}
                    <a href="#">Terms of Service</a> · <a href="#">Support</a>
                </p>
                <p style={{ marginTop: "6px" }}>
                    Trained on 125,000+ leaf images · Serving Indian Farmers across all states
                </p>
            </footer>
        </div>
    );
}