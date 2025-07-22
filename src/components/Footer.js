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
            <div className="footer-logo">
              <img src={process.env.PUBLIC_URL + "/logoNBG.png"} alt="LogiCar Logo" />
              <span className="logo-text">
                <span className="logi-text">Logi</span><span className="car-text">Car</span>
              </span>
            </div>
            <p>Your smart car maintenance assistant</p>
            <p className="footer-tagline">Never miss a service again.</p>
            <div className="app-badges">
              <button onClick={scrollToSignup} className="signup-link">
                <i className="fas fa-bell"></i> Notify Me
              </button>
            </div>
          </div>
          
          <div className="footer-section">
            <h4>Quick Links</h4>
            <Link to="/">Home</Link>
            <Link to="/features">Features</Link>
            <Link to="/pricing">Pricing</Link>
          </div>
          
          <div className="footer-section">
            <h4>Legal</h4>
            <Link to="/privacy">Privacy Policy</Link>
            <Link to="/terms">Terms of Service</Link>
            <Link to="/cookies">Cookie Policy</Link>
          </div>
          
          <div className="footer-section">
            <h4>Connect With Us</h4>
            <p>Email: reply.logicar@gmail.com</p>
            <div className="social-links">
              <a href="https://twitter.com/logicar_app" target="_blank" rel="noopener noreferrer">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor" style={{ marginTop: "1px" }}>
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"></path>
                </svg>
              </a>
              <a href="https://instagram.com/logicar.app" target="_blank" rel="noopener noreferrer">
                <i className="fab fa-instagram"></i>
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