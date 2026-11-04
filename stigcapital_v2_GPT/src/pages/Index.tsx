import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import RocketSection from "@/components/RocketSection";
import About from "@/components/About";
import AboutStigSection from "@/components/AboutStigSection";
import LightTransitionSection from "@/components/LightTransitionSection";
import Services from "@/components/Services";
import GrowthPath from "@/components/GrowthPath";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      <Hero />
      <About />
      <RocketSection />
      <Services />
      <AboutStigSection />
      <LightTransitionSection />
      <GrowthPath />
      <Contact />
      <Footer />
    </div>
  );
};

export default Index;
