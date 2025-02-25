import React, { useState } from 'react';
import '../styles/Pricing.css';

const Pricing = () => {
  const [isYearly, setIsYearly] = useState(false);

  return (
    <section className="pricing-page">
      <div className="container">
        <h1>Simple Pricing</h1>
        <div className="pricing-toggle">
          <span className={!isYearly ? 'active' : ''}>Monthly</span>
          <label className="switch">
            <input 
              type="checkbox" 
              checked={isYearly}
              onChange={() => setIsYearly(!isYearly)}
            />
            <span className="slider"></span>
          </label>
          <span className={isYearly ? 'active' : ''}>Yearly</span>
          <div className="savings">Save 50%</div>
        </div>
        <div className="pricing-cards">
          <div className="pricing-card">
            <h3>Free</h3>
            <div className="price">$0</div>
            <ul>
              <li>Single Car Management</li>
              <li>Basic Maintenance Tracking</li>
              <li>Service History</li>
              <li>Basic Reminders</li>
            </ul>
            <div className="store-buttons">
              <a href="https://apps.apple.com/app/logicar" className="store-button">
                <i className="fab fa-apple"></i> App Store
              </a>
              <a href="https://play.google.com/store/apps/details?id=com.logicar" className="store-button">
                <i className="fab fa-google-play"></i> Google Play
              </a>
            </div>
          </div>
          <div className="pricing-card featured">
            <h3>Premium</h3>
            <div className="price">
              {isYearly ? '$49.99/year' : '$4.99/month'}
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
              <a href="https://apps.apple.com/app/logicar" className="store-button">
                <i className="fab fa-apple"></i> App Store
              </a>
              <a href="https://play.google.com/store/apps/details?id=com.logicar" className="store-button">
                <i className="fab fa-google-play"></i> Google Play
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Pricing; 