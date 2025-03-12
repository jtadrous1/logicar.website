import React, { useEffect, useState } from 'react';
import SignUp from '../components/SignUp';
import useDeviceDetect from '../hooks/useDeviceDetect';
import '../styles/Home.css';

// Animated number counter component
const AnimatedCounter = ({ target, duration = 2000, prefix = '', suffix = '' }) => {
  const [count, setCount] = useState(0);
  
  useEffect(() => {
    let startTime;
    let animationFrame;
    
    const updateCount = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      setCount(Math.floor(progress * target));
      
      if (progress < 1) {
        animationFrame = requestAnimationFrame(updateCount);
      }
    };
    
    animationFrame = requestAnimationFrame(updateCount);
    
    return () => cancelAnimationFrame(animationFrame);
  }, [target, duration]);
  
  return (
    <span>
      {prefix}{count}{suffix}
    </span>
  );
};

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
  const [testimonialsSectionRef, testimonialsVisible] = useIntersectionObserver({ threshold: 0.1 });
  const [ctaSectionRef, ctaVisible] = useIntersectionObserver({ threshold: 0.1 });
  
  // Handle scroll events
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 80);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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
                onClick={() => document.getElementById('signup').scrollIntoView({ behavior: 'smooth' })} 
                className="waitlist-button"
              >
                get added to the wait list
              </button>
            </div>
            
            {/* Stats Showcase */}
            <div className="stats-showcase">
              <div className="stat-item">
                <div className="stat-number"><AnimatedCounter target={86} suffix="%" /></div>
                <div className="stat-label">Car owners who delay maintenance</div>
              </div>
              <div className="stat-item">
                <div className="stat-number"><AnimatedCounter target={2800} prefix="$" /></div>
                <div className="stat-label">Avg. yearly savings</div>
              </div>
              <div className="stat-item">
                <div className="stat-number"><AnimatedCounter target={42} suffix="%" /></div>
                <div className="stat-label">Fewer unexpected repairs</div>
              </div>
            </div>
          </div>
          <div className="hero-image">
            {isMobile ? (
              // Mobile version - simpler, more compact view
              <img 
                src={process.env.PUBLIC_URL + "/images/my-garage.png"}
                alt="LogiCar App Preview" 
                className="mobile-preview"
                loading="lazy" 
              />
            ) : (
              // Desktop version - more elaborate with iPhone frame
              <div className="iphone-frame">
                <div className="notch"></div>
                <div className="screen">
                  <img 
                    src={process.env.PUBLIC_URL + "/images/my-garage.png"}
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
      )}

      {/* Mobile App Screenshot - Only show on mobile */}
      {isMobile && (
        <section className="mobile-app-screenshot" id="screenshots">
          <div className="container">
            <div className="section-header">
              <h2>See It In Action</h2>
              <p>Simple, intuitive, and powerful</p>
            </div>
            <div className="mobile-screenshot">
              <img 
                src={process.env.PUBLIC_URL + "/images/my-garage.png"}
                alt="Maintenance Dashboard"
              />
            </div>
          </div>
        </section>
      )}

      {/* Social Proof */}
      <section 
        ref={testimonialsSectionRef}
        className={`testimonials ${testimonialsVisible ? 'animated' : ''}`}
      >
        <div className="container">
          <div className="section-header">
            <h2>Loved by Car Owners</h2>
            <p>Join thousands of satisfied users</p>
          </div>
          <div className={`testimonials-grid ${isMobile ? 'mobile-grid' : ''}`}>
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
      <section 
        ref={ctaSectionRef}
        className={`cta ${ctaVisible ? 'animated' : ''}`} 
        id="download"
      >
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