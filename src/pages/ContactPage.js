import React, { useState } from 'react';
import Navbar from '../components/Navbar/navBar';
import Footer from '../components/HomeSections/FooterSection/footer';

import '../components/ContactPage/ContactPage.css';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    role: '',
    function: '',
    company: '',
    country: '',
    email: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
  };

  return (
    <div className="talk-page">
      <Navbar />
      <div className="talk-content">
        <div className='talk-box'>
          <h1>Ready to Explore?</h1>
          <p>Have a business need or an RFP to submit? Interested in discussing your company's growth prospects? Provide your contact information and we'll put you in touch with the appropriate expert.</p>
          <form className="talk-form" onSubmit={handleSubmit}>
            <h2>Let's Talk</h2>
            <div className="form-row" id='name-line'>
              <span>Howdy, my name is </span>
              <label htmlFor="firstName">
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  placeholder="First Name*"
                  value={formData.firstName}
                  onChange={handleChange}
                  required
                />
                <span className="bottom-line"></span>
              </label>
              <span className='spacer'> </span>
              <label htmlFor="lastName">
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  placeholder="Last Name*"
                  value={formData.lastName}
                  onChange={handleChange}
                  required
                />
                <span className="bottom-line"></span>
              </label>
              <span>.</span>
            </div>
            <div className="form-row" id='role-line'>
              <span>I'm a </span>
              <label htmlFor="role">
                <select
                  id="role"
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                  required
                >
                  <option value="" disabled>Role*</option>
                  <option value="Analyst / Coordinator">Analyst / Coordinator</option>
                  <option value="Assistant">Assistant</option>
                  <option value="Business Unit Head">Business Unit Head</option>
                  <option value="C-Level">C-Level</option>
                  <option value="Director">Director</option>
                  <option value="General Manager / Managing Director">General Manager / Managing Director</option>
                  <option value="Manager">Manager</option>
                  <option value="President">President</option>
                  <option value="VP / SVP">VP / SVP</option>
                  <option value="Professor">Professor</option>
                  <option value="Student">Student</option>
                  <option value="Other">Other</option>
                </select>
                <span className="bottom-line"></span>
              </label>
              <span> in </span>
              <label htmlFor="function">
                <select
                  id="function"
                  name="function"
                  value={formData.function}
                  onChange={handleChange}
                  required
                >
                  <option value="" disabled>Function*</option>
                  <option value="Strategy">Strategy</option>
                  <option value="Legal">Legal</option>
                  <option value="Operations">Operations</option>
                  <option value="Research / Insights">Research / Insights</option>
                  <option value="Procurement">Procurement</option>
                  <option value="Digital / Technology">Digital / Technology</option>
                  <option value="Sales">Sales</option>
                  <option value="Finance">Finance</option>
                  <option value="Experience">Experience</option>
                  <option value="People / HR">People / HR</option>
                  <option value="Communications / PR">Communications / PR</option>
                  <option value="Product / Innovation">Product / Innovation</option>
                  <option value="Marketing">Marketing</option>
                  <option value="Design">Design</option>
                  <option value="Brand">Brand</option>
                </select>
                <span className="bottom-line"></span>
              </label>
              <span>,</span>
            </div>
            <div className="form-row" id='company-line'>
              <span>at </span>
              <label htmlFor="company">
                <input
                  type="text"
                  id="company"
                  name="company"
                  placeholder="Company*"
                  value={formData.company}
                  onChange={handleChange}
                  required
                />
                <span className="bottom-line"></span>
              </label>
              <span>, located in </span>
              <label htmlFor="country">
                <select
                  id="country"
                  name="country"
                  value={formData.country}
                  onChange={handleChange}
                  required
                >
                  <option value="" disabled>Country*</option>
                  <option value="USA">USA</option>
                  <option value="Canada">Canada</option>
                  <option value="Texas">Texas</option>
                </select>
                <span className="bottom-line"></span>
              </label>
              <span>.</span>
            </div>
            <div className="form-row" id='email-line'>
              <span>You can reach my work email at </span>
              <label htmlFor="email">
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Work Email*"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
                <span className="bottom-line"></span>
              </label>
              <span>.</span>
            </div>
            <button type="submit" className="cta-button" id='talk-cta-button'>Next</button>
          </form>

        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ContactPage;
