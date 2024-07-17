import React, { useState } from 'react';
import './ContactSection.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';



const ContactSection = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    areasOfInterest: {
      Processes: false,
      Product: false,
      People: false,
      Other: false,
    },
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleStarClick = (name) => {
    setFormData({
      ...formData,
      areasOfInterest: {
        ...formData.areasOfInterest,
        [name]: !formData.areasOfInterest[name],
      },
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
  };

  return (
    <div className="contact-section">
      <h2 className="contact-heading">Get in Touch</h2>
      <p className="contact-subheading">We'd love to hear from you. Fill out the form below and we'll get back to you as soon as possible.</p>
      <form className="contact-form" onSubmit={handleSubmit}>
        <input
          type="text"
          name="firstName"
          placeholder="First Name"
          value={formData.firstName}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="lastName"
          placeholder="Last Name"
          value={formData.lastName}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <input
          type="tel"
          name="phone"
          placeholder="Phone Number"
          value={formData.phone}
          onChange={handleChange}
          required
        />
        <div className="checkbox-group">
          {['Processes', 'Product', 'People', 'Other'].map((area) => (
            <label key={area} className='checkbox-area' onClick={() => handleStarClick(area)}>
              <FontAwesomeIcon
                icon={faStar}
                className={`star-icon ${formData.areasOfInterest[area] ? 'checked' : ''}`}
              />
              {area}
            </label>
          ))}
        </div>
        <button type="submit" className="cta-button">Submit</button>
      </form>
    </div>
  );
};

export default ContactSection;
