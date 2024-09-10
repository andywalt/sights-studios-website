import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import './AboutPage.css';

const AboutHeroSection = () => {

  const [showSparkles, setShowSparkles] = useState(false);

  const handleMagicClick = () => {
    setShowSparkles(true);
  };

  return (
    <div className="about-hero-section">
      <div className="about-hero-content">
      <h1>“You are never too old to set another goal or to dream a new dream.”</h1>
        <p>- C.S. Lewis</p>
      </div>
      
      <div className="about-hero-image">
        <div className="green-overlay"></div>
        <img src={`${process.env.PUBLIC_URL}/photos/spyglass-kid.webp`} alt="Vision and Innovation" />
      </div>

      <div className='magic-definition'>
        <h2>What is <span className="magic-phrase" onClick={handleMagicClick}>"<span className={`magic-word ${showSparkles ? 'sparkles' : ''}`}>magic</span>"</span>?</h2>
        <p>
          We believe that <span className="magic-phrase" onClick={handleMagicClick}>"<span className={`magic-word ${showSparkles ? 'sparkles' : ''}`}>magic</span>"</span> is the feeling when something truly remarkable happens. 
          Whether super or natural (or super natural), it's the moment of wonder that brings excitement and 
          an opportunity to dream of what better can be.
        </p>
        <Link to="/contact">
          <button className="cta-button">See the Magic</button>
        </Link>
      </div>

    </div>
  );
};

export default AboutHeroSection;
