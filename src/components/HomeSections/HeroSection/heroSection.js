import React, { useEffect } from 'react';
import './heroSection.css';

import { Link } from 'react-router-dom';

import CircleAnimation from '../../CircleAnimation/CircleAnimation';

import gsap from "gsap";
import { ScrollTrigger } from 'gsap/ScrollTrigger';


gsap.registerPlugin(ScrollTrigger);



const HeroSection = () => {

  useEffect(() => {
    let mm = gsap.matchMedia();

    mm.add({isMobile: "(max-width: 768px)", isDesktop: "(min-width: 769px)"}, (context) => {
      let {isMobile, isDesktop} = context.conditions;

      if (isMobile) {
        gsap.to('.hero-caption', {
          color: "#D49D42",
          scrollTrigger: {
            trigger: '.hero-caption',
            start: 'top 35%',
            end: 'top 40%',
            scrub: true,
          },
        });
      }

      if (isDesktop) {
        gsap.to('.hero-caption', {
          color: "#D49D42",
          scrollTrigger: {
            trigger: '.hero-caption',
            start: 'top 40%',
            end: 'top 50%',
            scrub: true,
          },
        });
      }
    });

    return () => mm.revert(); // clean up

  }, []);

  return (
    <div className="hero-section">
      <div className="hero-content">
        <h1 id="sights-studios-name" className='hero-name-highlight'>Sights Studios</h1>
        <h3 className="hero-caption">Transforming your organization with advanced solutions.</h3>
        <Link to="/contact">
          <button className="cta-button">See the Magic</button>
        </Link>
      </div>
      <CircleAnimation />
    </div>
  );
};

export default HeroSection;
