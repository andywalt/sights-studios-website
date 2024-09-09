import React, { useState, useRef } from 'react';
import './ContactSection.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faCheck } from '@fortawesome/free-solid-svg-icons';

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
  const submitButtonRef = useRef(null); // Ref to target the submit button
  const [showCheckmark, setShowCheckmark] = useState(false);




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


  const handleSubmit = async (e) => {
    e.preventDefault();

    // Get the dimensions and position of the container and button
    const containerRect = document.querySelector('.contact-section').getBoundingClientRect();

    // Create a GSAP timeline
    const tl = gsap.timeline({
      onComplete: () => setFormSubmitted(true), // Trigger form submission upon completion
    });

    // Step 1: Log the click event
    tl.call(() => {
      console.log('Submit button clicked!');
    });
    

    // Step 2: Shrink the button into a circle and remove the "Submit" text
    tl.to(submitButtonRef.current, {
      width: 50,
      height: 50,
      borderRadius: '50%',
      duration: 0.5,
      backgroundColor: '#28a745',
      ease: 'power2.out',
      marginTop: "0px",
      onStart: () => {
        // Remove the "Submit" text
        submitButtonRef.current.innerHTML = '';
      }
    });

    // Step 3: Perform the data submission
    tl.call(async () => {
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
          console.log("Data submitted successfully");
        } else {
          alert('There was an error sending your message.');
          throw new Error('Data submission failed');
        }
      } catch (error) {
        alert('There was an error sending your message.');
        console.error('Error:', error);
        // Abort the animation if there's an error
        tl.kill(); // Stop the animation timeline
      }
    });

    // Step 4: Fade out the heading, subheading, and form
    tl.to(['.contact-titles', '.contact-form-container'], {
      opacity: 0,
      duration: 0.7,
      ease: 'power1.inOut',
      onComplete: () => {
        document.querySelectorAll('.contact-titles, .contact-form-container')
          .forEach(el => el.style.display = 'none'); // Hide the elements after fading out
      }
    });

    // Step 5: Lock container size
    tl.set('.contact-section', {
      height: containerRect.height,
      padding: "0px",
    });

    // Step 6: Scroll the viewport to center the button
    tl.call(() => {
      const buttonRect = submitButtonRef.current.getBoundingClientRect();
      window.scrollTo({
        top: window.scrollY + buttonRect.top - window.innerHeight / 2 + buttonRect.height / 2,
        behavior: 'smooth',
      });
    });


    // Step 3: Show checkmark after shrinking
    tl.call(() => {
      setShowCheckmark(true); // Show the checkmark
    }, null, '+=1');

    // Step 7: Grow the circle
    tl.to(submitButtonRef.current, {
      width: 250,
      height: 250,
      borderRadius: '50%',
      duration: 0.5,
      backgroundColor: '#28a745',
      ease: 'power2.out',
    });

    // Step 8: Add a 1.5-second pause before the completion
    tl.to({}, { duration: 1.5 });

    // Step 9: Fade out the circle and fade in the success message
    tl.to(submitButtonRef.current, {
      opacity: 0,
      duration: 0.5,
      ease: 'power2.out',
      onComplete: () => {
        submitButtonRef.current.style.display = 'none'; // Hide the circle after fading out
      }
    });

    tl.to('.success-message', {
      opacity: 1,
      duration: 1,
      ease: 'power2.out',
      onStart: () => {
        document.querySelector('.success-message').style.display = 'block'; // Ensure the success message is visible
      }
    }, '+=0.3'); // Start fading in the success message after a slight delay
    

    // Uncomment the following line to debug the timeline:
    tl.eventCallback("onUpdate", () => console.log("Timeline progress:", tl.progress()));
  };
  

  return (
    <div className="contact-section">
      <div className='contact-area'>
        {!formSubmitted ? (
          <>
            <div className='contact-titles'>
              <h2 className="contact-heading">Get in Touch</h2>
              <p className="contact-subheading">We'd love to hear from you (but don't want to be annoying).</p>
            </div>

            {/* Form Container */}
            <div className="contact-form-container">
              <div className="contact-form-input-groups">
                <div>
                  <h3 className="form-section-title">Fill out your work details.</h3>
                  <div className="contact-form">
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
                </div>
                <div>
                  <h3 className="form-section-title">How can we help?</h3>
                  <div className="checkbox-group">
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
                
              </div>
            </div>
            <button type="submit" ref={submitButtonRef} className="cta-button" onClick={handleSubmit}>
              {showCheckmark ? <FontAwesomeIcon icon={faCheck} className="check-icon" /> : 'Submit'}
            </button>
          </>
        ) : null}
      </div>
  
  {/* Always include the success-message in the DOM but hide it initially */}
  <div className="success-message" style={{ display: formSubmitted ? 'block' : 'none', opacity: 0 }}>
      <h2>We can't wait to get started with you!</h2>
      <p>We will reach out by email very soon.</p>
    </div>
  </div>
  
  );
};

export default ContactSection;
