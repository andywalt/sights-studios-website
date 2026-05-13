import React from 'react';
import Navbar from "../components/Navbar/navBar.js";
import HeroSection from '../components/HomeSections/HeroSection/heroSection';
import AIRescueSection from '../components/HomeSections/AIRescueSection/AIRescueSection';
import FeatureSection from '../components/HomeSections/FeatureSection/featureSection';
import CardCarousel from "../components/CardCarousel/CardCarousel.js";
import ContactSection from "../components/HomeSections/ContactSection/ContactSection.js";

function HomePage() {
  return (
    <div className="HomePage">
      <Navbar />
      <HeroSection />
      <AIRescueSection />
      <FeatureSection />
      <CardCarousel />
      <ContactSection />
    </div>
  );
}

export default HomePage;
