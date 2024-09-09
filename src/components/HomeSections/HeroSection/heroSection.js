import React from 'react';
import './heroSection.css';

import { Link } from 'react-router-dom';

import CircleAnimation from '../../CircleAnimation/CircleAnimation';

import gsap from "gsap";
import { ScrollTrigger } from 'gsap/ScrollTrigger';


gsap.registerPlugin(ScrollTrigger);



const HeroSection = () => {

  return (
    <div className="hero-section">
      <div className="hero-content">
        <h1 id="sights-studios-name" className="hero-name-highlight">
          Sights Studios
          <div className="aurora">
            <div className="aurora_item"></div>
            <div className="aurora_item"></div>
            <div className="aurora_item"></div>
            <div className="aurora_item"></div>
          </div>
        </h1>
        <Link to="/contact">
          <button className="cta-button">Find the Magic</button>
        </Link>
      </div>
      <CircleAnimation />
    </div>
  );
};

export default HeroSection;
