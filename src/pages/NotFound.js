import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/NotFound.css';

const NotFound = () => {
  return (
    <div className="not-found-container">
      <div className="not-found-content">
        <div className="error-code">404</div>
        <h1 className="error-title">Page Not Found</h1>
        <p className="error-message">
          Oops! The page you're looking for doesn't exist. It might have been moved, deleted, or you entered the wrong URL.
        </p>
        <div className="not-found-actions">
          <Link to="/" className="btn-home">
            Go Back Home
          </Link>
          <Link to="/features" className="btn-features">
            Explore Features
          </Link>
        </div>
        <div className="helpful-links">
          <h3>Popular Pages:</h3>
          <ul>
            <li><Link to="/features">Features</Link></li>
            <li><Link to="/pricing">Pricing</Link></li>
            <li><Link to="/ambassador">Ambassador Program</Link></li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default NotFound; 