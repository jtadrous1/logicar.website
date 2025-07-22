import React, { useState } from 'react';
import '../styles/Pricing.css';

const Pricing = () => {
  const [isYearly, setIsYearly] = useState(true);

  const scrollToSignup = () => {
    // Find the signup section on the home page
    const homePage = document.querySelector('.home');
    if (homePage) {
      // If we're on the home page, scroll to the signup section
      const signupSection = document.getElementById('signup');
      if (signupSection) {
        signupSection.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      // If we're not on the home page, navigate to the home page with the signup section
      window.location.href = '/#signup';
    }
  };

  return (
    <div className="pricing-page">
      <div className="pricing-header">
        <h1>Simple, Transparent Pricing</h1>
        <p>Choose the plan that works for you</p>
        <div className="pricing-toggle">
          <span className={!isYearly ? 'active' : ''}>Monthly</span>
          <label className="switch">
            <input type="checkbox" checked={isYearly} onChange={() => setIsYearly(!isYearly)} />
            <span className="slider round"></span>
          </label>
          <span className={isYearly ? 'active' : ''}>Yearly <span className="save-badge">Save 50%</span></span>
        </div>
      </div>
      <div className="pricing-container">
        <div className="pricing-cards">
          <div className="pricing-card">
            <h3>Free</h3>
            <div className="price">
              $0/month
            </div>
            <ul>
              <li>Basic Maintenance Tracking</li>
              <li>Service History</li>
              <li>Basic Reminders</li>
              <li>Single Car Management</li>
            </ul>
            <div className="store-buttons">
              <button onClick={scrollToSignup} className="signup-button">
                <i className="fas fa-bell"></i> Notify Me
              </button>
            </div>
          </div>
          <div className="pricing-card featured">
            <h3>Premium</h3>
            <div className="price">
              {isYearly ? '$59.99/year' : '$9.99/month'}
            </div>
            <ul>
              <li>Multiple Cars Management</li>
              <li>Advanced Maintenance Tracking</li>
              <li>Detailed Service History</li>
              <li>Custom Reminders</li>
              <li>PDF Report Export</li>
              <li>Priority Support</li>
            </ul>
            <div className="store-buttons">
              <button onClick={scrollToSignup} className="signup-button">
                <i className="fas fa-bell"></i> Notify Me
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pricing; 