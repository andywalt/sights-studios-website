import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShieldAlt, faLightbulb, faSyncAlt } from '@fortawesome/free-solid-svg-icons';
import './AboutPage.css';

const values = [
  {
    title: 'Integrity',
    description: 'Integrity is doing the right thing and making sure things stay strong. Businesses can be weakened by shortcuts that seem promising but lead to major issues. The goal is growth, not swelling. Respecting time, budget, and managing expectations are critical for healthy development.',
    icon: faShieldAlt,
  },
  {
    title: 'Innovation',
    description: 'Innovation is finding the best way to accomplish the purpose. Not just finding a way, but finding a way that works and is a win for everyone. Being creative with resources, strategy, and relationships to find opportunities to grow together and build things that will last.',
    icon: faLightbulb,
  },
  {
    title: 'Iteration',
    description: 'Iteration is about being flexible and curious to make things better and better over time. Constant tinkering is the process of building on top of great foundations to make every interaction and project go deeper, wider, and further.',
    icon: faSyncAlt,
  },
];

const ValuesSection = () => {
  return (
    <div className="values-section">
      <h2>Values that Lead Us Forward</h2>
      <p>Our finest creations stem from strong values and dedicated effort. Guided by our core principles, we strive to deliver exceptional, enduring results. Intentionality is our cornerstone, ensuring that we not only withstand the test of time but also thrive and grow.</p>
      <div className="values">
        {values.map((value, index) => (
          <div className="value" key={index}>
            <FontAwesomeIcon icon={value.icon} className="value-icon" />
            <h3>{value.title}</h3>
            <p>{value.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ValuesSection;
