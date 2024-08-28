import React, { useState } from 'react';
import Navbar from '../components/Navbar/navBar';
import CustomDropdown from '../components/ContactPage/CustomDropdownComponent.js';
import '../components/ContactPage/ContactPage.css';

/* Custom styles for React Select */
const customStyles = {
  control: (provided, state) => ({
    ...provided,
    backgroundColor: 'transparent',
    border: state.isFocused ? 'none' : 'none',
    borderBottom: state.isFocused ? '1px solid #FAF9F6' : '1px solid #145214',
    borderRadius: '0',
    boxShadow: 'none',
    minHeight: 'auto',
    padding: '0',
  }),
  placeholder: (provided) => ({
    ...provided,
    color: '#FAF9F6',
    fontFamily: 'Inter, sans-serif',
    fontSize: '1rem',
  }),
  input: (provided) => ({
    ...provided,
    color: '#FAF9F6',
    fontSize: '1rem',
    padding: '0',
    margin: '0',
  }),
  singleValue: (provided) => ({
    ...provided,
    color: '#FAF9F6',
  }),
  dropdownIndicator: (provided, state) => ({
    ...provided,
    color: state.isFocused ? '#145214' : '#FAF9F6',
  }),
  indicatorSeparator: () => ({
    display: 'none',
  }),
  menu: (provided) => ({
    ...provided,
    backgroundColor: '#FAF9F6',
    borderRadius: '0',
    border: '1px solid #fff',
    marginTop: '0',
    zIndex: "10",
    width: "10rem",
  }),
  option: (provided, state) => ({
    ...provided,
    backgroundColor: state.isSelected ? '#145214' : 'transparent',
    color: state.isSelected ? '#fff' : '#1D1B26',
    fontSize: '1rem',
    ':active': {
      backgroundColor: '#333',
    },
    ':hover': {
      backgroundColor: '#222',
    },
  }),
};

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

  const [error, setError] = useState(''); // State to track errors


  const handleChange = (name, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    setError(''); // Clear error when user starts typing
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Check for empty fields
    const emptyFields = Object.keys(formData).filter(key => !formData[key]);

    if (emptyFields.length > 0) {
      setError('Please fill out all fields before submitting.');
    } else {
      console.log(formData);
      // Submit the form or perform other actions
    }
  };

  const roleOptions = [
    { value: 'General Manager / Managing Director', label: 'General Manager / Managing Director' },
    { value: 'Analyst / Coordinator', label: 'Analyst / Coordinator' },
    { value: 'Assistant', label: 'Assistant' },
    { value: 'Business Unit Head', label: 'Business Unit Head' },
    { value: 'C-Level', label: 'C-Level' },
    { value: 'Director', label: 'Director' },
    { value: 'Manager', label: 'Manager' },
    { value: 'President', label: 'President' },
    { value: 'VP / SVP', label: 'VP / SVP' },
    { value: 'Professor', label: 'Professor' },
    { value: 'Student', label: 'Student' },
    { value: 'Other', label: 'Other' },
  ];

  const functionOptions = [
    { value: 'Sales', label: 'Sales' },
    { value: 'Strategy', label: 'Strategy' },
    { value: 'Operations', label: 'Operations' },
    { value: 'Digital / Technology', label: 'Digital / Technology' },
    { value: 'Legal', label: 'Legal' },
    { value: 'People / HR', label: 'People / HR' },
    { value: 'Marketing', label: 'Marketing' },
    { value: 'Research / Insights', label: 'Research / Insights' },
    { value: 'Procurement', label: 'Procurement' },
    { value: 'Finance', label: 'Finance' },
    { value: 'Experience', label: 'Experience' },
    { value: 'Communications / PR', label: 'Communications / PR' },
    { value: 'Product / Innovation', label: 'Product / Innovation' },
    { value: 'Design', label: 'Design' },
    { value: 'Brand', label: 'Brand' },
  ];

  const countryOptions = [
    { value: 'USA', label: 'USA' },
    { value: 'Canada', label: 'Canada' },
    { value: 'Texas', label: 'Texas' },
  ];

  return (
    <div className="talk-page">
      <Navbar />
      <div className="talk-content">
        <div className='talk-box'>
          <h1>Ready to Explore?</h1>
          <p>
            Have a business need or an RFP to submit? Interested in discussing your company's growth prospects? Provide your contact information and we'll put you in touch with the appropriate expert.
          </p>
          <form className="talk-form" onSubmit={handleSubmit}>
            <h2>Let's Talk</h2>
            {error && <p className="error-message">{error}</p>} {/* Display error message */}
            <div className="form-row" id='name-line'>
              <span>Howdy, my name is </span>
              <label htmlFor="firstName">
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  placeholder="First Name*"
                  value={formData.firstName}
                  onChange={(e) => handleChange(e.target.name, e.target.value)}
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
                  onChange={(e) => handleChange(e.target.name, e.target.value)}
                  required
                />
                <span className="bottom-line"></span>
              </label>
              <span>.</span>
            </div>
            <div className="form-row" id='role-line'>
              <span>I'm a </span>
              <CustomDropdown
                id="role"
                name="role"
                options={roleOptions}
                value={roleOptions.find(option => option.value === formData.role)}
                onChange={(selectedOption) => handleChange('role', selectedOption.value)}
                styles={customStyles}
              />
              <span> in </span>
              <CustomDropdown
                id="function"
                name="function"
                options={functionOptions}
                value={functionOptions.find(option => option.value === formData.function)}
                onChange={(selectedOption) => handleChange('function', selectedOption.value)}
                styles={customStyles}
              />
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
                  onChange={(e) => handleChange(e.target.name, e.target.value)}
                  required
                />
                <span className="bottom-line"></span>
              </label>
              <span>, located in </span>
              <CustomDropdown
                id="country"
                name="country"
                options={countryOptions}
                value={countryOptions.find(option => option.value === formData.country)}
                onChange={(selectedOption) => handleChange('country', selectedOption.value)}
                styles={customStyles}
              />
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
                  onChange={(e) => handleChange(e.target.name, e.target.value)}
                  required
                />
                <span className="bottom-line"></span>
              </label>
              <span>.</span>
            </div>
            <button type="submit" className="cta-button" id='talk-cta-button'>Let's Get Started</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
