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

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('https://meh8vo2iag.execute-api.us-east-1.amazonaws.com/prod', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();
      if (response.ok) {
        alert('Your message has been sent!');
        setFormData({
          firstName: '',
          lastName: '',
          email: '',
          phone: '',
          areasOfInterest: {
            Processes: false,
            Product: false,
            People: false,
            Other: false,
          }
        });
      } else {
        alert('There was an error sending your message.');
      }
    } catch (error) {
      alert('There was an error sending your message.');
      console.error('Error:', error);
    }
  };
  

  return (
    <div className="contact-section">
      <h2 className="contact-heading">Get in Touch</h2>
      <p className="contact-subheading">We'd love to hear from you (but don't want to be annoying).</p>
      <form className="contact-form-container" onSubmit={handleSubmit}>
        <div className='contact-form-input-groups'>
          <div className="contact-form">
            <h3 className="form-section-title">Fill out your work details.</h3>
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
          </div>
          <div className="checkbox-group">
            <h3 className="form-section-title">How can we help?</h3>
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
        </div>
        <button type="submit" className="cta-button">Submit</button>
      </form>
    </div>
  );
};

export default ContactSection;
