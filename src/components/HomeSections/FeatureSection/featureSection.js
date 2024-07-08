import React from 'react';
import './featureSection.css';

const features = [
  { title: 'AI Consulting', description: 'Expert advice to integrate AI into your business.' },
  { title: 'Efficiency Analysis', description: 'Analyze and improve business processes.' },
  { title: 'Custom Solutions', description: 'Tailored AI solutions for your specific needs.' },
];

const FeatureSection = () => {
  return (
    <div className="feature-section">
      <h2>Our Services</h2>
      <div className="features">
        {features.map((feature, index) => (
          <div className="feature" key={index}>
            <h3>{feature.title}</h3>
            <p>{feature.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeatureSection;
