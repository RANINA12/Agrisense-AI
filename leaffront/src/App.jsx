import React, { Suspense, lazy } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Layout from "./layout/Layout";
import Register from "./pages/Register";
import Login from "./pages/Login";
import ResultPage from "./components/Section-3/ResultPage";
import PrivacyPolicy from "./components/Section-4/PrivacyPolicy";
import TermsOfService from "./components/Section-4/TermsOfService";
import About from "./components/Section-4/About";
import Services from "./components/Section-4/Services";
import Help from "./components/Section-4/Help";
import FeedBack from "./components/Section-3/Feedback"
import FeedBackHistory from "./components/Feature/FeedbackHistory"
import DetailedHistory from "./components/Feature/DetailedHistory"
import History from "./components/Feature/History";

// const Dashboard = lazy(() => import("./pages/Dashboard"));

function App() {
  return (
    <BrowserRouter>
      <Suspense
        fallback={
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh',
            color: 'var(--accent-main)',
            fontFamily: 'var(--font-professional)'
          }}>
            <h2>Loading AgriSense AI...</h2>
          </div>
        }
      >
        <Routes>

          <Route path="/" element={<Layout />}>
          </Route>

          <Route path="/AgriSenseAI/register" element={<Register />} />
          <Route path="/AgriSenseAI/login" element={<Login />} />
          <Route path="/AgriSenseAI/scans/:scan_id/analyzedResult" element={<ResultPage />} />

          <Route path="/AgriSenseAI/scans/:scan_id/feedback" element={<FeedBack />} />
          <Route path="/AgriSenseAI/feedback" element={<FeedBackHistory />} />
          <Route path="/AgriSenseAI/scan/:scan_id" element={<DetailedHistory />} />
          <Route path="/AgrisenseAI/getAllScan" element={<History />} />


          <Route path="/AgriSenseAI/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/AgriSenseAI/terms-of-service" element={<TermsOfService />} />

          <Route path="/AgriSenseAI/about" element={<About />} />
          <Route path="/AgriSenseAI/services" element={<Services />} />
          <Route path="/AgriSenseAI/help" element={<Help />} />

        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;