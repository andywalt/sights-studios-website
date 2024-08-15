import React, { useEffect, useState } from 'react';
import gsap from 'gsap';

import './CircleAnimation.css';

const CircleAnimation = () => {
  const [centers, setCenters] = useState({
    center1: { centerX: 0, centerY: 0 },
    center2: { centerX: 0, centerY: 0 },
    center3: { centerX: 0, centerY: 0 },
    center4: { centerX: 0, centerY: 0 },
  });

  const calculateCenter = (elementId) => {
    const element = document.getElementById(elementId);
    const container = document.querySelector('.circle-wrapper');
    const rect = element.getBoundingClientRect();
    const containerRect = container.getBoundingClientRect();

    const centerX = rect.left + rect.width / 2 - containerRect.left;
    const centerY = rect.top + rect.height / 2 - containerRect.top;

    console.log(`Center of ${elementId}: (${centerX}, ${centerY})`);

    return { centerX, centerY, width: rect.width, height: rect.height };
  };

  const updatePositions = () => {

    const newCenters = {
      center1: calculateCenter('circle1'),
      center2: calculateCenter('circle2'),
      center3: calculateCenter('circle3'),
      center4: calculateCenter('circle4'),
    };
    setCenters(newCenters);
    
    const circles = document.querySelectorAll('.circle');
    const svg = document.getElementById('line-container');
    const svgRect = svg.getBoundingClientRect();

    circles.forEach((circle, index) => {
      const rect = circle.getBoundingClientRect();
      const centerX = ((rect.left + rect.width / 2) - svgRect.left) / svgRect.width * 100;
      
      const line = document.getElementById(`line${index + 1}`);
      if (line) {
        line.setAttribute('x1', `${centerX}%`);
        line.setAttribute('x2', `${centerX}%`);
      }
    });

    const center1 = calculateCenter('circle1');
    const center2 = calculateCenter('circle2');
    const center3 = calculateCenter('circle3');
    const center4 = calculateCenter('circle4');
    const dot = document.getElementById('dot');
    const dotSize = dot.offsetWidth; // get current dot size

    // Reset dot position and make it visible
    gsap.set(dot, {
      x: newCenters.center1.centerX - dotSize / 2,
      y: newCenters.center1.centerY - dotSize / 2,
      display: 'block',
    });

    // Start GSAP animation
    const tl = gsap.timeline();

    // Move to first circle (already there, but this sets up the animation)
    tl.to(dot, {
      duration: 0.5,
      x: newCenters.center1.centerX - dotSize / 2,
      y: newCenters.center1.centerY - dotSize / 2,
      ease: "power1.inOut",
    })
    .call(() => {
        console.log('Dot moved to circle 1');
    })
    

    // Move to second circle and draw first line
    .to(dot, {
      duration: 1,
      x: newCenters.center2.centerX - dotSize / 2,
      y: newCenters.center2.centerY - dotSize / 2,
      ease: "power1.inOut",
    }, "line1")

    .call(() => {
      console.log('Dot moved to circle 2.')
    })
    

    .to("#line1", {
      duration: 1,
      attr: { x2: `${newCenters.center2.centerX}px`, y2: `${newCenters.center2.centerY}px` },
      ease: "power1.inOut",
    }, "line1")

    .call(() => {
        console.log('Line 1 drawn to circle 2');
    })

    // Move to third circle and draw second line
    .to(dot, {
      duration: 1,
      x: newCenters.center3.centerX - dotSize / 2,
      y: newCenters.center3.centerY - dotSize / 2,
      ease: "power1.inOut",
    }, "line2")
    .to("#line2", {
      duration: 1,
      attr: { x2: `${newCenters.center3.centerX}px`, y2: `${newCenters.center3.centerY}px` },
      ease: "power1.inOut",
    }, "line2")

    // Move to fourth circle and draw third line
    .to(dot, {
      duration: 1,
      x: newCenters.center4.centerX - dotSize / 2,
      y: newCenters.center4.centerY - dotSize / 2,
      ease: "power1.inOut",
    }, "line3")
    .to("#line3", {
      duration: 1,
      attr: { x2: `${newCenters.center4.centerX}px`, y2: `${newCenters.center4.centerY}px` },
      ease: "power1.inOut",
    }, "line3")

    // Make dot white and fill last hole
    .to("#dot", {
      duration: 0.5,
      width: newCenters.center4.width, // Adjust the width to match the circle
      height: newCenters.center4.height, // Adjust the height to match the circle
      x: newCenters.center4.centerX - (newCenters.center4.width / 2),
      y: newCenters.center4.centerY - (newCenters.center4.height / 2),
      backgroundColor: "#FAF9F6",
      ease: "power1.inOut",
    })
    
    // Make dot cover entire circle animation
    .to("#dot", { duration: 1, x: "-3vw", width: "60vw", height: "12vw", borderRadius: "5px", ease: "power1.inOut" })
    // Hide lines and circles
    .to("#line1, #line2, #line3", { duration: 1, opacity: 0, ease: "power1.inOut" }, "-=1")
    .to(".circle", { duration: 1, opacity: 0, ease: "power1.inOut" }, "-=1")
    // Move dot/white bar to text position
    .to("#dot", { duration: 1, x: "10vw", width: "50vw", height: "30vw", borderRadius: "5px", ease: "power1.inOut" })
    // Hide dot/white bar
    .to("#dot", { duration: 1, ease: "power1.inOut", opacity: 0 })
    .to("#sights-studios", { duration: 1, opacity: 1, ease: "power1.inOut" }, "-=1.5");
    
  };

  useEffect(() => {
    // Initial position calculation
    updatePositions();

    // Recalculate positions on resize
    const handleResize = () => {
      updatePositions();
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className="animation-container">
      <div className="circle-wrapper">
        <div className="circle" id="circle1"></div>
        <div className="circle" id="circle2"></div>
        <div className="circle" id="circle3"></div>
        <div className="circle" id="circle4"></div>
        <div className="dot" id="dot"></div>
      </div>
      <svg id="line-container">
        <line id="line1" x1={centers.center1.centerX} y1={centers.center1.centerY} x2={centers.center1.centerX} y2={centers.center1.centerY} />
        <line id="line2" x1={centers.center2.centerX} y1={centers.center2.centerY} x2={centers.center2.centerX} y2={centers.center2.centerY} />
        <line id="line3" x1={centers.center3.centerX} y1={centers.center3.centerY} x2={centers.center3.centerX} y2={centers.center3.centerY} />
      </svg>
      <h1 id="sights-studios" className="hidden-text">Where Excellence & Efficiency Meet</h1>
    </div>
  );
};

export default CircleAnimation;
