import React, { useEffect, useState } from 'react';
import { gsap } from 'gsap';
import './featureSection.css';

const features = [
  {
    title: 'Processes',
    description: 'We evaluate your current systems, workflows, habits, and methods and then map them before developing efficiencies and new products around them.'
  },
  {
    title: 'Product',
    description: 'Evaluating your current user feedback, market research, and more to optimize and maximize revenue.'
  },
  {
    title: 'People',
    description: 'Provide coaching, training, development programs and evaluate strengths and team dynamics for maximize efficiency while maintaining relational integrity.'
  },
];

const FeatureSection = () => {
  const [currentWord, setCurrentWord] = useState('Grow');

  useEffect(() => {
    const words = ['Serve', 'Accelerate', 'Innovate', 'Evaluate', 'Grow'];

    const timeline = gsap.timeline({ repeat: -1 });

    words.forEach((word, index) => {
      timeline
        /* Move the Word Up & Hide It */
        .to(".rotating-word", {
          duration: 1,
          y: "-30px",
          opacity: 0
        })
        /* Move the Word back to it's starting spot and change it */
        .to(".rotating-word", {
          duration: 0.1,
          y: "0px",
          onComplete: () => setCurrentWord(words[index])
        })
        /* Reveal the Word and let it be read */
        .to(".rotating-word", {
          duration: 2.5,
          opacity: 1
        })
    });

    return () => {
      timeline.kill();
    };
  }, []);
  
  return (
    <div className="feature-section">
      <h2 className='rotating-word-section'>
        How We Help You&nbsp;
        <div className="rotating-word-container">
          <span className="rotating-word">{currentWord}</span>
          <div className="underline"></div>
        </div>
        .
      </h2>
      <div className="features">
        {features.map((feature, index) => (
          <div className="feature-card" key={index}>
            <div className="feature-card-inner">
              <div className="feature-card-front">
                <h2>{feature.title}</h2>
              </div>
              <div className="feature-card-back">
                <h3>{feature.title}</h3>
                <p>{feature.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeatureSection;
