import React from 'react';
import './footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section about">
          <h4>AI & Business Efficiencies Consulting</h4>
          <p>
            We provide cutting-edge AI solutions to streamline business processes, improve efficiencies, and drive profitability.
          </p>
        </div>

        <div className="footer-section quick-links">
          <h4>Quick Links</h4>
          <ul>
            <li><a href="/about">About Us</a></li>
            <li><a href="/services">Our Services</a></li>
            <li><a href="/contact">Contact</a></li>
          </ul>
        </div>

        <div className="footer-section contact">
          <h4>Contact Us</h4>
          <p>Email: <a href="mailto:andy@sightsstudios.com">info@sightsstudios.com</a></p>
          <p>Address: 395 Comfort Maple Lane, Dripping Springs, USA</p>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© 2024 Sights Studios. All rights reserved.</p>
        <p>Made with coffee and care.</p>
        <div className="footer-links">
          <a href="/coming-soon">Privacy Policy</a>
          <a href="/coming-soon">Terms of Service</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
