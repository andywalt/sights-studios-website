import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';  // Import Link from react-router-dom

import gsap from 'gsap';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';

import Navbar from '../components/Navbar/navBar';
import LineAnimation from '../components/ServicesSections/LineAnimation.js';

import { ReactComponent as ProjectDiagramIcon } from "../components/ServicesSections/ServicesSVGs/project-diagram.svg"; // import the SVG component
import { ReactComponent as CogsIcon } from "../components/ServicesSections/ServicesSVGs/cogs.svg"; // import the SVG component
import { ReactComponent as UserCogIcon } from "../components/ServicesSections/ServicesSVGs/user-cog.svg"; // import the SVG component
import { ReactComponent as UsersIcon } from "../components/ServicesSections/ServicesSVGs/users.svg"; // import the SVG component
import { ReactComponent as ArrowRightIcon } from "../components/ServicesSections/ServicesSVGs/arrow-right-circle.svg"; // import the SVG component



import '../components/ServicesSections/ServicesPage.css';

// Register the ScrollToPlugin
gsap.registerPlugin(ScrollToPlugin);

const services = [
  {
    title: "Process Mapping",
    description: "Researching, examining, and investigating the current processes and patterns of the team and mapping them out so we can examine where there are inefficiencies and outliers.",
    icon: <ProjectDiagramIcon className="service-icon" />,
    link: "/process-mapping"
  },
  {
    title: "CRM Maximization",
    description: "Evaluating tools and setting them up so that they are integrated and used to their full capacity.",
    icon: <CogsIcon className="service-icon" />,
    link: "/crm-implementation"
  },
  {
    title: "Holistic Integrations",
    description: "Eliminating silos between departments and teams by organizing and integrating proposed plans and efforts.",
    icon: <UserCogIcon className="service-icon" />,
    link: "/holistic-integrations"
  },
  {
    title: "Personnel Development",
    description: "Training and coaching for new processes as well as change management and staff evaluations.",
    icon: <UsersIcon className="service-icon" />,
    link: "/personnel-development"
  }
];
  

const ServicesPage = () => {
  const [animationComplete, setAnimationComplete] = useState(false);
  const lineAnimationRef = useRef(null);
  const contentRef = useRef(null);
  const navbarRef = useRef(null);

  useEffect(() => {
    const hasSeenAnimation = localStorage.getItem('hasSeenAnimation');

    if (hasSeenAnimation) {
      // Skip animation and make sure the content is visible
      setAnimationComplete(true);
      gsap.to(window, {
        duration: 0,
        scrollTo: { y: 0 },
        ease: 'none'
      });
      gsap.to(contentRef.current, {
        duration: 0,
        y: 0,
        opacity: 1,
        ease: 'none',
      });
    } else {
      // Ensure the window is scrolled to the top before animation
      gsap.to(window, {
        duration: 0,
        scrollTo: { y: 0 },
        ease: 'none'
      });
    }
  }, []);

  useEffect(() => {
    if (animationComplete) {
      gsap.to(contentRef.current, {
        duration: 0.5,
        y: 0,
        opacity: 1,
        ease: 'power2.inOut',
        onComplete: () => {
          console.log('Content animation complete');
        }
      });
    }
  }, [animationComplete]);

  const handleAnimationComplete = () => {
    console.log('Line animation complete');
    localStorage.setItem('hasSeenAnimation', 'true');
    setAnimationComplete(true);
  };


  return (
    <div className="services-page">
      <Navbar ref={navbarRef} />
      {!animationComplete && (
        <div ref={lineAnimationRef} className="services-page-top">
          <LineAnimation onComplete={handleAnimationComplete} />
        </div>
      )}
      <div ref={contentRef} className={`services-content ${animationComplete ? 'show' : ''}`}>
        <div className="services-header">
          <h1>Services</h1>
          <p>Providing comprehensive solutions to streamline your business operations and maximize efficiency.</p>
        </div>
        <div className="services-section">
          {services.map((service, index) => (
            <div className="service" key={index}>
              <div className="service-icon-wrapper">
                {service.icon}
              </div>
              <div className="service-content">
                <h2 className="service-title">
                  {service.title}
                  <a href={service.link}><ArrowRightIcon className="service-link" /></a>
                </h2>
                <p>{service.description}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="services-contact-section">
          <h2>Get in Touch</h2>
          <p>If you are interested in any of our services, please contact us for more information.</p>
          <Link to="/contact">
              <button className="cta-button">See the Magic</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ServicesPage;