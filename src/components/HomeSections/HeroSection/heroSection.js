import React from 'react';
import './heroSection.css';
import CircleAnimation from '../../CircleAnimation/CircleAnimation';


const HeroSection = () => {
  return (
    <div className="hero-section">
      <div className="hero-content">
        <h1 id="sights-studios-name" className='hero-name-highlight'>Sights Studios</h1>
        <h3 className="hero-caption">Transforming businesses with AI-driven solutions.</h3>
        <button className="cta-button">See the Magic</button>
      </div>
      <div className="hero-image">
        <CircleAnimation />
      </div>
    </div>
  );
};

export default HeroSection;
