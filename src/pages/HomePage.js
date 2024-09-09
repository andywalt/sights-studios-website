import React from 'react';
import Navbar from "../components/Navbar/navBar.js";
import HeroSection from '../components/HomeSections/HeroSection/heroSection';
import CardCarousel from "../components/CardCarousel/CardCarousel.js";
import FeatureSection from '../components/HomeSections/FeatureSection/featureSection';
import ContactSection from "../components/HomeSections/ContactSection/ContactSection.js";

function HomePage() {
  return (
    <div className="HomePage">
      <Navbar />
      <HeroSection />
      <FeatureSection />
      <CardCarousel />
      <ContactSection />
    </div>
  );
};

export default HomePage;