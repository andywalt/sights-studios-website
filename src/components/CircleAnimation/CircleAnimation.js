import React, { useEffect, useState, useRef } from 'react';
import gsap from 'gsap'

import './CircleAnimation.css';

const CircleAnimation = () => {
  const textRef = useRef(null);
  const dotRef = useRef(null);
  const containerRef = useRef(null);

  const isMobile = window.matchMedia("(max-width: 767px)").matches;
  const isDesktop = window.matchMedia("(min-width:768px)").matches;
  const isTablet = window.matchMedia("(min-width: 768px) and (max-width: 1024px)").matches;
  
  const [animationCompleted, setAnimationCompleted] = useState(false);
  const [centers, setCenters] = useState({
    center1: { centerX: 0, centerY: 0 },
    center2: { centerX: 0, centerY: 0 },
    center3: { centerX: 0, centerY: 0 },
    center4: { centerX: 0, centerY: 0 },
  });

  const calculateCenter = (elementId) => {
    const element = document.getElementById(elementId); // Get the specific circle element
    const container = document.querySelector('.animation-container');  // Reference the animation container
    const rect = element.getBoundingClientRect(); // Get the element's position and size
    const containerRect = container.getBoundingClientRect();    // Get the circle-wrapper's position and size

    // Calculate centerX and centerY relative to the animation-container's position
    const centerX = rect.left + rect.width / 2 - containerRect.left;
    const centerY = rect.top + rect.height / 2 - containerRect.top;

    return { centerX, centerY, width: rect.width, height: rect.height };
  };

  const resetAnimationState = () => {
    // Reset the positions and opacity of elements to their initial states
    gsap.set('#dot', { clearProps: "all" });
    gsap.set('.circle', { clearProps: "all" });
    gsap.set('#line1, #line2, #line3', { clearProps: "all" });
    gsap.set('#sights-studios', { opacity: 0 });
    gsap.set('.scroll-arrow', { opacity: 0 });
  };
  
  // Update positions of the circles and lines based on the calculated centers
  const updatePositions = () => {
    if (animationCompleted) return;  // Prevent update if animation is complete

    // Calculate the new center for all four circles
    const newCenters = {
      center1: calculateCenter('circle1'),
      center2: calculateCenter('circle2'),
      center3: calculateCenter('circle3'),
      center4: calculateCenter('circle4'),
    };
    setCenters(newCenters); // Save the calculate centers

    resetAnimationState();  // Reset animation state before restarting
    
     // Update line positions relative to circles
     const svg = document.getElementById('line-container');
     const svgRect = svg.getBoundingClientRect();
 
     document.querySelectorAll('.circle').forEach((circle, index) => {
       const rect = circle.getBoundingClientRect();
       const centerX = ((rect.left + rect.width / 2) - svgRect.left) / svgRect.width * 100;
 
       const line = document.getElementById(`line${index + 1}`);
       if (line) {
         line.setAttribute('x1', `${centerX}px`);
         line.setAttribute('x2', `${centerX}px`);
       }
     });
 
     startAnimation(newCenters);
   };

  // Animate the dot and circles based on their calculated centers
  const startAnimation = (newCenters) => {
    const dot = document.getElementById('dot'); // Get the dot element
    const dotSize = dot.offsetWidth; // Get current dot size

    const animationContainer = document.querySelector('.animation-container');
    const containerRect = animationContainer.getBoundingClientRect();


    const animationCenterX = containerRect.width / 2;
    const animationCenterY = containerRect.height / 2;

    console.log(`Animation Container Center X: ${animationCenterX}, Center Y: ${animationCenterY}`);

    const textElement = textRef.current; // Get the text element to animate
    const dotElement = dotRef.current; // Get the reference to the dot

    if (!textElement || !dotElement) return; // Exit if elements are missing

    const textRect = textElement.getBoundingClientRect(); // Get the text element's position
    const dotRect = dotElement.getBoundingClientRect(); // Get the dot's position 



    const mm = gsap.matchMedia();

    mm.add({
      isDesktop: "(min-width: 1025px)",
      isTablet: "(min-width: 768px) and (max-width: 1024px)",
      isMobile: "(max-width: 767px)"
    }, (context) => {
      const { isDesktop, isTablet, isMobile } = context.conditions;

      // Start GSAP animation
      const tl = gsap.timeline();

      if (isDesktop || isTablet) {
        // Move dot to first circle (already there, but this sets up the animation)
        tl.to(dot, {
          duration: 0.5,
          x: newCenters.center1.centerX - dotSize / 2,
          y: newCenters.center1.centerY - dotSize / 2,
          ease: "power1.inOut",
        })
        .to(dot, {
          duration: 0.5,
          opacity: 1,
          ease: "power1.inOut",
        })
        // Move dot to second circle and draw first line
        .to(dot, {
          duration: 1,
          x: newCenters.center2.centerX - dotSize / 2,
          y: newCenters.center2.centerY - dotSize / 2,
          ease: "power1.inOut",
        })
        // Move dot to third circle and draw 2nd line
        .to(dot, {
          duration: 1,
          x: newCenters.center3.centerX - dotSize / 2,
          y: newCenters.center3.centerY - dotSize / 2,
          ease: "power1.inOut",
        })
        // Move dot to fourth circle and draw last line
        .to(dot, {
          duration: 1,
          x: newCenters.center4.centerX - dotSize / 2,
          y: newCenters.center4.centerY - dotSize / 2,
          ease: "power1.inOut",
        })
        .to("#line1", {
          duration: 1,
          attr: { x2: `${newCenters.center2.centerX}px`, y2: `${newCenters.center2.centerY}px` },
          opacity: 1,
          ease: "power1.inOut",
        })
        .to("#line2", {
          duration: 1,
          opacity: 1,
          attr: { x2: `${newCenters.center3.centerX}px`, y2: `${newCenters.center3.centerY}px` },
          ease: "power1.inOut",
        })
        .to("#line3", {
          duration: 1,
          opacity: 1,
          attr: { x2: `${newCenters.center4.centerX}px`, y2: `${newCenters.center4.centerY}px` },
          ease: "power1.inOut",
        })
        .to(dot, {
          duration: 1,
          x: animationCenterX - dotSize / 2,
          y: animationCenterY - dotSize / 2,
          ease: "power1.inOut",
        }, "+=1")
        // Once the dot is in the center, move all circles to the center simultaneously
        // Move Circle 1 to the center
        tl.to("#circle1", {
          duration: 1,
          x: animationCenterX - newCenters.center1.width / 2,
          y: animationCenterY - newCenters.center1.height / 2,
          ease: "power1.inOut",
        }, "<")  // '>': Start this after the dot reaches the center

        // Move Circle 2 to the center
        .to("#circle2", {
          duration: 1,
          x: animationCenterX - (newCenters.center2.width / 2) - (newCenters.center2.centerX - newCenters.center1.centerX),
          y: animationCenterY - (newCenters.center2.height / 2),
          ease: "power1.inOut",
        }, "<")  // 0: Start at the same time as Circle 1

        // Move Circle 3 to the center
        .to("#circle3", {
          duration: 1,
          x: animationCenterX - (newCenters.center3.width / 2) - (newCenters.center3.centerX - newCenters.center1.centerX),
          y: animationCenterY - (newCenters.center3.height / 2),
          ease: "power1.inOut",
        }, "<")  // 0: Start at the same time as Circle 1

        // Move Circle 4 to the center
        .to("#circle4", {
          duration: 1,
          x: animationCenterX - (newCenters.center4.centerX - newCenters.center1.centerX) - (newCenters.center4.width / 2),
          y: animationCenterY - newCenters.center4.height / 2,
          ease: "power1.inOut",
        }, "<")  // 0: Start at the same time as Circle 1

        // Hide the lines and the circles.
        tl.to("#line1, #line2, #line3", { duration: 1, opacity: 0, ease: "power1.inOut" }, "<")

        // Make the dot grow and change color to white-ish
        tl.to("#dot", {
          duration: 0.5,
          width: newCenters.center4.width,  // Grow to match circle's width
          height: newCenters.center4.height,  // Grow to match circle's height
          x: animationCenterX - (newCenters.center4.width / 2),  // Adjust position based on new width
          y: animationCenterY - (newCenters.center4.height / 2),  // Adjust position based on new height
          backgroundColor: "#FAF9F6",  // Change color to whitish
          ease: "power1.inOut",
        })

        
        tl.to(".circle", { duration: 1, opacity: 0, ease: "power1.inOut" }, "-=1")
        // Transform circle dot and move to hidden-text location
        .to(dotElement, {
          duration: 2,
          width: textRect.width,
          height: textRect.height,
          x: textRect.left - dotRect.left,
          y: textRect.top - dotRect.top,
          borderRadius: "5px",
          backgroundColor: "#FAF9F6",
          ease: "power1.inOut",
          zIndex: 10,
        })
        // Hide circle dot box and show hidden text
        .to("#dot", { duration: 1, ease: "power1.inOut", opacity: 0, display: "none" })
        .to("#sights-studios", { duration: 1, opacity: 1, ease: "power1.inOut" }, "-=1.5")
        // Make sure animations are done.

        .call(() => setAnimationCompleted(true));
      }

      if (isMobile) {
                                                    /* I'M WORKING HERE! */
        // Log newCenters and center1 before starting the animation
        console.log("newCenters:", newCenters);
        console.log("newCenters.center1:", newCenters.center1);
        console.log("newCenters.center1.centerY:", newCenters.center1.centerY);
        console.log(`Dot's current position - X: ${dotRect.left}, Y: ${dotRect.top}`);
        
        tl.to(dot, {
          duration: 1,
          ease: "power1.inOut",
          opacity: 1,
          x: newCenters.center1.centerX,
          y: newCenters.center1.centerY,
        })

        tl.to(dot, {
          duration: 1,
          ease: "power1.inOut",
          x: newCenters.center2.centerX,
          y: newCenters.center2.centerY,
        });

        tl.to(dot, {
          duration: 1,
          y: newCenters.center3.centerY - dotSize / 2,
          ease: "power1.inOut",
        })

        .to(dot, {
          duration: 1,
          y: newCenters.center4.centerY - dotSize / 2,
          ease: "power1.inOut",
        })
        tl.to("#line1", {
          duration: 1,
          attr: { y2: `${newCenters.center2.centerY}px` },
          opacity: 1,
          ease: "power1.inOut",
        })
        .to("#line2", {
          duration: 1,
          opacity: 1,
          attr: { y2: `${newCenters.center3.centerY}px` },
          ease: "power1.inOut",
        })
        .to("#line3", {
          duration: 1,
          opacity: 1,
          attr: { y2: `${newCenters.center4.centerY}px` },
          ease: "power1.inOut",
        })
        tl.to(".animation-container", {
          duration: 1,
          opacity: 1,
          attr: { y2: `${newCenters.center4.centerY}px` },
          ease: "power1.inOut",
        })
        // Rotate and spiral inward animation applied to the circles, lines, and dot
        tl.to(".circle-wrapper, #line-container, #dot", {
          duration: 1, // Set the duration for the rotation
          scale: 0, // Scale down the content to create a spiraling effect
          ease: "power2.inOut", // Smooth easing for a natural feel
          transformOrigin: "center center", // Rotate around the center
      })
      .call(() => {
          // Ensure the text is centered and ready to be revealed
          gsap.set(textRef.current, {
              x: 0,
              y: 0,
              opacity: 0, // Ensure opacity is set to 0 initially
          });
      })
      .to(textRef.current, {
          duration: 2, // Duration for the reveal
          opacity: 1, // Reveal the text
          ease: "power2.inOut", // Smooth easing
      })
      // Hide the hidden-text
      .to("#sights-studios", {
          duration: 1,
          opacity: 0,
          ease: "power2.inOut",
      })
      // Reveal the scroll arrow
      .to(".scroll-arrow", {
          duration: 1.5,
          opacity: 1,
          ease: "power2.inOut",
          display: "block",
          onComplete: () => {
              // Start the animation to move to the bottom after the bounce
              gsap.to(".scroll-arrow", {
                duration: 2,
                y: "80vh", // Adjust this value to position the arrow near the bottom of the hero section
                ease: "power2.inOut",
            });
          }
      }, "-=1")
    
        .call(() => setAnimationCompleted(true));
      }
      
    });
  };

  useEffect(() => {
    // Initial position calculation
    updatePositions();

    if (!animationCompleted) {
      // Recalculate positions on resize only if animation hasn't completed
      const handleResize = () => {
        updatePositions();
      };
      window.addEventListener('resize', handleResize);

      return () => {
        window.removeEventListener('resize', handleResize);
      };
    }
  }, [animationCompleted]); // Add animationCompleted to the dependency array

  return (
    <div ref={containerRef} className="animation-container">
    <div className='animation'>
      <div className="circle-wrapper">
          <div className="circle" id="circle1"></div>
          <div className="circle" id="circle2"></div>
          <div className="circle" id="circle3"></div>
          <div className="circle" id="circle4"></div>
          <div className="dot" id="dot" ref={dotRef}></div>
      </div>
      <svg id="line-container">
        <line id="line1" x1={centers.center1.centerX} y1={centers.center1.centerY} x2={centers.center1.centerX} y2={centers.center1.centerY} />
        <line id="line2" x1={centers.center2.centerX} y1={centers.center2.centerY} x2={centers.center2.centerX} y2={centers.center2.centerY} />
        <line id="line3" x1={centers.center3.centerX} y1={centers.center3.centerY} x2={centers.center3.centerX} y2={centers.center3.centerY} />
      </svg>
      <h1 id="sights-studios" className="hidden-text" ref={textRef}>
        {isMobile ? "Let's grow your business" : <>Connecting the dots so Excellence & Efficiency Meet</>}
      </h1>
    </div>
      <div className="scroll-arrow" style={{ opacity: 0 }}>&#x2193;</div>
    </div>
  );
};

export default CircleAnimation;
