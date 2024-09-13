import React, { useEffect } from 'react';
import gsap from 'gsap';
import { MotionPathPlugin } from "gsap/MotionPathPlugin";

import { ReactComponent as MessyLines } from '../ServicesSections/pathway-cleaner.svg';

import './LineAnimation.css'

gsap.registerPlugin(MotionPathPlugin);

const LineAnimation = ({ onComplete }) => {
  // Handle skipping animation
  const skipAnimation = () => {
    gsap.globalTimeline.clear(); // Clear any running animations
    onComplete(); // Immediately trigger onComplete callback
  };

  useEffect(() => {
    const linesOrder = [
      'line-2', 'path5', 'line-252', 'line-241', 'line-283', 'line-280', 'line-239',
      'line-59', 'line-123', 'line-64', 'line-106', 'line-469', 'line-306', 'line-478', 
      'line-40', 'line-399', 'line-329', 'line-560', 'line-304', 'line-201', 'line-390', 
      'line-514', 'line-358', 'line-237', 'line-263', 'line-369', 'line-520', 'line-466', 
      'line-416', 'line-458', 'line-319', 'line-1',
    ];

    const lines = document.querySelectorAll('#line-animation path');
    const allLines = Array.from(lines).map(line => line.id);
    const otherLines = allLines.filter(line => !linesOrder.includes(line)).map(line => `#${line}`);

    const svg = document.getElementById('line-animation');
    const svgWidth = svg.viewBox.baseVal.width; // Check if SVG exists
    const centerX = svgWidth / 2;

    const tl = gsap.timeline({
      defaults: { duration: 0.75, ease: "power2.inOut" },
      onComplete: () => {
        // Trigger the onComplete callback after the animation is done
        onComplete();
      }
    });

    // Show H3-1 & H3-2 This is your business & We get it.
    tl.to('#h3-1', { opacity: 1 }, '+=1')
      .to('#h3-2', { opacity: 1 }, '+=1')

    
    // Hide H3-1 & H3-2
    tl.to('#h3-1', { opacity: 0 }, '+=0.5')
      .to('#h3-2', { opacity: 0 }, '+=1');

    
    tl.to('#h3-3', { opacity: 1 }, '-=1')
      .to('#h3-4', { opacity: 1 }, '+=1')
      .to('#line-2', {stroke: 'var(--primary-green)', strokeWidth: 40}, '-=2');

    

    // Highlight Main Path Green and Increase Stroke Width
    linesOrder.forEach((lineId, index) => {
      tl.to(`#${lineId}`, { stroke: 'var(--primary-green)', strokeWidth: 40 }, `-=${index > 0 ? 0.65 : 0}`)
    });

    tl.to('#h3-3', { opacity: 0 }, '-=1')
      .to('#h3-4', { opacity: 0 }, '+=1');

    tl.to('#h3-5', { opacity: 1 }, '-=1')

    

    // Remove Non Main Path Lines from View
    tl.add(() => {
      gsap.to(otherLines, { opacity: 0 });
    }, '+=1');

    // Animate line-2 slowly
    tl.to(`#line-2`, { stroke: 'var(--primary-green)', strokeWidth: 40 }, `+=0.5`)
      .to(`#line-2`, {
        attr: { d: `M${centerX - 800},400 L${centerX + 800},400` }, // Adjust the path data directly
        duration: 1.5,
      })
      .to(`#path5`, {
        attr: { d: `M${centerX - 800},400 L${centerX + 800},400`, transform: "matrix(1,0,0,1,0,0)" }, // Adjust the path data directly
        duration: 0.5,
      });

    // Function to move highlighted lines to position in groups
    const moveLines = (group) => {
      tl.to(group.map(lineId => `#${lineId}`), {
        attr: { d: `M${centerX - 800},400 L${centerX + 800},400` }, // Adjust the path data directly
        duration: 0.05,
        stagger: 0.1,
      });
    };

    // Define groups of lines to move together
    const groups = [
      ['line-252', 'line-241', 'line-283', 'line-280', 'line-239'],
      ['line-59', 'line-123', 'line-64', 'line-106', 'line-469', 'line-306', 'line-478', 'line-40', 'line-399', 'line-329', 'line-560'],
      ['line-304', 'line-201', 'line-390', 'line-514', 'line-358', 'line-237', 'line-263'],
      ['line-369', 'line-520', 'line-466', 'line-416', 'line-458', 'line-319'],
    ];

    // Animate groups of lines
    groups.forEach(group => moveLines(group));

    // Finish with line-1 slowly
    tl.to(`#line-1`, {
      attr: { d: `M${centerX - 800},400 L${centerX + 800},400` }, // Adjust the path data directly
      duration: .1,
    });

    // Safely calculate the y-position of the amber line (#line-2)
    tl.add(() => {
      const amberLine = document.querySelector(`#line-2`);
      if (amberLine) {
        const amberLineRect = amberLine.getBoundingClientRect();  // Get the bounding box of the line
        const h3_6 = document.querySelector('#h3-6');
        if (h3_6) {
          const h3_6Rect = h3_6.getBoundingClientRect();

          // Calculate the distance to move #h3-6 based on amber line position
          const moveY = amberLineRect.top - h3_6Rect.top - 40; // Adjust 10px if you need some space between line and text

          // Move h3-6 to the position above the amber line
          gsap.to('#h3-6', { y: moveY, opacity: 1, duration: 1 });
        }
      }
    }, '+=1');

    tl.to('#h3-5', { opacity: 0 }, '-=0.5')
      .to(`#line-2`, { stroke: 'var(--secondary-amber)', strokeWidth: 40, duration: 3 }, `-=1`);

    // Pause the animation at the end for debugging
    tl.addPause('+=2');

  }, [onComplete]);

  return (
    <div className="knot-container">
       {/* Skip Button */}
       <button className="skip-button" onClick={skipAnimation}>
        Skip
      </button>
      <div className='upper-title'>
        <h3 id="h3-1" style={{ opacity: 1 }}>This is your business...</h3>
        <h3 id="h3-3" style={{ opacity: 0 }}>Here's where we come in...</h3>
        <h3 id="h3-5" style={{ opacity: 0 }}>So you can focus on what's important to you.</h3>
      </div>
      <svg viewBox="0 0 1920 960" id="line-animation">
        <MessyLines className="messy-lines" />
      </svg>
      <div className='lower-title'>
        <h3 id="h3-2" style={{ opacity: 0 }}>We get it, you're trying to figure out what do...</h3>
        <h3 id="h3-4" style={{ opacity: 0 }}>We help you figure it out, then make it make sense!</h3>
        <h3 id="h3-6" style={{ opacity: 0 }}>Which is growing your business...</h3>
      </div>
    </div>
  );
}

export default LineAnimation;
