// import "./HowItWorks.css";


// function HowItWorks() {
  
//   return (
//     <section className="how-section">
//       <h2 className="how-title">HOW WE WORK</h2>

//       <div className="how-wrapper">

//         <div className="how-card reveal">
//           <span className="bg-number">01</span>

//           <div className="icon-box">
//             <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
//               <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
//               <polyline points="17 8 12 3 7 8"/>
//               <line x1="12" y1="3" x2="12" y2="15"/>
//             </svg>
//           </div>

//           <h3>Upload Leaf Image</h3>
//           <p>Capture and upload a clear leaf image for analysis.</p>
//         </div>

//         <div className="how-card active">
//           <span className="bg-number">02</span>

//           <div className="icon-box">
            
//             <svg
//     viewBox="0 0 24 24"
//     fill="none"
//     stroke="#00ff88"
//     strokeWidth="1.5"
//     strokeLinecap="round"
//     strokeLinejoin="round"
//   >
//     <circle cx="12" cy="12" r="3" />
//     <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"/>
//   </svg>
//           </div>

//           <h3>AI Analysis</h3>
//           <p>Our AI model scans and detects possible plant diseases.</p>
//         </div>

//         <div className="how-card">
//           <span className="bg-number">03</span>

//           <div className="icon-box">
//             <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
//               <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>
//             </svg>
//           </div>

//           <h3>Get Results</h3>
//           <p>Receive instant, accurate diagnosis and suggestions.</p>
//         </div>

//         <div className="timeline-line"></div>

//       </div>
//     </section>
//   );
// }

// export default HowItWorks;

import "./HowItWorks.css";
import { useNavigate } from "react-router-dom";
import { isLoggedIn } from "../../utils/auth";


function HowItWorks() {

  return (
    <section className="how-section">
      <h2 className="how-title">HOW WE WORK</h2>


      <div className="how-wrapper">

        <div className="how-card ">
          <span className="bg-number">01</span>

          <div className="icon-box">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
              <polyline points="17 8 12 3 7 8"/>
              <line x1="12" y1="3" x2="12" y2="15"/>
            </svg>
          </div>

          <h3>Upload Leaf Image</h3>
          <p>Capture and upload a clear leaf image for analysis.</p>
        </div>



        <div className="connector"></div> 



        <div className="how-card active">
          <span className="bg-number">02</span>

          <div className="icon-box">
            
            <svg viewBox="0 0 24 24" fill="none" stroke="#00ff88" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="3" />
    <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"/>
    
  </svg>
          </div>

          <h3>AI Analysis</h3>
          <p>Our AI model scans and detects possible plant diseases.</p>
        </div>


    <div className="connector"></div> 


    
        <div className="how-card">
          <span className="bg-number">03</span>

          <div className="icon-box">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
              {/* <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/> */}
              <polyline points="20 6 9 17 4 12"/>
            </svg>
          </div>

          <h3>Get Results</h3>
          <p>Receive instant, accurate diagnosis and suggestions.</p>
        </div>

        <div className="timeline-line"></div>

      </div>
    </section>
  );
}

export default HowItWorks;