import React from 'react';
import './Card.css';

const Card = ({ image, place, title1, title2, description }) => (
  <div className="card" style={{ backgroundImage: `url(${image})` }}>
    <div className="card-content">
      <div className="content-place">{place}</div>
      <div className="content-title-1">{title1}</div>
      <div className="content-title-2">{title2}</div>
      <div className="desc">{description}</div>
    </div>
  </div>
);

export default Card;
