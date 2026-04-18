import Navbar from "../components/navbar";
import Footer from "../components/Footer";
import Hero from "../components/Section-1/Hero";
import HowItWorks from "../components/Section-2/HowItWorks";
import DetectionLab from "../components/Section-3/DetectionLab";
const Layout = () => {
  return (
    <>
      <Navbar />
      <Hero />
      <HowItWorks />
      <DetectionLab />
      <Footer />
    </>
  );
};

export default Layout;