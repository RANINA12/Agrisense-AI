import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Hero from "../components/Section-1/Hero";
import HowItWorks from "../components/Section-2/HowItWorks";
import DetectionLab from "../components/Section-3/DetectionLab";
import ServicesShowcase from "../components/Section-4/ServicesShowcase";

import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <>
      <Navbar />
      <Hero/>
      <HowItWorks/>
      <DetectionLab/>
      <ServicesShowcase/>
      <Outlet />   {/* THIS IS VERY IMPORTANT */}
      <Footer />
    </>
  );
};

export default Layout;

// import Navbar from "../components/Navbar";
// import Footer from "../components/Footer";
// import { Outlet } from "react-router-dom";

// const Layout = () => {
//   return (
//     <>
//       <h1>Layout is loading</h1>
//       <Outlet />
//     </>
//   );
// };

// export default Layout;