import Features from "./components/Features";
import Footer from "./components/Footer";
import Hero from "./components/Hero";
import LandingNavbar from "@/components/navigation/LandingNavbar";
import Pricing from "./components/Pricing";

const Home: React.FC = () => {
  return (
    <>
      <LandingNavbar />
      <Hero />
      <Features />
      <Pricing />
      <Footer />
    </>
  );
};

export default Home;