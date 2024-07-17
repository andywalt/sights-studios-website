import React, { useState, useEffect } from 'react';
import { gsap } from "gsap";
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import '../Navbar/navBar.css';

gsap.registerPlugin(ScrollTrigger);

const Navbar = () => {

  const [isOpen, setIsOpen] = useState(false);

  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    if (window.innerWidth > 768) {  // Apply ScrollTrigger for desktop only
      gsap.fromTo(".navbar", {
        opacity: 0,
        y: -100,
      }, {
        opacity: 1,
        y: 0,
        scrollTrigger: {
          trigger: ".hero-section",
          start: "bottom bottom",
          end: "bottom top",
          scrub: true,
        },
      });
    } else {
      gsap.to(".navbar", { opacity: 1, y: 0 });  // Ensure navbar is visible on mobile
    }
  }, []);
  

  return (
    <nav className="navbar">
      <img src={`${process.env.PUBLIC_URL}/photos/sightsstudioslogo-5-best.png`} alt="sights studios logo" />
      <ul className={`navbar-links ${isOpen ? 'navbar-active' : ''}`}>
        <li><a href="#home">Home</a></li>
        <li><a href="#about">About</a></li>
        <li><a href="#services">Services</a></li>
        <li><a href="#contact">Contact</a></li>
      </ul>
      <div className="navbar-toggle" id="mobile-menu" onClick={toggleNavbar}>
        <span className="bar"></span>
        <span className="bar"></span>
        <span className="bar"></span>
      </div>
    </nav>
  );
};

export default Navbar;
