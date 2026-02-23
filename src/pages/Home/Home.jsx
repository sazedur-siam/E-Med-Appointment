import AboutSection from "../../component/AboutSection";
import HeroSection from "../../component/HeroSection";
import TopDoctorsSection from "../../component/TopDoctorsSection";
import Footer from "../../shared/Footer/Footer";

const Home = () => {
  return (
    <div className="min-h-screen">
      <HeroSection />
      <TopDoctorsSection />
      <AboutSection />
      <Footer />
    </div>
  );
};

export default Home;
