import React, { useState, useEffect, forwardRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import '../Navbar/navBar.css';

gsap.registerPlugin(ScrollTrigger);

const Navbar = forwardRef((props, ref) => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    if (location.pathname === '/') {  // Only apply the scroll logic for the homepage
      if (window.innerWidth > 768) {  // Apply scrollTrigger only for desktop devices

        // Initially hide the navbar on load
        gsap.set('.navbar', { opacity: 0, y: -100 });

        let navbarRevealed = false;  // Track if the navbar has been revealed

        // ScrollTrigger to show navbar on scroll
        const scrollTriggerInstance = ScrollTrigger.create({
          trigger: ".hero-name-highlight",
          start: "top 20%",
          end: "bottom 30%",
          scrub: true,
          onEnter: () => {
            if (!navbarRevealed) {
              gsap.to('.navbar', { opacity: 1, y: 0, duration: 0.5 });
              navbarRevealed = true;  // Mark as revealed so it won't hide again
            }
          }
        });

        // Timeout to reveal navbar after 8 seconds
        const timer = setTimeout(() => {
          if (!navbarRevealed) {
            gsap.to('.navbar', { opacity: 1, y: 0, duration: 0.5 });
            navbarRevealed = true;  // Mark as revealed by timer
          }
        }, 8000);

        // Cleanup ScrollTrigger and timer on component unmount
        return () => {
          clearTimeout(timer);
          scrollTriggerInstance.kill();
        };

      } else {
        // Always show navbar on mobile
        gsap.to('.navbar', { opacity: 1, y: 0 });
      }
    } else {
      // Ensure navbar is visible on all other pages
      gsap.set('.navbar', { opacity: 1, y: 0 });
    }
  }, [location.pathname]);

  return (
    <div>
      <div className={`navbar-toggle ${isOpen ? 'navbar-active' : ''}`} id="mobile-menu" onClick={toggleNavbar}>
        <span className="bar"></span>
        <span className="bar"></span>
        <span className="bar"></span>
      </div>

      <nav className={`navbar ${isOpen ? 'navbar-active' : ''}`} ref={ref}>
        <Link to="/">
          <img src={"/photos/sightsstudioslogo.webp"} alt="sights studios logo" id="ss-logo" type="image/webp" />
        </Link>
        <ul className={`navbar-links ${isOpen ? 'navbar-active' : ''}`}>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/about">About</Link></li>
          <li><Link to="/services">Services</Link></li>
          <li><Link to="/contact">Contact</Link></li>
        </ul>
      </nav>
    </div>
  );
});

export default Navbar;
