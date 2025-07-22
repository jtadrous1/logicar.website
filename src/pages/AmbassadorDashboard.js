import { doc, getDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { db } from '../firebase';
import '../styles/AmbassadorDashboard.css';

const AmbassadorDashboard = () => {
  const { user, userProfile } = useAuth();
  const [ambassadorData, setAmbassadorData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAmbassadorData = async () => {
      if (!user) {
        setLoading(false);
        return;
      }
      
      try {
        console.log('Fetching ambassador data for user:', user.uid);
        const ambassadorDoc = await getDoc(doc(db, 'ambassadors', user.uid));
        
        if (ambassadorDoc.exists()) {
          const data = ambassadorDoc.data();
          console.log('Ambassador data found:', data);
          setAmbassadorData(data);
        } else {
          console.log('No ambassador document found for user:', user.uid);
          setAmbassadorData(null);
        }
      } catch (error) {
        console.error('Error fetching ambassador data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAmbassadorData();
  }, [user]);

  const getStatusColor = (status) => {
    switch (status) {
      case 'approved': return '#4CAF50';
      case 'pending': return '#FF9800';
      case 'rejected': return '#F44336';
      default: return '#FF9800'; // Default to pending color
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'approved': return 'Approved ✓';
      case 'pending': return 'Pending Review';
      case 'rejected': return 'Rejected';
      default: return 'Pending Review'; // Default to pending
    }
  };

  const getStatusDescription = (status) => {
    switch (status) {
      case 'approved': 
        return 'Congratulations! You are an approved LogiCar Ambassador.';
      case 'pending': 
        return 'Your application is under review. We\'ll notify you once it\'s processed.';
      case 'rejected': 
        return 'Your application was not approved at this time.';
      default: 
        return 'Your application is under review. We\'ll notify you once it\'s processed.';
    }
  };

  // Redirect if not logged in (after hooks)
  if (!user) {
    return <Navigate to="/ambassador/login" replace />;
  }

  if (loading) {
    return (
      <div className="ambassador-dashboard-page">
        <header className="dashboard-header">
          <div className="container">
            <div className="header-content">
              <div className="welcome-section">
                <h1>Loading...</h1>
                <p>Please wait while we load your dashboard</p>
              </div>
            </div>
          </div>
        </header>
      </div>
    );
  }

  // Use ambassadorData if available, fallback to userProfile
  const displayData = ambassadorData || userProfile;
  const currentStatus = ambassadorData?.status || 'pending';

  console.log('Current display data:', displayData);
  console.log('Current status:', currentStatus);

  return (
    <div className="ambassador-dashboard-page">
      {/* Header */}
      <header className="dashboard-header">
        <div className="container">
          <div className="header-content">
            <div className="welcome-section">
              <h1>Welcome back, Ambassador!</h1>
              <p>Manage your ambassador activities and track your progress</p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="dashboard-main">
        <div className="container">
          {/* Status Card */}
          <div className="status-card">
            <h2>Application Status</h2>
            <div className="status-info">
              <div 
                className="status-badge"
                style={{ backgroundColor: getStatusColor(currentStatus) }}
              >
                {getStatusText(currentStatus)}
              </div>
              <p className="status-description">
                {getStatusDescription(currentStatus)}
              </p>
              {!ambassadorData && (
                <p className="status-note">
                  <small>Note: If you just applied, it may take a moment for your application to appear.</small>
                </p>
              )}
            </div>
          </div>

          {/* Profile Information */}
          <div className="profile-card">
            <h2>Your Profile</h2>
            <div className="profile-grid">
              <div className="profile-item">
                <label>Email</label>
                <span>{displayData?.email || user.email}</span>
              </div>
              <div className="profile-item">
                <label>Instagram Handle</label>
                <span>{displayData?.igHandle || 'Not provided'}</span>
              </div>
              <div className="profile-item">
                <label>Car Information</label>
                <span>{displayData?.carInfo || 'Not provided'}</span>
              </div>
              <div className="profile-item">
                <label>Application Date</label>
                <span>
                  {displayData?.timestamp 
                    ? new Date(displayData.timestamp.seconds * 1000).toLocaleDateString()
                    : 'Unknown'
                  }
                </span>
              </div>
            </div>
          </div>

          {/* Ambassador Resources */}
          {currentStatus === 'approved' && (
            <div className="resources-card">
              <h2>Ambassador Resources</h2>
              <div className="resources-grid">
                <div className="resource-item">
                  <i className="fas fa-images"></i>
                  <h3>Brand Assets</h3>
                  <p>Download logos, graphics, and promotional materials</p>
                  <button className="resource-button">Download Assets</button>
                </div>
                <div className="resource-item">
                  <i className="fas fa-link"></i>
                  <h3>Referral Links</h3>
                  <p>Get your personalized referral links to share</p>
                  <button className="resource-button">Get Links</button>
                </div>
                <div className="resource-item">
                  <i className="fas fa-chart-line"></i>
                  <h3>Performance</h3>
                  <p>Track your referrals and engagement metrics</p>
                  <button className="resource-button">View Stats</button>
                </div>
                <div className="resource-item">
                  <i className="fas fa-comments"></i>
                  <h3>Community</h3>
                  <p>Connect with other ambassadors and get support</p>
                  <button className="resource-button">Join Community</button>
                </div>
              </div>
            </div>
          )}

          {/* Quick Actions */}
          <div className="actions-card">
            <h2>Quick Actions</h2>
            <div className="actions-grid">
              <button className="action-button">
                <i className="fas fa-edit"></i>
                Update Profile
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

export default AmbassadorDashboard; 