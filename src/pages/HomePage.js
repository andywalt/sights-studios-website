import React from 'react';
import HeroSection from '../components/HomeSections/HeroSection/heroSection';
import FeatureSection from '../components/HomeSections/FeatureSection/featureSection';
import ClientLogos from '../components/HomeSections/ClientLogosSection/clientLogos';
import Footer from '../components/HomeSections/FooterSection/footer';
import CardCarousel from '../components/CardCarousel/CardCarousel';

function HomePage() {
  return (
    <div className="HomePage">
      <HeroSection />
      <CardCarousel />
      <FeatureSection />
      <ClientLogos />
      <Footer />
    </div>
  );
};

export default HomePage;