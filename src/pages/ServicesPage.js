import React, { useState, useRef, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';  // Import Link and useLocation
import gsap from 'gsap';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';

import Navbar from '../components/Navbar/navBar';
import LineAnimation from '../components/ServicesSections/LineAnimation.js';
import PartnersBanner from "../components/ServicesSections/ServicesBanner/PartnersBanner.js";

import { ReactComponent as ProjectDiagramIcon } from "../components/ServicesSections/ServicesSVGs/project-diagram.svg";
import { ReactComponent as CogsIcon } from "../components/ServicesSections/ServicesSVGs/cogs.svg";
import { ReactComponent as UserCogIcon } from "../components/ServicesSections/ServicesSVGs/user-cog.svg";
import { ReactComponent as UsersIcon } from "../components/ServicesSections/ServicesSVGs/user-group-solid.svg";
import { ReactComponent as ArrowRightIcon } from "../components/ServicesSections/ServicesSVGs/arrow-right-circle.svg";

import '../components/ServicesSections/ServicesPage.css';

// Register the ScrollToPlugin
gsap.registerPlugin(ScrollToPlugin);

const services = [
  {
    title: "Process Mapping",
    description: "We deep-dive into your existing workflows and systems, identifying bottlenecks, inefficiencies, and hidden opportunities. By mapping out your processes, we develop streamlined strategies that cut costs, boost productivity, and improve operational clarity.",
    icon: <ProjectDiagramIcon className="service-icon" />,
    value: "Teams report a 20% increase in workflow efficiency after our process mapping services.",
    link: "/coming-soon"
  },
  {
    title: "CRM Maximization",
    description: "We assess, implement, and optimize your CRM to transform how you manage client relationships. Our goal is to leverage the full power of your CRM, ensuring it drives sales, improves customer retention, and provides critical insights for strategic decision-making.",
    icon: <CogsIcon className="service-icon" />,
    value: "Clients typically experience a 15% increase in customer retention within six months of CRM optimization.",
    link: "/coming-soon"
  },
  {
    title: "Holistic Integrations",
    description: "Our integration experts break down departmental silos, ensuring seamless communication and collaboration across your organization. By aligning tools, teams, and strategies, we drive unified efforts that lead to accelerated growth and increased agility.",
    icon: <UserCogIcon className="service-icon" />,
    value: "Our integration solutions decrease team misalignment issues by 25%, leading to smoother operations.",
    link: "/coming-soon"
  },
  {
    title: "Personnel Development",
    description: "We offer tailored training and coaching programs designed to enhance team efficiency and foster leadership growth. Our focus is on strengthening communication, improving workflows, and ensuring a smooth transition during periods of change, so your team is prepared to tackle new challenges and thrive.",
    icon: <UsersIcon className="service-icon" />,
    value: "Companies see a 30% increase in team productivity after personnel development workshops.",
    link: "/coming-soon"
  }
];

const ServicesPage = () => {
  const [animationComplete, setAnimationComplete] = useState(false);
  const contentRef = useRef(null);
  const navbarRef = useRef(null); 
  const location = useLocation();  // Get location to detect route changes

  useEffect(() => {
    // Scroll to the top of the page when the component is mounted or location changes
    gsap.to(window, {
      duration: 0,
      scrollTo: { y: 0 },
      ease: 'none'
    });

    const hasSeenAnimation = localStorage.getItem('hasSeenAnimation');
  
    if (hasSeenAnimation) {
      // Skip animation and scroll directly to the navbar
      setAnimationComplete(true);
      setTimeout(() => {
        gsap.to(window, {
          duration: 0,
          scrollTo: { y: navbarRef.current.offsetTop, autoKill: false }, // Scroll to navbar
          ease: 'none'
        });
      }, 100); // Add a delay (100ms)
      
      gsap.to(contentRef.current, {
        duration: 0,
        y: 0,
        opacity: 1,
        ease: 'none',
      });
    } else {
      gsap.to(document.documentElement, {
        duration: 0,
        scrollTo: { y: 0 },
        ease: 'none'
      });
    }
  }, [location]);  // Re-run the scroll effect whenever the location changes (important!)

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

    // After animation completes, scroll to the navbar position
    gsap.to(window, {
      duration: 1,
      scrollTo: { y: navbarRef.current.offsetTop, autoKill: false },
      ease: 'power2.inOut'
    });
  };

  const handleResetAnimation = () => {
    // Remove the flag from localStorage and reset state
    localStorage.removeItem('hasSeenAnimation');
    setAnimationComplete(false);

    // Scroll back to the top of the page and restart the animation
    gsap.to(window, {
      duration: 0,
      scrollTo: { y: 0 }, 
      ease: 'none'
    });
  };

  return (
    <div className="services-page">
      <Navbar ref={navbarRef} />
      {!animationComplete && (
        <div className="services-page-top">
          <LineAnimation onComplete={handleAnimationComplete} />
        </div>
      )}
      <div ref={contentRef} className={`services-content ${animationComplete ? 'show' : ''}`}>

        <div className="services-header">
          <h1>Services</h1>
          <p>Providing comprehensive solutions to streamline your business operations and maximize efficiency.</p>
           {/* "Tell the Story Again" Button */}
            {animationComplete && (
              <div className="tell-story-again">
                <button 
                  className="cta-button" 
                  onClick={() => {
                    handleResetAnimation();
                    gsap.to(window, { duration: 1, scrollTo: { y: 0 }, ease: 'power2.inOut' }); // Scroll to top on click
                  }}
                >
                  Tell the Story Again
                </button>
              </div>
            )}
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
                  <Link to={service.link}>
                    <ArrowRightIcon className="service-link" />
                  </Link>
                </h2>
                <p>{service.description}</p>
                <p className='service-value'>{service.value}</p>
              </div>
            </div>
          ))}
        </div>

        <PartnersBanner />

        <div className="services-contact-section">
          <h2>Get in Touch</h2>
          <p>If you are interested in any of our services, please contact us for more information.</p>
          <Link to="/contact">
            <button className="cta-button">Find the Magic</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ServicesPage;
