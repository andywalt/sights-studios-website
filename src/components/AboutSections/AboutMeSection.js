import React from 'react';
import { Link } from 'react-router-dom';

import './AboutPage.css';

const AboutMeSection = () => {
  return (
    <div className="about-me-section">
      <div className="about-me-content">
        <div className="about-me-image">
          <img src={`${process.env.PUBLIC_URL}/photos/Andy-headshot-professional-square.jpeg`} alt="Andy Walters Headshot" />
        </div>
        <div className="about-me-text">
          <h3>Founder, President, Director, Nerd</h3>
          <h2>Andy Walters</h2>
          <h3>Professional Background</h3>
          <p>An experienced consultant with a background in AI-driven solutions, business efficiencies, and innovation strategies. Known for driving growth and improving processes across various industries.</p>
          <p>I'm an avid golfer and love the process of getting better and pursuing greatness while also managing perfectionism and bad breaks.</p>
        </div>
      </div>
      <Link to="/contact">
          <button className="cta-button">See the Magic</button>
        </Link>
    </div>
  );
};

export default AboutMeSection;
