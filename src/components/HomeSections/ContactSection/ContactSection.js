import React, { useState } from 'react';
import './ContactSection.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';

import gsap from 'gsap';



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

  const [formSubmitted, setFormSubmitted] = useState(false);


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleStarClick = (name, event) => {
    setFormData({
      ...formData,
      areasOfInterest: {
        ...formData.areasOfInterest,
        [name]: !formData.areasOfInterest[name],
      },
    });

    // Trigger GSAP Animation
    gsap.fromTo(
      event.currentTarget.querySelector('.star-icon'),
      { scale: 1, transformOrigin: "center center"  },
      { scale: 1.3, duration: 0.2, ease: "elastic.out(1, 0.3)", yoyo: true, repeat: 1 }
    );
  };

  /* const handleSubmit = async (e) => {
    e.preventDefault();
  
    const data = {
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      phone: formData.phone,
      areasOfInterest: formData.areasOfInterest,
    };
  
    try {
      const response = await fetch('https://meh8vo2iag.execute-api.us-east-1.amazonaws.com/prod/contact-home', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
  
      if (response.ok) {
        setFormSubmitted(true);
      } else {
        alert('There was an error sending your message.');
      }
    } catch (error) {
      alert('There was an error sending your message.');
      console.error('Error:', error);
    }
  }; */

  // Mock handleSubmit to disable actual submit and simulate successful submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormSubmitted(true);
  };
  

  return (
      <div className="contact-section">
        {!formSubmitted ? (
          <>
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
                  />
                  <input
                    type="text"
                    name="lastName"
                    placeholder="Last Name"
                    value={formData.lastName}
                    onChange={handleChange}
                  />
                  <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleChange}
                  />
                  <input
                    type="tel"
                    name="phone"
                    placeholder="Phone Number"
                    value={formData.phone}
                    onChange={handleChange}
                  />
                </div>
                <div className="checkbox-group">
                  <h3 className="form-section-title">How can we help?</h3>
                  {['Processes', 'Product', 'People', 'Other'].map((area) => (
                    <label key={area} className='checkbox-area' onClick={(event) => handleStarClick(area, event)}>
                      <FontAwesomeIcon
                        icon={faStar}
                        className={`star-icon ${formData.areasOfInterest[area] ? 'checked' : ''}`}
                      />
                      <span>{area}</span>
                    </label>
                  ))}
                </div>
              </div>
              <button type="submit" className="cta-button">Submit</button>
            </form>
          </>
        ) : (
          <div className="success-message">
            <h2>We can't wait to get started with you!</h2>
            <p>We will reach out by email very soon.</p>
          </div>
        )}
      </div>
  );
};

export default ContactSection;
