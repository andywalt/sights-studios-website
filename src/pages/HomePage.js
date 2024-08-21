import React from 'react';
import Navbar from "../components/Navbar/navBar.js";
import HeroSection from '../components/HomeSections/HeroSection/heroSection';
import FeatureSection from '../components/HomeSections/FeatureSection/featureSection';
import ContactSection from "../components/HomeSections/ContactSection/ContactSection.js";
import Footer from '../components/HomeSections/FooterSection/footer';
// import CardCarousel from '../components/CardCarousel/CardCarousel';

function HomePage() {
  return (
    <div className="HomePage">
      <Navbar />
      <HeroSection />
      <FeatureSection />
      {/* <CardCarousel /> */}
      <ContactSection />
      <Footer />
    </div>
  );
};

export default HomePage;