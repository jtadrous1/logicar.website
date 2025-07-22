import React, { useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import '../styles/UserDashboard.css';

const UserDashboard = () => {
  const { user, userProfile, userRole, logout } = useAuth();
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const navigate = useNavigate();

  // Redirect if not logged in or not a regular user
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  
  if (userRole === 'ambassador') {
    return <Navigate to="/ambassador/dashboard" replace />;
  }

  const handleLogout = async () => {
    setIsLoggingOut(true);
    try {
      await logout();
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      setIsLoggingOut(false);
    }
  };

  const handleBecomeAmbassador = () => {
    navigate('/ambassador');
  };

  return (
    <div className="user-dashboard-page">
      {/* Header */}
      <header className="dashboard-header">
        <div className="container">
          <div className="header-content">
            <div className="welcome-section">
              <h1>Welcome back, {userProfile?.firstName}!</h1>
              <p>Manage your LogiCar account and vehicle maintenance</p>
            </div>
            <button 
              className="logout-button"
              onClick={handleLogout}
              disabled={isLoggingOut}
            >
              {isLoggingOut ? 'Signing Out...' : 'Sign Out'}
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="dashboard-main">
        <div className="container">
          {/* Profile Card */}
          <div className="profile-card">
            <h2>Your Profile</h2>
            <div className="profile-grid">
              <div className="profile-item">
                <label>Name</label>
                <span>{userProfile?.firstName} {userProfile?.lastName}</span>
              </div>
              <div className="profile-item">
                <label>Email</label>
                <span>{userProfile?.email || user.email}</span>
              </div>
              <div className="profile-item">
                <label>Member Since</label>
                <span>
                  {userProfile?.createdAt 
                    ? new Date(userProfile.createdAt.seconds * 1000).toLocaleDateString()
                    : 'Unknown'
                  }
                </span>
              </div>
              <div className="profile-item">
                <label>Account Type</label>
                <span>LogiCar User</span>
              </div>
            </div>
          </div>

          {/* Features Card */}
          <div className="features-card">
            <h2>Coming Soon</h2>
            <p>We're working hard to bring you amazing features:</p>
            <div className="features-grid">
              <div className="feature-item">
                <i className="fas fa-car"></i>
                <h3>Vehicle Management</h3>
                <p>Add and track multiple vehicles</p>
              </div>
              <div className="feature-item">
                <i className="fas fa-wrench"></i>
                <h3>Maintenance Tracking</h3>
                <p>Log services and track schedules</p>
              </div>
              <div className="feature-item">
                <i className="fas fa-bell"></i>
                <h3>Smart Reminders</h3>
                <p>Never miss important maintenance</p>
              </div>
              <div className="feature-item">
                <i className="fas fa-robot"></i>
                <h3>AI Assistant</h3>
                <p>Get expert car advice</p>
              </div>
            </div>
          </div>

          {/* Ambassador CTA Card */}
          <div className="ambassador-cta-card">
            <div className="cta-content">
              <h2>Become a LogiCar Ambassador</h2>
              <p>Love cars and want to earn rewards? Join our ambassador program and get exclusive perks, early access to features, and rewards for promoting LogiCar.</p>
              <div className="cta-benefits">
                <div className="benefit">
                  <i className="fas fa-star"></i>
                  <span>Exclusive Access</span>
                </div>
                <div className="benefit">
                  <i className="fas fa-gift"></i>
                  <span>Rewards & Perks</span>
                </div>
                <div className="benefit">
                  <i className="fas fa-users"></i>
                  <span>Community Access</span>
                </div>
              </div>
              <button className="ambassador-cta-button" onClick={handleBecomeAmbassador}>
                Apply to Become an Ambassador
              </button>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="actions-card">
            <h2>Quick Actions</h2>
            <div className="actions-grid">
              <button className="action-button">
                <i className="fas fa-edit"></i>
                Update Profile
              </button>
              <button className="action-button">
                <i className="fas fa-bell"></i>
                Notification Settings
              </button>
              <button className="action-button">
                <i className="fas fa-envelope"></i>
                Contact Support
              </button>
              <button className="action-button">
                <i className="fas fa-share-alt"></i>
                Share LogiCar
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default UserDashboard; 