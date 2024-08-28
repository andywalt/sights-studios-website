import React from 'react';
import Navbar from "../components/Navbar/navBar";
import AboutHeroSection from '../components/AboutSections/AboutHeroSection';
import ValuesSection from '../components/AboutSections/ValuesSection';
import AboutMeSection from '../components/AboutSections/AboutMeSection';

import "../components/AboutSections/AboutPage.css";

const AboutPage = () => {
  return (
    <div className="about-page">
      <Navbar />
      <AboutHeroSection />      
      <ValuesSection />
      <AboutMeSection />
    </div>
  );
};

export default AboutPage;
