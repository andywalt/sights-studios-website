import React, { useEffect } from 'react';
import gsap from 'gsap';
import './CircleAnimation.css';

const CircleAnimation = () => {
  useEffect(() => {
    const tl = gsap.timeline();

    // Animate circles
    tl.to("#circle1", { duration: 1, opacity: 1, ease: "power1.inOut" })
      .to("#circle2", { duration: 0.5, opacity: 1, ease: "power1.inOut" })
      .to("#circle3", { duration: 0.5, opacity: 1, ease: "power1.inOut" })
      .to("#circle4", { duration: 0.5, opacity: 1, ease: "power1.inOut" })

      // Animate dot
      .to("#dot", { duration: 0.5, display: "block", x: "0px", y: "0px", ease: "power1.inOut" })

      // Animate lines and dot
      .to("#line1", {
        duration: 1,
        attr: { x2: "250px" },
        ease: "power1.inOut",
        opacity: 1, // Animate opacity to make the line visible
      })
      .to("#dot", { duration: 0.5, x: "200px", ease: "power1.inOut" }, "-=0.5") 
      .to("#line2", {
        duration: 1,
        attr: { x2: "450px" },
        ease: "power1.inOut",
        opacity: 1, // Animate opacity to make the line visible
      })
      .to("#dot", { duration: 0.5, x: "400px", ease: "power1.inOut" }, "-=0.5")
      .to("#line3", {
        duration: 1,
        attr: { x2: "650px" },
        ease: "power1.inOut",
        opacity: 1, // Animate opacity to make the line visible
      })
      .to("#dot", { duration: 0.5, x: "600px", ease: "power1.inOut" }, "-=0.5")
      .to("#dot", {
        duration: 0.5,
        width: "100px",
        height: "100px",
        x: "558px",
        y: "0px",
        backgroundColor: "#FAF9F6",
        ease: "power1.inOut",
      })

      // Animate dot back to the first circle and erase lines and circles
      .to("#dot", { duration: 1, x: "125px", width: "450px", borderRadius: "5px", ease: "power1.inOut" })
      /* .to("#dot", { duration: 0.5, width: "20px", height: "20px", backgroundColor: "forestgreen", ease: "power1.inOut" }) */
      .to("#line1, #line2, #line3", { duration: 1, opacity: 0, ease: "power1.inOut" }, "-=1")
      .to(".circle", { duration: 1, opacity: 0, ease: "power1.inOut" }, "-=1")
      
      // Expand dot and reveal "Sights Studios"
      .to("#dot", { duration: 1, ease: "power1.inOut", opacity: 0 })
      .to("#sights-studios", { duration: 1, opacity: 1, ease: "power1.inOut" }, "-=1.5");
  }, []);

  return (
    <div className="animation-container">
      <div className="circle" id="circle1"></div>
      <div className="circle" id="circle2"></div>
      <div className="circle" id="circle3"></div>
      <div className="circle" id="circle4"></div>
      <div className="dot" id="dot"></div>
      <svg id="line-container">
        <line id="line1" x1="50" y1="50" x2="0" y2="50" opacity="0" />
        <line id="line2" x1="215" y1="50" x2="165" y2="50" opacity="0" />
        <line id="line3" x1="415" y1="50" x2="365" y2="50" opacity="0" />
      </svg>
      <h1 id="sights-studios" className="hidden-text">Where Excellence & Efficiency Meet</h1>
    </div>
  );
};

export default CircleAnimation;
