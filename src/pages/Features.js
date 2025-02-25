import React from 'react';
import '../styles/Features.css';

const Features = () => {
  return (
    <section className="features-page">
      <div className="container">
        <h1>Features</h1>
        <div className="features-grid">
          <div className="feature-card">
            <i className="fas fa-car"></i>
            <h3>Multi-Car Management</h3>
            <p>Track and manage multiple vehicles in one convenient place</p>
          </div>
          <div className="feature-card">
            <i className="fas fa-tools"></i>
            <h3>Maintenance Tracking</h3>
            <p>Log and track all your maintenance activities with ease</p>
          </div>
          <div className="feature-card">
            <i className="fas fa-bell"></i>
            <h3>Smart Reminders</h3>
            <p>Never miss important maintenance with customized notifications</p>
          </div>
          <div className="feature-card">
            <i className="fas fa-robot"></i>
            <h3>AI Assistant</h3>
            <p>Get expert advice and maintenance suggestions powered by AI</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;