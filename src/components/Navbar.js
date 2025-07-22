import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import '../styles/Navbar.css';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { user, userRole, logout } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
      setIsMobileMenuOpen(false);
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
      setIsMobileMenuOpen(false);
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
      <div className="navbar-container">
        <Link to="/" className="logo">
          <img src={process.env.PUBLIC_URL + "/logoNBG.png"} alt="LogiCar Logo" />
          <span className="logo-text">
            <span className="logi-text">Logi</span><span className="car-text">Car</span>
          </span>
        </Link>
        <div className="mobile-menu-button" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
          <span></span>
          <span></span>
          <span></span>
        </div>
        <div className={`nav-links ${isMobileMenuOpen ? 'active' : ''}`}>
          <Link to="/features">Features</Link>
          <Link to="/pricing">Pricing</Link>
          {!user && <Link to="/ambassador">Ambassador</Link>}
          {user ? (
            <>
              <Link to={userRole === 'ambassador' ? '/ambassador/dashboard' : '/dashboard'}>
                Dashboard
              </Link>
              <button 
                onClick={handleLogout}
                className="logout-nav-button"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="login-nav-link">Login</Link>
              <Link to="/signup" className="signup-nav-link">Sign Up</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar; 