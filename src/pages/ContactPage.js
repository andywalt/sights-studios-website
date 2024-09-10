import React, { useState, useRef } from 'react';
import Navbar from '../components/Navbar/navBar';
import CustomDropdown from '../components/ContactPage/CustomDropdownComponent.js';
import '../components/ContactPage/ContactPage.css';

import { gsap } from 'gsap';


/* Custom styles for React Select */
const customStyles = {
  // Styles for the main control (input field and dropdown container)
  control: (provided, state) => ({
    ...provided, // Merges the default styles with custom ones
    backgroundColor: 'transparent',
    border: state.isFocused ? 'none' : 'none',
    borderBottom: state.isFocused ? '1px solid #FAF9F6' : '1px solid #145214',
    borderRadius: '0',
    boxShadow: 'none',
    minHeight: 'auto',
    padding: '0',
    flexGrow: 1, // Allows the control to expand and fill available space
    minWidth: "250px", // Sets a minimum width for the control
    fontFamily: 'Inter, sans-serif',
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
    fontSize: '1.2rem',
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
    backgroundColor: '#145214',
    borderRadius: '0',
    border: '1px solid #fff',
    marginTop: '0',
    zIndex: "10",
    width: '100%', // Ensures the menu matches the width of the control
    minWidth: '150px', // Matches the minimum width of the control
  }),
  option: (provided, state) => ({
    ...provided,
    backgroundColor: state.isSelected ? '#1D1B26' : 'transparent',
    color: state.isSelected ? '#145214' : '#FAF9F6',
    fontSize: '1rem',
    ':active': {
      backgroundColor: '#145214',
    },
    ':hover': {
      backgroundColor: '#1D1B26',
    },
  }),
};

const ContactPage = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    role: '',
    industry: '',
    company: '',
    country: '',
    email: '',
  });

  const [errors, setErrors] = useState(''); // State to track errors
  const [story, setStory] = useState(''); // State variable to hold the story

  const storyRef = useRef(null); // Ref to target the story for animation



  const handleChange = (name, value) => {
    // Update formData state without triggering error validation
    setFormData((prevData) => ({
        ...prevData,
        [name]: value,
    }));
  };




  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Submit button clicked, form submission process started.");

    let newErrors = {};

    // Validate form fields and collect errors
    if (!formData.firstName) newErrors.firstName = 'First Name is required';
    if (!formData.lastName) newErrors.lastName = 'Last Name is required';
    if (!formData.role) newErrors.role = 'Role is required';
    if (!formData.industry) newErrors.industry = 'Industry is required';
    if (!formData.company) newErrors.company = 'Company is required';
    if (!formData.country) newErrors.country = 'Country is required';
    if (!formData.email) newErrors.email = 'Email is required';

    // Update state with errors
    setErrors(newErrors);

    // Log the errors to the console
    console.log('Validation errors:', newErrors);

    // Only proceed with the form submission if there are no errors
    if (Object.keys(newErrors).length === 0) {
        // Proceed with API submission
        triggerSuccessAnimation();
        // Submit the form via API
        await submitForm();

        // Generate and display the story
        generateStory();
    }
  };

  const generateStory = () => {
    const generatedStory = (
        <p>
            <span className="underline">{formData.firstName || '[First Name]'}</span><span> </span>
            <span className="underline"> {formData.lastName || '[Last Name]'}</span> was a brilliant 
            <span className="underline"> {formData.role || '[Role]'}</span> that transformed the 
            <span className="underline"> {formData.industry || '[Industry]'}</span> division by partnering with Sights Studios! 
            Together, they helped accelerate 
            <span className="underline"> {formData.company || '[Company]'}</span>'s growth and became the envy of all of 
            <span className="underline"> {formData.country || '[Country]'}</span>. All they had to do was respond to the email we sent to 
            <span className="underline"> {formData.email || '[Email]'}</span> and voila! The adventure began!
        </p>
    );

    // Update the story state
    setStory(generatedStory);

    // Trigger GSAP animation after ensuring the storyRef exists
    setTimeout(() => {
        if (storyRef.current) {
            gsap.fromTo(storyRef.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 1 });
        }
    }, 0); // Adjust timeout if needed, this ensures the element is in the DOM
};


  const submitForm = async () => {
    const data = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        role: formData.role,
        industry: formData.industry,
        company: formData.company,
        country: formData.country,
        email: formData.email,
    };

    // Trigger the animation before proceeding with the API call
    triggerSuccessAnimation();

    try {
        const response = await fetch('https://kzqn99dlj1.execute-api.us-east-1.amazonaws.com/default/sights-studios-contactpage-form', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ body: JSON.stringify(data) }), // Wrapping data in a body object
        });

        if (response.ok) {
            console.log('Form submitted successfully!');
        } else {
            console.error('Error submitting the form.');
            // Handle errors (e.g., show an error message)
        }
    } catch (error) {
        console.error('Request failed', error);
        // Handle errors (e.g., show an error message)
    } 
  };

  

  const roleOptions = [
    { value: 'General Manager', label: 'General Manager' },
    { value: 'Coordinator', label: 'Coordinator' },
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

  const industryOptions = [
    { value: 'Sales', label: 'Sales' },
    { value: 'Strategy', label: 'Strategy' },
    { value: 'Operations', label: 'Operations' },
    { value: 'Tech', label: 'Tech' },
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

  const [showSuccess, setShowSuccess] = useState(false);

  const triggerSuccessAnimation = () => {
      const button = document.getElementById('talk-cta-button');
      button.classList.add('success-animation', 'grow');

      setTimeout(() => {
          setShowSuccess(true); // Show the success message after animation
          button.classList.remove('grow'); // Reset the button scale after animation
      }, 1000); // Wait 1 second for the animation to complete
  };

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
                />
                <span className="bottom-line"></span>
                {errors.firstName && <span className="error-message">{errors.firstName}</span>}

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
                />
                <span className="bottom-line"></span>
                {errors.lastName && <span className="error-message">{errors.lastName}</span>}
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
              {errors.role && <span className="error-message">{errors.role}</span>}
              <span> in </span>
              <CustomDropdown
                id="industry"
                name="industry"
                options={industryOptions}
                value={industryOptions.find(option => option.value === formData.industry)}
                onChange={(selectedOption) => handleChange('industry', selectedOption.value)}
                styles={customStyles}
              />
              {errors.industry && <span className="error-message">{errors.industry}</span>}
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
                />
                <span className="bottom-line"></span>
                {errors.company && <span className="error-message">{errors.company}</span>}
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
              {errors.country && <span className="error-message">{errors.country}</span>}
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
                />
                <span className="bottom-line"></span>
                {errors.email && <span className="error-message">{errors.email}</span>}
              </label>
              <span>.</span>
            </div>
            <button type="submit" className="cta-button" id='talk-cta-button'>
                        {showSuccess ? 'Here We Go!' : "Let's Get Started"}
            </button>
          </form>
           {/* Display the story after successful submission */}
           {story && (
                <div className="success-message show" ref={storyRef}>
                    {story}
                </div>
            )}
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
