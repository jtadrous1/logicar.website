import React from 'react';
import SignUp from '../components/SignUp';
import '../styles/Home.css';

const Home = () => {
  return (
    <div className="home">
      {/* Hero Section */}
      <section className="hero">
        <div className="container">
          <div className="hero-content">
            <h1>Your Personal Car Maintenance Tracker</h1>
            <p>Never miss a service again. Track maintenance, get AI-powered advice, and keep your car in perfect condition.</p>
            <div className="coming-soon">
              <span className="coming-soon-badge">Coming Soon</span>
              <p className="coming-soon-text">Our app is currently in development. Sign up to be notified when we launch!</p>
            </div>
          </div>
          <div className="hero-image">
            <div className="iphone-frame">
              <div className="notch"></div>
              <div className="screen">
                <img 
                  src={process.env.PUBLIC_URL + "/images/my-garage.png"}
                  alt="LogiCar App Preview"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Sign Up Section */}
      <SignUp />

      {/* Problem Solution Section */}
      <section className="problem-solution">
        <div className="container">
          <div className="section-header">
            <h2>Why LogiCar?</h2>
            <p>Car maintenance shouldn't be complicated</p>
          </div>
          <div className="problem-solution-grid">
            <div className="problem-card">
              <h3>The Problem</h3>
              <ul>
                <li>
                  <i className="fas fa-times-circle"></i>
                  <span>Forgetting maintenance schedules</span>
                </li>
                <li>
                  <i className="fas fa-times-circle"></i>
                  <span>Uncertainty about service intervals</span>
                </li>
                <li>
                  <i className="fas fa-times-circle"></i>
                  <span>Expensive unnecessary repairs</span>
                </li>
              </ul>
            </div>
            <div className="solution-card">
              <h3>Our Solution</h3>
              <ul>
                <li>
                  <i className="fas fa-check-circle"></i>
                  <span>Smart maintenance reminders</span>
                </li>
                <li>
                  <i className="fas fa-check-circle"></i>
                  <span>AI-powered maintenance advice</span>
                </li>
                <li>
                  <i className="fas fa-check-circle"></i>
                  <span>Customizable service tracking</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Key Features Section */}
      <section className="features-preview">
        <div className="container">
          <div className="section-header">
            <h2>Powerful Features</h2>
            <p>Everything you need to maintain your car</p>
          </div>
          <div className="features-grid">
            <div className="feature-preview-card">
              <i className="fas fa-tools"></i>
              <h3>Maintenance Tracking</h3>
              <p>Log and track all your maintenance activities with ease</p>
            </div>
            <div className="feature-preview-card">
              <i className="fas fa-robot"></i>
              <h3>AI Assistant</h3>
              <p>Get expert advice and answers to all your car-related questions</p>
            </div>
            <div className="feature-preview-card">
              <i className="fas fa-bell"></i>
              <h3>Smart Reminders</h3>
              <p>Never miss important maintenance with customized notifications</p>
            </div>
            <div className="feature-preview-card">
              <i className="fas fa-sliders-h"></i>
              <h3>Custom Intervals</h3>
              <p>Set your own maintenance schedules based on your driving habits</p>
            </div>
          </div>
        </div>
      </section>

      {/* App Screenshots */}
      <section className="app-screenshots" id="screenshots">
        <div className="container">
          <div className="section-header">
            <h2>See It In Action</h2>
            <p>Simple, intuitive, and powerful</p>
          </div>
          <div className="screenshots-wrapper">
            <div className="screenshot">
              <img 
                src={process.env.PUBLIC_URL + "/images/my-garage.png"}
                alt="Maintenance Dashboard"
              />
            </div>
            <div className="screenshot">
              <img
                src={process.env.PUBLIC_URL + "/images/mechanic-ai.png"}
                alt="AI Assistant"
              />
            </div>
            <div className="screenshot">
              <img
                src={process.env.PUBLIC_URL + "/images/service-history.png"}
                alt="Service History"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Social Proof */}
      <section className="testimonials">
        <div className="container">
          <div className="section-header">
            <h2>Loved by Car Owners</h2>
            <p>Join thousands of satisfied users</p>
          </div>
          <div className="testimonials-grid">
            <div className="testimonial-card">
              <div className="testimonial-content">
                <p>"The AI assistant is like having a mechanic in my pocket. Saved me from unnecessary repairs!"</p>
              </div>
              <div className="testimonial-author">
                <i className="fas fa-user-circle"></i>
                <div>
                  <h4>Mike R.</h4>
                  <span>Honda Civic</span>
                </div>
              </div>
            </div>
            <div className="testimonial-card">
              <div className="testimonial-content">
                <p>"Finally, an app that lets me customize maintenance schedules to my actual needs."</p>
              </div>
              <div className="testimonial-author">
                <i className="fas fa-user-circle"></i>
                <div>
                  <h4>Lisa T.</h4>
                  <span>Toyota Camry</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta" id="download">
        <div className="container">
          <h2>Be Ready When We Launch</h2>
          <p>Sign up now to be the first to know when LogiCar is available</p>
          <div className="cta-buttons">
            <button 
              onClick={() => document.getElementById('signup').scrollIntoView({ behavior: 'smooth' })} 
              className="cta-button primary"
            >
              Sign Up for Updates
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home; 