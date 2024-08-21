import React from 'react';
import Navbar from "../components/Navbar/navBar";
import AboutHeroSection from '../components/AboutSections/AboutHeroSection';
import ValuesSection from '../components/AboutSections/ValuesSection';
import AboutMeSection from '../components/AboutSections/AboutMeSection';
import Footer from '../components/HomeSections/FooterSection/footer';

import "../components/AboutSections/AboutPage.css";

const AboutPage = () => {
  return (
    <div className="about-page">
      <Navbar />
      <AboutHeroSection />      
      <ValuesSection />
      <AboutMeSection />
      <Footer />
    </div>
  );
};

export default AboutPage;
