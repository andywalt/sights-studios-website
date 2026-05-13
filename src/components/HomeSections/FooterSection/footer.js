import React from 'react';
import { Link } from 'react-router-dom';
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
            <li><Link to="/about">About Us</Link></li>
            <li><Link to="/services">Our Services</Link></li>
            <li><Link to="/contact">Contact</Link></li>
          </ul>
        </div>

        <div className="footer-section contact">
          <h4 className="footer-contact-heading">Get in touch</h4>
          <Link to="/contact" className="footer-cta">
            Contact Us
          </Link>
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
