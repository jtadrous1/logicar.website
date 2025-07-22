import React, { useEffect, useRef, useState } from 'react';
import SignUp from '../components/SignUp';
import useDeviceDetect from '../hooks/useDeviceDetect';
import '../styles/Home.css';

// Intersection Observer Hook for reveal animations
const useIntersectionObserver = (options = {}) => {
  const [ref, setRef] = useState(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (!ref) return;

    const observer = new IntersectionObserver(([entry]) => {
      setIsVisible(entry.isIntersecting);
    }, options);

    observer.observe(ref);

    return () => {
      observer.disconnect();
    };
  }, [ref, options]);

  return [setRef, isVisible];
};

const Home = () => {
  const { isMobile } = useDeviceDetect();
  // eslint-disable-next-line no-unused-vars
  const [scrolled, setScrolled] = useState(false);
  
  // Refs for revealing sections on scroll
  const [featuresSectionRef, featuresVisible] = useIntersectionObserver({ threshold: 0.1 });
  const [problemSectionRef, problemVisible] = useIntersectionObserver({ threshold: 0.1 });
  const [ctaSectionRef, ctaVisible] = useIntersectionObserver({ threshold: 0.1 });
  
  // Ref for screenshot slider
  const screenshotsRef = useRef(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  
  // Handle scroll events
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 80);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Auto-slide functionality for mobile screenshots
  useEffect(() => {
    if (!isMobile || !screenshotsRef.current) return;
    
    const screenshotsWrapper = screenshotsRef.current;
    const screenshots = screenshotsWrapper.querySelectorAll('.mobile-screenshot');
    
    if (screenshots.length === 0) return;
    
    const autoSlideInterval = setInterval(() => {
      const nextSlide = (currentSlide + 1) % screenshots.length;
      
      const slideWidth = screenshots[0].offsetWidth + 30; // width + margin
      screenshotsWrapper.scrollTo({
        left: nextSlide * slideWidth,
        behavior: 'smooth'
      });
      
      setCurrentSlide(nextSlide);
    }, 3000); // Change slide every 3 seconds
    
    // Pause auto-sliding when user interacts with the slider
    const handleInteraction = () => {
      clearInterval(autoSlideInterval);
      
      // After 5 seconds of inactivity, resume auto-sliding
      setTimeout(() => {
        const currentScrollPosition = screenshotsWrapper.scrollLeft;
        const slideWidth = screenshots[0].offsetWidth + 30;
        const currentSlideIndex = Math.round(currentScrollPosition / slideWidth);
        
        setCurrentSlide(currentSlideIndex);
      }, 5000);
    };
    
    screenshotsWrapper.addEventListener('touchstart', handleInteraction);
    screenshotsWrapper.addEventListener('mousedown', handleInteraction);
    
    return () => {
      clearInterval(autoSlideInterval);
      if (screenshotsWrapper) {
        screenshotsWrapper.removeEventListener('touchstart', handleInteraction);
        screenshotsWrapper.removeEventListener('mousedown', handleInteraction);
      }
    };
  }, [isMobile, currentSlide]);

  return (
    <div className="home">
      {/* Hero Section */}
      <section className="hero">
        <div className="container">
          <div className="hero-content">
            <h1>Your Personal Car Maintenance Tracker</h1>
            <p>Never miss a service again. Track maintenance, get AI-powered advice, and keep your car in perfect condition.</p>
            <div className="coming-soon">
              <button 
                onClick={() => window.location.href = '/signup'} 
                className="waitlist-button primary-cta"
              >
                Create Account
              </button>
              <button 
                onClick={() => document.getElementById('signup').scrollIntoView({ behavior: 'smooth' })} 
                className="waitlist-button secondary-cta"
              >
                Get Notified
              </button>
            </div>
          </div>
          <div className="hero-image">
            {isMobile ? (
              // Mobile version - simpler, more compact view
              <img 
                src={process.env.PUBLIC_URL + "/images/my-garage.png?v=2"}
                alt="LogiCar App Preview" 
                className="mobile-preview"
                loading="lazy" 
              />
            ) : (
              // Desktop version - more elaborate with iPhone frame
              <div className="iphone-frame">
                <div className="volume-up"></div>
                <div className="volume-down"></div>
                <div className="power-button"></div>
                <div className="notch"></div>
                <div className="screen">
                  <img 
                    src={process.env.PUBLIC_URL + "/images/my-garage.png?v=2"}
                    alt="LogiCar App Preview" 
                    loading="lazy" 
                  />
                </div>
              </div>
            )}
          </div>
        </div>
        
        {/* Scroll indicator */}
        <div className="scroll-indicator">
          <div className="mouse">
            <div className="wheel"></div>
          </div>
          <div className="arrow-scroll">
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
      </section>

      {/* Sign Up Section */}
      <SignUp />

      {/* Problem Solution Section */}
      <section 
        ref={problemSectionRef}
        className={`problem-solution ${problemVisible ? 'animated' : ''}`}
      >
        <div className="container">
          <div className="section-header">
            <h2>Why LogiCar?</h2>
            <p>Car maintenance shouldn't be complicated</p>
          </div>
          <div className={`problem-solution-grid ${isMobile ? 'mobile-grid' : ''}`}>
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
      <section 
        ref={featuresSectionRef}
        className={`features-preview ${featuresVisible ? 'animated' : ''}`}
      >
        <div className="container">
          <div className="section-header">
            <h2>Powerful Features</h2>
            <p>Everything you need to maintain your car</p>
          </div>
          <div className={`features-grid ${isMobile ? 'mobile-grid' : ''}`}>
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

      {/* App Screenshots - Only show on tablet/desktop */}
      {!isMobile && (
        <section className="app-screenshots" id="screenshots">
          <div className="container">
            <div className="screenshots-wrapper">
              <div className="screenshot">
                <img 
                  src={process.env.PUBLIC_URL + "/images/my-garage.png?v=2"}
                  alt="Maintenance Dashboard"
                />
              </div>
              <div className="screenshot">
                <img
                  src={process.env.PUBLIC_URL + "/images/mechanic-ai.png?v=2"}
                  alt="AI Assistant"
                />
              </div>
              <div className="screenshot">
                <img
                  src={process.env.PUBLIC_URL + "/images/service-history.png?v=2"}
                  alt="Service History"
                />
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Mobile App Screenshot - Only show on mobile */}
      {isMobile && (
        <section className="mobile-app-screenshot" id="screenshots">
          <div className="container">
            <div className="mobile-screenshots-wrapper" ref={screenshotsRef}>
            <div className="mobile-screenshot">
              <img 
                src={process.env.PUBLIC_URL + "/images/my-garage.png?v=2"}
                alt="Maintenance Dashboard"
              />
                <div className="screenshot-caption">Dashboard View</div>
              </div>
              <div className="mobile-screenshot">
                <img 
                  src={process.env.PUBLIC_URL + "/images/mechanic-ai.png?v=2"}
                  alt="AI Assistant"
                />
                <div className="screenshot-caption">AI Mechanic</div>
              </div>
              <div className="mobile-screenshot">
                <img 
                  src={process.env.PUBLIC_URL + "/images/service-history.png?v=2"}
                  alt="Service History"
                />
                <div className="screenshot-caption">Service History</div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section 
        ref={ctaSectionRef}
        className={`cta ${ctaVisible ? 'animated' : ''}`} 
        id="download"
      >
        <div className="container">
          <h2>Ready to Get Started?</h2>
          <p>Create your account now and be ready when we launch</p>
          <div className="cta-buttons">
            <button 
              onClick={() => window.location.href = '/signup'} 
              className="cta-button primary"
            >
              Create Account
            </button>
            <button 
              onClick={() => document.getElementById('signup').scrollIntoView({ behavior: 'smooth' })} 
              className="cta-button secondary"
            >
              Get Notified
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home; 