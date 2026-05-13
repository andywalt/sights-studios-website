import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar/navBar';
import '../components/AIRescueSections/AIRescueSections.css';

const STEPS = [
  {
    number: '01',
    title: 'Assess',
    description: "We dig into your codebase, talk through what you need, and give you an honest picture of what's salvageable and what needs to be rebuilt."
  },
  {
    number: '02',
    title: 'Fix or Rebuild',
    description: "We fix what we can and rebuild what we must. No bloat, no unnecessary complexity — just working software."
  },
  {
    number: '03',
    title: 'Hand Off',
    description: "You get a working app, clean code, and the context to maintain or continue building it yourself or with your team."
  }
];

const TOOLS = ['Cursor', 'Bolt', 'Lovable', 'v0', 'Replit', 'ChatGPT'];

const AIRescuePage = () => {
  return (
    <div className="ai-rescue-page">
      <Navbar />

      <div className="air-hero">
        <span className="air-badge">AI App Rescue</span>
        <h1 className="air-headline">
          Your AI-Built App<br />
          <span className="air-headline-accent">Isn't a Lost Cause.</span>
        </h1>
        <p className="air-subheading">
          We specialize in rescuing, fixing, and rebuilding apps that were built with AI tools and didn't land where you needed them to.
        </p>
        <Link to="/contact">
          <button className="cta-button">Schedule a Call →</button>
        </Link>
      </div>

      <div className="air-who-section">
        <h2>Who This Is For</h2>
        <p>You used one of these tools to build something — and now you're stuck:</p>
        <div className="air-tools">
          {TOOLS.map(tool => (
            <span key={tool} className="air-tool-tag">{tool}</span>
          ))}
        </div>
        <p>Maybe the app works but not right. Maybe it worked and then broke. Maybe a developer built it with AI and now they're gone. Whatever the situation — we've seen it and we can help.</p>
      </div>

      <div className="air-process-section">
        <h2>What We Do</h2>
        <div className="air-steps">
          {STEPS.map(step => (
            <div key={step.number} className="air-step">
              <div className="air-step-number">{step.number}</div>
              <div className="air-step-content">
                <h3>{step.title}</h3>
                <p>{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="air-cta-section">
        <h2>Ready to Fix It?</h2>
        <p>Tell us what you built and where you're stuck. We'll take a look.</p>
        <Link to="/contact">
          <button className="cta-button">Schedule a Call →</button>
        </Link>
      </div>
    </div>
  );
};

export default AIRescuePage;
