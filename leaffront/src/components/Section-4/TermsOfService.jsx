import React, { useState, useEffect } from "react";
import "./TermOfService.css";
const TOC = [
    { id: "acceptance", num: "01", label: "Acceptance of Terms", icon: "📜" },
    { id: "description", num: "02", label: "Service Description", icon: "🌿" },
    { id: "ai-disclaimer", num: "03", label: "AI Disclaimer & Limitations", icon: "🔬" },
    { id: "eligibility", num: "04", label: "Eligibility & Accounts", icon: "👤" },
    { id: "permitted", num: "05", label: "Permitted & Prohibited Use", icon: "⚖️" },
    { id: "ip", num: "06", label: "Intellectual Property", icon: "🧠" },
    { id: "liability", num: "07", label: "Limitation of Liability", icon: "🛡️" },
    { id: "legal", num: "08", label: "Legal Disputes & Jurisdiction", icon: "🏛️" },
    { id: "indemnity", num: "09", label: "Indemnification", icon: "🤝" },
    { id: "termination", num: "10", label: "Termination", icon: "🚫" },
    { id: "changes", num: "11", label: "Changes to Terms", icon: "📋" },
    { id: "contact", num: "12", label: "Contact & Grievance", icon: "📬" },
];
const SUMMARY_CARDS = [
    { icon: "🌾", label: "Platform", val: "AI Crop Disease Detection" },
    { icon: "🗺️", label: "Jurisdiction", val: "Republic of India" },
    { icon: "⚖️", label: "Governing Law", val: "Indian Contract Act, IT Act" },
    { icon: "🏛️", label: "Disputes", val: "Courts of India" },
    { icon: "🔬", label: "AI Trained", val: "125,000+ Leaf Images" },
    { icon: "📅", label: "Effective", val: "January 1, 2025" },
];
export default function TermsOfService() {
    const [activeSection, setActiveSection] = useState("acceptance");
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) setActiveSection(entry.target.id);
                });
            },
            { rootMargin: "-20% 0px -70% 0px" });
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
        <div className="tos-page">
            <div className="tos-topbar">
                <div className="tos-topbar-brand">
                    <span>🍃</span> AgriSense AI
                </div>
                <span className="tos-topbar-tag">Terms of Service</span>
            </div>
            <header className="tos-hero">
                <div className="container">
                    <div className="tos-hero-badge">📜 Legally Binding Agreement</div>
                    <span className="tos-hero-icon">⚖️</span>
                    <h1>Terms of <em>Service</em></h1>
                    <p className="tos-hero-sub">
                        Please read these terms carefully before using AgriSense AI — the AI-powered
                        plant disease detection platform trained on 125,000+ leaf images across India.
                    </p>
                    <div className="tos-meta">
                        <span className="tos-meta-pill">📅 Effective: January 1, 2025</span>
                        <span className="tos-meta-pill">🔄 Updated: June 15, 2025</span>
                        <span className="tos-meta-pill">📍 Jurisdiction: India</span>
                        <span className="tos-meta-pill">🌐 Version: 2.1</span>
                    </div>
                </div>
            </header>
            <div className="tos-summary container">
                {SUMMARY_CARDS.map(({ icon, label, val }) => (
                    <div className="tos-sum-card" key={label}>
                        <span className="tos-sum-card-icon">{icon}</span>
                        <div className="tos-sum-card-label">{label}</div>
                        <div className="tos-sum-card-val">{val}</div>
                    </div>
                ))}
            </div>
            <div className="tos-layout container">
                <aside className="tos-sidebar">
                    <nav className="tos-toc">
                        <p className="tos-toc-label">Sections</p>
                        <ul className="tos-toc-list">
                            {TOC.map(({ id, num, label }) => (
                                <li key={id}>
                                    <a
                                        href={`#${id}`}
                                        onClick={(e) => handleScroll(e, id)}
                                        className={`tos-toc-link ${activeSection === id ? "active" : ""}`}
                                    >
                                        <span className="tos-toc-num">{num}</span>
                                        {label}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </nav>
                </aside>
                <main className="tos-content">
                    <div className="tos-warning">
                        <span style={{ fontSize: "1.3rem", flexShrink: 0 }}>⚠️</span>
                        <p>
                            <strong>By accessing or using AgriSense AI, you agree to be legally bound
                                by these Terms of Service.</strong> If you do not agree, you must immediately
                            stop using the application. These terms govern all use of the platform,
                            its API, and associated services.
                        </p>
                    </div>
                    <section className="tos-section" id="acceptance">
                        <div className="tos-section-header">
                            <div className="tos-section-icon">📜</div>
                            <div>
                                <span className="tos-section-num">Section 01</span>
                                <h2 className="tos-section-title">Acceptance of Terms</h2>
                            </div>
                        </div>
                        <p>
                            These Terms of Service ("Terms") constitute a legally binding agreement between
                            you ("User", "you", "your") and AgriSense AI Pvt. Ltd. ("Company", "we", "us", "our"),
                            governing your access to and use of the application, website,
                            API, and all associated services (collectively, the "Service").
                        </p>
                        <p>
                            Your use of the Service constitutes your full acceptance of these Terms, our
                            Privacy Policy, and any additional guidelines or rules posted on the platform.
                            If you are using the Service on behalf of an organization, you represent
                            that you have authority to bind that organization to these Terms.
                        </p>
                        <p>
                            These Terms are effective as of the date you first access or use the Service,
                            and shall remain in full force until terminated in accordance with the
                            provisions herein.
                        </p>
                    </section>
                    <section className="tos-section" id="description">
                        <div className="tos-section-header">
                            <div className="tos-section-icon">🌿</div>
                            <div>
                                <span className="tos-section-num">Section 02</span>
                                <h2 className="tos-section-title">Service Description</h2>
                            </div>
                        </div>
                        <p>
                            AgriSense AI is an artificial intelligence–powered crop disease detection platform
                            built to assist Indian farmers, agricultural researchers, agronomists,
                            extension workers, and students in identifying plant diseases from photographs
                            of crop leaves.
                        </p>
                        <p>
                            Our AI model has been trained on a dataset of over{" "}
                            <strong>125,000 leaf images</strong>{" "}
                            comprising 5,000 images per disease category, covering major crops cultivated
                            across all regions of India, including but not limited to Wheat, Rice, Tomato,
                            Cabbage, Apple, Corn, Sugarcane, Tea, Grapes, and Potatoes.
                        </p>
                        <p>
                            The Service provides disease identification results, suggested treatment options,
                            regional disease alerts, and agricultural guidance. The Company reserves the
                            right to modify, suspend, or discontinue any feature of the Service at any
                            time with reasonable notice.
                        </p>
                    </section>
                    <section className="tos-section" id="ai-disclaimer">
                        <div className="tos-section-header">
                            <div className="tos-section-icon">🔬</div>
                            <div>
                                <span className="tos-section-num">Section 03</span>
                                <h2 className="tos-section-title">AI Disclaimer & Limitations</h2>
                            </div>
                        </div>

                        <div className="tos-warning" style={{ marginBottom: "16px" }}>
                            <span style={{ fontSize: "1.2rem", flexShrink: 0 }}>🔬</span>
                            <p>
                                <strong>The AI can and does make mistakes.</strong> Detection results are provided for informational and assistive purposes
                                only. They do not constitute professional agricultural advice, certification,
                                or legally admissible diagnosis.
                            </p>
                        </div>

                        <p>
                            You expressly acknowledge and agree to the following limitations of the Service:
                        </p>
                        <ul className="tos-list">
                            <li>AI detection results may be inaccurate due to image quality, lighting conditions, disease stage, crop variety, or rare pathogen strains not represented in the training dataset.</li>
                            <li>The Company does not guarantee any specific level of accuracy, completeness, reliability, or fitness for a particular agricultural purpose.</li>
                            <li>Results must be independently verified by a licensed agronomist, Krishi Vigyan Kendra (KVK) expert, or qualified agricultural extension officer before any farming action is taken.</li>
                            <li>The Company is not responsible for any crop losses, financial damages, or adverse outcomes resulting from reliance on AI-generated results.</li>
                            <li>Treatment recommendations provided by the Service are general in nature and must be adapted to local conditions, regulations, and professional guidance.</li>
                            <li>Model performance may vary across geographic regions, seasons, and crop growth stages outside the training distribution.</li>
                        </ul>

                        <div className="tos-infobox">
                            <p>
                                💡 <strong>Best Practice:</strong> Always use the AI as a first-line
                                screening tool, not as a final diagnosis. Cross-reference with government
                                agricultural advisories and certified experts before applying any treatment.
                            </p>
                        </div>
                    </section>
                    <section className="tos-section" id="eligibility">
                        <div className="tos-section-header">
                            <div className="tos-section-icon">👤</div>
                            <div>
                                <span className="tos-section-num">Section 04</span>
                                <h2 className="tos-section-title">Eligibility & Accounts</h2>
                            </div>
                        </div>
                        <p>
                            To use AgriSense AI, you must be at least 18 years of age and capable of
                            forming a legally binding contract under the Indian Contract Act, 1872.
                            Use by minors is strictly prohibited.
                        </p>
                        <p>
                            You are responsible for maintaining the confidentiality of your account
                            credentials and for all activities that occur under your account. You must
                            notify us immediately if you suspect unauthorized access to your account.
                        </p>
                        <ul className="tos-list">
                            <li>You may not create multiple accounts to circumvent any restrictions or bans.</li>
                            <li>Account credentials may not be shared, sold, or transferred to any third party.</li>
                            <li>You must provide accurate and truthful information during registration.</li>
                            <li>Commercial API access requires a separate enterprise agreement.</li>
                        </ul>
                    </section>
                    <section className="tos-section" id="permitted">
                        <div className="tos-section-header">
                            <div className="tos-section-icon">⚖️</div>
                            <div>
                                <span className="tos-section-num">Section 05</span>
                                <h2 className="tos-section-title">Permitted & Prohibited Use</h2>
                            </div>
                        </div>
                        <p>
                            The following outlines the scope of acceptable and unacceptable use of
                            the Service:
                        </p>
                        <div className="tos-two-col">
                            <div className="tos-col-box green">
                                <h4>✓ Permitted Use</h4>
                                <ul className="tos-list allowed">
                                    <li>Diagnosing crop diseases on your own farm</li>
                                    <li>Agricultural research and academic study</li>
                                    <li>Extension worker field assessments</li>
                                    <li>Educational demonstrations and training</li>
                                    <li>Government agricultural programs</li>
                                    <li>Sharing results with your agronomist</li>
                                </ul>
                            </div>
                            <div className="tos-col-box red">
                                <h4>✕ Prohibited Use</h4>
                                <ul className="tos-list prohibited">
                                    <li>Reverse engineering the AI model</li>
                                    <li>Automated scraping or bulk API abuse</li>
                                    <li>Reselling results without written consent</li>
                                    <li>Submitting false or misleading images</li>
                                    <li>Use for non-agricultural commercial fraud</li>
                                    <li>Circumventing security or access controls</li>
                                </ul>
                            </div>
                        </div>
                        <p style={{ marginTop: "14px" }}>
                            The Company reserves the right to suspend or terminate accounts found
                            in violation of these usage terms without prior notice. Serious violations
                            may be referred to appropriate legal authorities.
                        </p>
                    </section>
                    <section className="tos-section" id="ip">
                        <div className="tos-section-header">
                            <div className="tos-section-icon">🧠</div>
                            <div>
                                <span className="tos-section-num">Section 06</span>
                                <h2 className="tos-section-title">Intellectual Property</h2>
                            </div>
                        </div>
                        <p>
                            The platform, including its trained AI models, algorithms,
                            source code, user interface, visual design, brand assets, training
                            methodology, and all associated intellectual property, are the exclusive
                            property of AgriSense AI Pvt. Ltd. and are protected under the Copyright
                            Act, 1957, and the Information Technology Act, 2000.
                        </p>
                        <p>
                            By submitting leaf images or feedback through the platform, you grant the
                            Company a <strong>non-exclusive, royalty-free, worldwide license</strong> to use,
                            store, and process such submissions for the purpose of providing the Service
                            and improving the AI model, unless you have specifically opted out of AI
                            training use in your account settings.
                        </p>
                        <ul className="tos-list">
                            <li>You retain ownership of the original images you submit.</li>
                            <li>You may not copy, reproduce, or redistribute any part of the platform without written consent.</li>
                            <li>The brand name, logo, and branding are registered trademarks and may not be used without permission.</li>
                        </ul>
                    </section>
                    <section className="tos-section" id="liability">
                        <div className="tos-section-header">
                            <div className="tos-section-icon">🛡️</div>
                            <div>
                                <span className="tos-section-num">Section 07</span>
                                <h2 className="tos-section-title">Limitation of Liability</h2>
                            </div>
                        </div>
                        <p>
                            To the maximum extent permitted by applicable Indian law, the Company,
                            its directors, officers, employees, and agents shall not be liable for any:
                        </p>
                        <ul className="tos-list">
                            <li>Crop losses, yield reduction, or financial damages resulting from acting on AI-generated disease identifications or treatment recommendations.</li>
                            <li>Indirect, incidental, consequential, or punitive damages arising from use or inability to use the Service.</li>
                            <li>Damages resulting from service interruptions, data loss, or platform errors.</li>
                            <li>Actions taken by third parties based on exported or shared Service results.</li>
                            <li>Losses arising from reliance on the Service without professional agricultural consultation.</li>
                        </ul>
                        <p>
                            In any case, the Company's maximum aggregate liability to you for any claim
                            arising from use of the Service shall not exceed the amount paid by you
                            to the Company in the three (3) months preceding the claim.
                        </p>
                        <div className="tos-infobox">
                            <p>
                                🛡️ The Service is provided <strong>"AS IS"</strong> and{" "}
                                <strong>"AS AVAILABLE"</strong> without warranties of any kind, express
                                or implied, including warranties of merchantability, fitness for a
                                particular purpose, or non-infringement.
                            </p>
                        </div>
                    </section>
                    <section className="tos-section" id="legal">
                        <div className="tos-section-header">
                            <div className="tos-section-icon">🏛️</div>
                            <div>
                                <span className="tos-section-num">Section 08</span>
                                <h2 className="tos-section-title">Legal Disputes & Jurisdiction</h2>
                            </div>
                        </div>
                        <p>
                            These Terms of Service shall be governed by and construed in accordance
                            with the laws of the <strong>Republic of India</strong>,
                            without regard to its conflict of law provisions.
                        </p>
                        <p>
                            Any dispute, claim, or controversy arising out of or relating to these
                            Terms or the use of the Service — including questions of validity,
                            interpretation, performance, or breach — shall be subject to the
                            following dispute resolution process:
                        </p>
                        <ul className="tos-list">
                            <li>
                                <strong>Step 1 — Negotiation (30 days):</strong> The parties shall first attempt to resolve the dispute through good-faith negotiation within 30 days of written notice.
                            </li>
                            <li>
                                <strong>Step 2 — Mediation (60 days):</strong> If negotiation fails, the parties shall attempt mediation under the Mediation Act, 2023.
                            </li>
                            <li>
                                <strong>Step 3 — Arbitration:</strong> Unresolved disputes shall be referred to binding arbitration under the Arbitration and Conciliation Act, 1996, with a sole arbitrator appointed by mutual agreement.
                            </li>
                            <li>
                                <strong>Step 4 — Courts of India:</strong> Matters not suitable for arbitration, or enforcement of arbitral awards, shall be subject to the exclusive jurisdiction of the competent Courts of India.
                            </li>
                        </ul>
                        <p>
                            Notwithstanding the above, either party may seek urgent interim or
                            injunctive relief from a competent court of law without following the
                            above process. Consumer disputes may also be raised before the relevant
                            Consumer Disputes Redressal Commission under the Consumer Protection Act, 2019.
                        </p>
                    </section>
                    <section className="tos-section" id="indemnity">
                        <div className="tos-section-header">
                            <div className="tos-section-icon">🤝</div>
                            <div>
                                <span className="tos-section-num">Section 09</span>
                                <h2 className="tos-section-title">Indemnification</h2>
                            </div>
                        </div>
                        <p>
                            You agree to indemnify, defend, and hold harmless the Company
                            and its officers, directors, employees, agents, and licensors from and
                            against any and all claims, liabilities, damages, losses, costs, and
                            expenses (including reasonable legal fees) arising out of or in connection with:
                        </p>
                        <ul className="tos-list">
                            <li>Your breach of any provision of these Terms of Service.</li>
                            <li>Your violation of any applicable law, rule, or regulation.</li>
                            <li>Your use or misuse of the Service.</li>
                            <li>Any content you submit, post, or transmit through the Service.</li>
                            <li>Any third-party claims arising from actions you took based on Service results.</li>
                        </ul>
                    </section>
                    <section className="tos-section" id="termination">
                        <div className="tos-section-header">
                            <div className="tos-section-icon">🚫</div>
                            <div>
                                <span className="tos-section-num">Section 10</span>
                                <h2 className="tos-section-title">Termination</h2>
                            </div>
                        </div>
                        <p>
                            The Company may suspend or permanently terminate your access to the
                            Service at its sole discretion, with or without notice, for any of
                            the following reasons:
                        </p>
                        <ul className="tos-list">
                            <li>Violation of these Terms of Service or our Privacy Policy.</li>
                            <li>Engaging in fraudulent, abusive, or illegal activity through the platform.</li>
                            <li>Non-payment of applicable subscription or service fees.</li>
                            <li>Extended account inactivity (more than 24 months).</li>
                            <li>At the Company's discretion for business, legal, or security reasons.</li>
                        </ul>
                        <p>
                            You may also terminate your account at any time through the account
                            settings panel. Upon termination, your right to access the Service
                            ceases immediately. Provisions of these Terms that, by their nature,
                            should survive termination — including intellectual property rights,
                            limitation of liability, indemnification, and dispute resolution —
                            shall continue in full force.
                        </p>
                    </section>
                    <section className="tos-section" id="changes">
                        <div className="tos-section-header">
                            <div className="tos-section-icon">📋</div>
                            <div>
                                <span className="tos-section-num">Section 11</span>
                                <h2 className="tos-section-title">Changes to Terms</h2>
                            </div>
                        </div>
                        <p>
                            The Company reserves the right to update, modify, or replace these
                            Terms at any time. When material changes are made, we will:
                        </p>
                        <ul className="tos-list">
                            <li>Update the "Last Updated" date at the top of this document.</li>
                            <li>Send an in-app notification to all registered users at least 15 days before changes take effect.</li>
                            <li>For fundamental changes to user rights or dispute resolution, require explicit re-acceptance.</li>
                            <li>Maintain an accessible archive of previous versions on our website.</li>
                        </ul>
                        <p>
                            Continued use of the Service after the effective date of the revised
                            Terms constitutes your binding acceptance of the updated agreement.
                        </p>
                    </section>
                    <section className="tos-section" id="contact">
                        <div className="tos-section-header">
                            <div className="tos-section-icon">📬</div>
                            <div>
                                <span className="tos-section-num">Section 12</span>
                                <h2 className="tos-section-title">Contact & Grievance Officer</h2>
                            </div>
                        </div>
                        <p>
                            In accordance with the Information Technology Act, 2000, and the IT
                            (Intermediary Guidelines and Digital Media Ethics Code) Rules, 2021,
                            we have designated a Grievance Officer for resolving complaints.
                        </p>
                        <div className="tos-contact-grid">
                            <div className="tos-contact-card">
                                <div className="tos-contact-card-title">⚖️ Grievance Officer</div>
                                <div className="tos-contact-row"><span>📧</span><span>grievance@agrisenseai.in</span></div>
                                <div className="tos-contact-row"><span>⏱️</span><span>Responds within 30 days</span></div>
                                <div className="tos-contact-row"><span>🕐</span><span>Mon–Sat, 9 AM–6 PM IST</span></div>
                            </div>
                            <div className="tos-contact-card">
                                <div className="tos-contact-card-title">📬 Legal Department</div>
                                <div className="tos-contact-row"><span>📧</span><span>legal@agrisenseai.in</span></div>
                                <div className="tos-contact-row"><span>📮</span><span>AgriSense AI Pvt. Ltd., India</span></div>
                                <div className="tos-contact-row"><span>⚖️</span><span>Arbitration & litigation matters</span></div>
                            </div>
                        </div>
                        <div className="tos-infobox" style={{ marginTop: "16px" }}>
                            <p>
                                🏛️ <strong>Consumer Disputes:</strong> Users may also approach the
                                National Consumer Disputes Redressal Commission (NCDRC) or the
                                relevant State Commission under the Consumer Protection Act, 2019
                                for consumer grievances.
                            </p>
                        </div>
                    </section>

                </main>
            </div>
            <footer className="tos-footer">
                <p>
                    © 2025 AgriSense AI Pvt. Ltd. · All rights reserved ·{" "}
                    <a href="#">Privacy Policy</a> · <a href="#">Support</a> · <a href="#">Previous Versions</a>
                </p>
                <p style={{ marginTop: "6px" }}>
                    Governed by the laws of India · Serving Indian Farmers · Trained on 125,000+ leaf images
                </p>
            </footer>
        </div>
    );
}