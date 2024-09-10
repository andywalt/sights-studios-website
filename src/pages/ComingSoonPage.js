import React from 'react';
import { Link } from 'react-router-dom';

import '../styles/ComingSoon.css';

const ComingSoon = () => {
  return (
    <Link to="/" className="container-link">
      <div className="container">
        <div className="logo-container">
          <img 
            src={"/photos/sightsstudioslogo.webp"}
            alt="Sights Studios Logo" 
            className="logo" 
          />
        </div>
        <h1 className="title">Coming Soon</h1>
        <p className="subtitle">We are working hard to bring you something amazing!</p>
      </div>
    </Link>
  );
};

export default ComingSoon;