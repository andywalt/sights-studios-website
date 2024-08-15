import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { gsap } from "gsap";
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import '../Navbar/navBar.css';

gsap.registerPlugin(ScrollTrigger);

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    if (location.pathname === '/') {  // Apply ScrollTrigger for homepage only
      if (window.innerWidth > 768) {  // Apply ScrollTrigger for desktop only

        // ScrollTrigger animation for desktop
        gsap.fromTo(".navbar", {
          opacity: 0,
          y: -100,
        }, {
          opacity: 1,
          y: 0,
          scrollTrigger: {
            trigger: ".hero-name-highlight",
            start: "top 20%",
            end: "bottom 30%",
            scrub: true,
          },
        });

        // Timeout to reveal navbar after 4 seconds
        const timer = setTimeout(() => {
          gsap.to(".navbar", { opacity: 1, y: 0 });
        }, 8000);

        // Cleanup the timer
        return () => clearTimeout(timer);

      } else {
        gsap.to(".navbar", { opacity: 1, y: 0 });  // Ensure navbar is visible on mobile
      }
    } else {
      gsap.set(".navbar", { opacity: 1, y: 0 });  // Ensure navbar is visible on other pages
    }
  }, [location.pathname]);
  

  return (
    <nav className="navbar">
      <Link to="/">
        <img src={`${process.env.PUBLIC_URL}/photos/sightsstudioslogo-5-best.png`} alt="sights studios logo" />
      </Link>
      <ul className={`navbar-links ${isOpen ? 'navbar-active' : ''}`}>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/about">About</Link></li>
        <li><Link to="/services">Services</Link></li>
        <li><Link to="/contact">Contact</Link></li>
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
