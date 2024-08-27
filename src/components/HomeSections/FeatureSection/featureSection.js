import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';  // Import Link from react-router-dom
import { gsap } from 'gsap';
import './featureSection.css';

const features = [
  {
    title: 'Processes',
    description: 'We evaluate your current systems, workflows, habits, and methods and then map them before developing efficiencies and new products around them.',
    backgroundImage: `${process.env.PUBLIC_URL}/photos/processes-diagram-small.jpg`,
    link: '/services'  // Add link for Processes


  },
  {
    title: 'Product',
    description: 'Evaluating your current user feedback, market research, and more to optimize and maximize revenue.',
    backgroundImage: `${process.env.PUBLIC_URL}/photos/product-comp.jpg`,
    link: '/services'  // Add link for Product


  },
  {
    title: 'People',
    description: 'Provide coaching, training, development programs and evaluate strengths and team dynamics for maximize efficiency while maintaining relational integrity.',
    backgroundImage: `${process.env.PUBLIC_URL}/photos/people-tech.jpg`,
    link: '/services'  // Add link for People

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
          <Link to={feature.link} key={index}>  {/* Wrap the card in a Link */}
            <div
              className="feature-card"
              style={{ backgroundImage: `url(${feature.backgroundImage})` }}
            >
              <div className="feature-card-inner">
                <h3>{feature.title}</h3>
                <p>{feature.description}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default FeatureSection;
