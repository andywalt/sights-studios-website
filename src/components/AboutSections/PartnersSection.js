import React from 'react';
import './AboutPage.css';

const partners = [
  { name: 'Full Marketing Service', image: '/path/to/marketing-logo.jpg' },
  { name: 'Full iOS and Full-stack Development Team', image: '/path/to/development-logo.jpg' },
  { name: 'Team Coaching', image: '/path/to/coaching-logo.jpg' },
  { name: 'Other', image: '/path/to/other-logo.jpg' },
];

const PartnersSection = () => {
  return (
    <div className="partners-section">
      <h2>Our Partners</h2>
      <div className="partners">
        {partners.map((partner, index) => (
          <div className="partner" key={index}>
            <img src={partner.image} alt={partner.name} />
            <h3>{partner.name}</h3>
          </div>
        ))}
      </div>
      <button className="cta-button">See the Magic</button>
    </div>
  );
};

export default PartnersSection;
