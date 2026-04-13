import "./HowItWorks.css";
function HowItWorks() {
  return (
    <section className="how-section">
      <div className="container"> {/* Added standard container for max-width alignment */}
        <h2 className="how-title">HOW WE WORK</h2>
        <div className="how-wrapper">
          <div className="how-card">
            <span className="bg-number">01</span>
            <div className="icon-box">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="17 8 12 3 7 8" />
                <line x1="12" y1="3" x2="12" y2="15" />
              </svg>
            </div>
            <h3>Upload Leaf Image</h3>
            <p>Capture and upload up to 4 clear plant leaf images for the best analysis.</p>
          </div>
          <div className="connector"></div>
          <div className="how-card active">
            <span className="bg-number">02</span>
            <div className="icon-box">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="3" />
                <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
              </svg>
            </div>
            <h3>AI Verification & Analysis</h3>
            <p>First, the AI verifies it is a valid leaf. Then, it diagnoses diseases using a model trained on 5,000+ leaves per category.</p>
          </div>
          <div className="connector"></div>
          <div className="how-card">
            <span className="bg-number">03</span>
            <div className="icon-box">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </div>
            <h3>Get Results</h3>
            <p>Receive an instant, highly accurate diagnosis and treatment plan in English or Hindi.</p>
          </div>

        </div>
      </div>
    </section>
  );
}
export default HowItWorks;