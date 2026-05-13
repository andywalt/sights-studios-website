import React from 'react';
import { Link } from 'react-router-dom';
import './AIRescueSection.css';

const TAGS = ['Broken builds', 'Stalled MVPs', 'AI code debt', 'Ghost developers'];

const AIRescueSection = () => {
  return (
    <div className="ai-rescue-section">
      <div className="ai-rescue-inner">
        <span className="ai-rescue-badge">New Service</span>
        <h2 className="ai-rescue-headline">
          Your AI App Isn&apos;t Working.<br />
          <span className="ai-rescue-headline-accent">We Fix That.</span>
        </h2>
        <div className="ai-rescue-headline-underline" aria-hidden="true" />
        <p className="ai-rescue-body">
          Built something with Cursor, Bolt, Lovable, or v0 — and now it&apos;s broken, stuck, or just not what you needed? We assess, rescue, and rebuild so you stop losing time and money.
        </p>
        <div className="ai-rescue-tags">
          {TAGS.map(tag => (
            <span key={tag} className="ai-rescue-tag">{tag}</span>
          ))}
        </div>
        <div className="ai-rescue-ctas">
          <Link to="/contact" className="ai-rescue-cta-link">
            <button type="button" className="cta-button">Schedule a Call →</button>
          </Link>
          <Link to="/ai-rescue" className="ai-rescue-cta-link">
            <button type="button" className="cta-button-secondary">Learn More</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AIRescueSection;
