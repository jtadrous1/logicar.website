import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Footer.css';

const Footer = () => {
  const scrollToSignup = () => {
    const signupSection = document.getElementById('signup');
    if (signupSection) {
      signupSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-section">
            <h4>LogiCar</h4>
            <p>Your smart car maintenance assistant</p>
            <p className="footer-tagline">Never miss a service again.</p>
            <div className="app-badges">
              <button onClick={scrollToSignup} className="signup-link">
                <i className="fas fa-bell"></i> Get Launch Updates
              </button>
            </div>
          </div>
          
          <div className="footer-section">
            <h4>Quick Links</h4>
            <Link to="/">Home</Link>
            <Link to="/features">Features</Link>
            <Link to="/pricing">Pricing</Link>
            <a href="#signup">Sign Up</a>
          </div>
          
          <div className="footer-section">
            <h4>Legal</h4>
            <Link to="/privacy">Privacy Policy</Link>
            <Link to="/terms">Terms of Service</Link>
            <Link to="/cookies">Cookie Policy</Link>
          </div>
          
          <div className="footer-section">
            <h4>Connect With Us</h4>
            <p>Email: support@logicar.com</p>
            <div className="social-links">
              <a href="https://facebook.com/logicar" target="_blank" rel="noopener noreferrer">
                <i className="fab fa-facebook"></i>
              </a>
              <a href="https://twitter.com/logicar" target="_blank" rel="noopener noreferrer">
                <i className="fab fa-twitter"></i>
              </a>
              <a href="https://instagram.com/logicar.app" target="_blank" rel="noopener noreferrer">
                <i className="fab fa-instagram"></i>
              </a>
              <a href="https://linkedin.com/company/logicar" target="_blank" rel="noopener noreferrer">
                <i className="fab fa-linkedin"></i>
              </a>
            </div>
          </div>
        </div>
        
        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} LogiCar. All rights reserved.</p>
          <p className="footer-credits">Made with <i className="fas fa-heart"></i> for car owners everywhere</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 