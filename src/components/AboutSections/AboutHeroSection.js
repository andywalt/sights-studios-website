import React from 'react';
import './AboutPage.css';

const AboutHeroSection = () => {
  return (
    <div className="about-hero-section">
      <div className="about-hero-content">
      <h1>“You are never too old to set another goal or to dream a new dream.”</h1>
        <p>- C.S. Lewis</p>
        <button className="cta-button">See the Magic</button>
      </div>
      <div className="about-hero-image">
        <div className="green-overlay"></div>
        <img src={`${process.env.PUBLIC_URL}/photos/spyglass-kid.jpg`} alt="Vision and Innovation" />
      </div>
    </div>
  );
};

export default AboutHeroSection;
