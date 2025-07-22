import { createUserWithEmailAndPassword, signOut } from 'firebase/auth';
import { collection, doc, getDocs, query, setDoc, Timestamp, where } from 'firebase/firestore';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { auth, db } from '../firebase';
import '../styles/Ambassador.css';

const Ambassador = () => {
  const { user, userRole, userProfile } = useAuth();
  const [formData, setFormData] = useState({
    email: user?.email || '',
    password: '',
    confirmPassword: '',
    igHandle: '',
    carInfo: '',
    whyJoin: '',
    wherePromote: ''
  });
  const [message, setMessage] = useState({ text: '', type: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  // If user is already an ambassador, redirect to dashboard
  if (userRole === 'ambassador') {
    navigate('/ambassador/dashboard');
    return null;
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // If user is logged in, we only need the ambassador-specific fields
    if (user) {
      if (!formData.igHandle || !formData.carInfo || !formData.whyJoin || !formData.wherePromote) {
        setMessage({ text: 'Please fill in all fields', type: 'error' });
        return;
      }
    } else {
      // If user is not logged in, validate all fields including email/password
      if (!formData.email || !formData.email.includes('@')) {
        setMessage({ text: 'Please enter a valid email address', type: 'error' });
        return;
      }
      
      if (!formData.password || formData.password.length < 6) {
        setMessage({ text: 'Password must be at least 6 characters long', type: 'error' });
        return;
      }
      
      if (formData.password !== formData.confirmPassword) {
        setMessage({ text: 'Passwords do not match', type: 'error' });
        return;
      }
      
      if (!formData.igHandle || !formData.carInfo || !formData.whyJoin || !formData.wherePromote) {
        setMessage({ text: 'Please fill in all fields', type: 'error' });
        return;
      }
    }

    try {
      setIsSubmitting(true);
      
      let currentUser = user;
      let userEmail = user?.email || formData.email;
      
      // Normalize email
      const normalizedEmail = userEmail.toLowerCase().trim();
      
      console.log('Starting ambassador application submission...');
      console.log('User logged in:', !!user);
      console.log('Email:', userEmail);
      console.log('Normalized email:', normalizedEmail);
      
      // Check if the email already exists in ambassadors collection
      const ambassadorsRef = collection(db, "ambassadors");
      const q = query(ambassadorsRef, where("normalizedEmail", "==", normalizedEmail));
      
      console.log('Checking for existing ambassador application...');
      const querySnapshot = await getDocs(q);
      
      if (!querySnapshot.empty) {
        console.log('Application already exists');
        setMessage({ 
          text: 'You\'ve already applied! Please use the login page to access your account.', 
          type: 'info' 
        });
        
        // Clear form
        setFormData({
          email: user?.email || '',
          password: '',
          confirmPassword: '',
          igHandle: '',
          carInfo: '',
          whyJoin: '',
          wherePromote: ''
        });
        
        setIsSubmitting(false);
        return;
      }
      
      console.log('No existing application found');
      
      // If user is not logged in, create account first
      if (!user) {
        console.log('Creating new user account...');
        // Sign out any existing user before creating new account
        await signOut(auth);
        
        // Create Firebase Auth account
        const userCredential = await createUserWithEmailAndPassword(auth, formData.email, formData.password);
        currentUser = userCredential.user;
        userEmail = formData.email;
        console.log('New user account created:', currentUser.uid);
      }
      
      // Prepare the ambassador data
      const ambassadorData = {
        uid: currentUser.uid,
        email: userEmail,
        normalizedEmail: normalizedEmail,
        igHandle: formData.igHandle.trim(),
        carInfo: formData.carInfo.trim(),
        whyJoin: formData.whyJoin.trim(),
        wherePromote: formData.wherePromote.trim(),
        timestamp: Timestamp.now(),
        status: 'pending'
      };
      
      // If upgrading from regular user, preserve their info
      if (userProfile && userProfile.firstName) {
        ambassadorData.firstName = userProfile.firstName;
        ambassadorData.lastName = userProfile.lastName;
        ambassadorData.previousRole = 'user';
      }
      
      console.log('Saving ambassador application data...');
      console.log('Ambassador data:', ambassadorData);
      
      // Store the ambassador application in Firebase Firestore using the user's UID as document ID
      await setDoc(doc(db, "ambassadors", currentUser.uid), ambassadorData);
      
      console.log('Ambassador application saved successfully');
      
      // Show success message
      if (user) {
        setMessage({ 
          text: 'Ambassador application submitted! You can view your application status in your dashboard.', 
          type: 'success' 
        });
        
        // Redirect to ambassador dashboard after 3 seconds
        setTimeout(() => {
          navigate('/ambassador/dashboard');
        }, 3000);
      } else {
        setMessage({ 
          text: 'Account created and application submitted successfully! Redirecting to login...', 
          type: 'success' 
        });
        
        // Sign out the newly created user and redirect to login
        await signOut(auth);
        
        // Redirect to login page after 3 seconds
        setTimeout(() => {
          navigate('/ambassador/login');
        }, 3000);
      }
      
      // Clear form
      setFormData({
        email: user?.email || '',
        password: '',
        confirmPassword: '',
        igHandle: '',
        carInfo: '',
        whyJoin: '',
        wherePromote: ''
      });
      
    } catch (error) {
      console.error("Detailed error information:", error);
      console.error("Error code:", error.code);
      console.error("Error message:", error.message);
      console.error("Full error object:", JSON.stringify(error, null, 2));
      
      let errorMessage = 'Something went wrong. Please try again later.';
      
      if (error.code === 'auth/email-already-in-use') {
        errorMessage = 'An account with this email already exists. Please use the login page to access your account.';
      } else if (error.code === 'auth/weak-password') {
        errorMessage = 'Password is too weak. Please choose a stronger password.';
      } else if (error.code === 'auth/invalid-email') {
        errorMessage = 'Invalid email address format.';
      } else if (error.code === 'auth/operation-not-allowed') {
        errorMessage = 'Account creation is currently disabled. Please contact support.';
      } else if (error.code === 'permission-denied') {
        errorMessage = 'Permission denied. Please make sure you\'re logged in and try again.';
      } else if (error.code === 'unavailable') {
        errorMessage = 'Service temporarily unavailable. Please try again in a moment.';
      } else if (error.message && error.message.includes('permissions')) {
        errorMessage = 'Database permission error. Please contact support if this continues.';
      } else if (error.message) {
        // Include the actual error message for debugging
        errorMessage = `Error: ${error.message}. Please contact support if this continues.`;
      }
      
      setMessage({ 
        text: errorMessage, 
        type: 'error' 
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="ambassador-page">
      {/* Hero Section */}
      <section className="ambassador-hero">
        <div className="container">
          <div className="ambassador-hero-content">
            <h1>Become a LogiCar Ambassador</h1>
            <p>Join our community of car enthusiasts and help spread the word about LogiCar. Get exclusive perks, early access, and rewards for promoting our app.</p>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="ambassador-benefits">
        <div className="container">
          <h2>Ambassador Benefits</h2>
          <div className="benefits-grid">
            <div className="benefit-card">
              <i className="fas fa-star"></i>
              <h3>Exclusive Access</h3>
              <p>Get early access to new features and beta versions before anyone else</p>
            </div>
            <div className="benefit-card">
              <i className="fas fa-gift"></i>
              <h3>Rewards & Perks</h3>
              <p>Earn rewards for successful referrals and social media engagement</p>
            </div>
            <div className="benefit-card">
              <i className="fas fa-users"></i>
              <h3>Community</h3>
              <p>Connect with other car enthusiasts and LogiCar ambassadors</p>
            </div>
            <div className="benefit-card">
              <i className="fas fa-trophy"></i>
              <h3>Recognition</h3>
              <p>Get featured on our social media and website as a valued ambassador</p>
            </div>
          </div>
        </div>
      </section>

      {/* Application Form */}
      <section className="ambassador-application">
        <div className="container">
          <div className="application-form-container">
            <h2>{user ? 'Apply to Become an Ambassador' : 'Create Your Ambassador Account'}</h2>
            <p>{user ? 'Submit your ambassador application' : 'Create your account and submit your ambassador application'}</p>
            
            {user ? (
              <div className="logged-in-notice">
                <p><i className="fas fa-user-check"></i> Applying as: <strong>{userProfile?.firstName ? `${userProfile.firstName} ${userProfile.lastName}` : user.email}</strong></p>
              </div>
            ) : (
              <div className="login-notice">
                <p>Already have an account? <Link to="/login">Login to your dashboard</Link></p>
              </div>
            )}
            
            <form className="ambassador-form" onSubmit={handleSubmit}>
              {/* Only show email/password fields if user is not logged in */}
              {!user && (
                <>
                  <div className="form-group">
                    <label htmlFor="email">Email Address</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="your@email.com"
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input
                      type="password"
                      id="password"
                      name="password"
                      value={formData.password}
                      onChange={handleInputChange}
                      placeholder="Create a secure password (min. 6 characters)"
                      required
                      minLength="6"
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="confirmPassword">Confirm Password</label>
                    <input
                      type="password"
                      id="confirmPassword"
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleInputChange}
                      placeholder="Confirm your password"
                      required
                      minLength="6"
                    />
                  </div>
                </>
              )}

              <div className="form-group">
                <label htmlFor="igHandle">Instagram Handle</label>
                <input
                  type="text"
                  id="igHandle"
                  name="igHandle"
                  value={formData.igHandle}
                  onChange={handleInputChange}
                  placeholder="@yourusername"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="carInfo">Tell us about your car(s)</label>
                <textarea
                  id="carInfo"
                  name="carInfo"
                  value={formData.carInfo}
                  onChange={handleInputChange}
                  placeholder="What car(s) do you own? Year, make, model, any modifications, etc."
                  rows="3"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="whyJoin">Why do you want to join our ambassador program?</label>
                <textarea
                  id="whyJoin"
                  name="whyJoin"
                  value={formData.whyJoin}
                  onChange={handleInputChange}
                  placeholder="Tell us about your passion for cars and why you'd be a great ambassador for LogiCar"
                  rows="4"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="wherePromote">Where would you promote LogiCar?</label>
                <textarea
                  id="wherePromote"
                  name="wherePromote"
                  value={formData.wherePromote}
                  onChange={handleInputChange}
                  placeholder="Instagram, TikTok, car meets, forums, etc. Tell us about your reach and audience"
                  rows="3"
                  required
                />
              </div>

              <button 
                type="submit" 
                className="ambassador-submit-button"
                disabled={isSubmitting}
              >
                {isSubmitting ? 
                  (user ? 'Submitting Application...' : 'Creating Account...') : 
                  (user ? 'Submit Application' : 'Create Account & Apply')
                }
              </button>
            </form>
            
            <div className={`application-message ${message.text ? 'visible' : ''} ${message.type}`}>
              {message.text}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Ambassador; 