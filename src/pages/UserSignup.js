import { createUserWithEmailAndPassword, signOut } from 'firebase/auth';
import { collection, doc, getDocs, query, setDoc, Timestamp, where } from 'firebase/firestore';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { auth, db } from '../firebase';
import '../styles/UserSignup.css';

const UserSignup = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [message, setMessage] = useState({ text: '', type: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.firstName || !formData.lastName || !formData.email || !formData.password) {
      setMessage({ text: 'Please fill in all fields', type: 'error' });
      return;
    }
    
    if (!formData.email.includes('@')) {
      setMessage({ text: 'Please enter a valid email address', type: 'error' });
      return;
    }
    
    if (formData.password.length < 6) {
      setMessage({ text: 'Password must be at least 6 characters long', type: 'error' });
      return;
    }
    
    if (formData.password !== formData.confirmPassword) {
      setMessage({ text: 'Passwords do not match', type: 'error' });
      return;
    }

    try {
      setIsSubmitting(true);
      
      // Normalize email
      const normalizedEmail = formData.email.toLowerCase().trim();
      
      // Check if email already exists in users or ambassadors collection
      const usersQuery = query(collection(db, "users"), where("normalizedEmail", "==", normalizedEmail));
      const ambassadorsQuery = query(collection(db, "ambassadors"), where("normalizedEmail", "==", normalizedEmail));
      
      const [usersSnapshot, ambassadorsSnapshot] = await Promise.all([
        getDocs(usersQuery),
        getDocs(ambassadorsQuery)
      ]);
      
      if (!usersSnapshot.empty || !ambassadorsSnapshot.empty) {
        setMessage({ 
          text: 'An account with this email already exists. Please use the login page.', 
          type: 'info' 
        });
        
        setFormData({
          firstName: '',
          lastName: '',
          email: '',
          password: '',
          confirmPassword: ''
        });
        
        setIsSubmitting(false);
        return;
      }
      
      // Sign out any existing user before creating new account
      await signOut(auth);
      
      // Create Firebase Auth account
      const userCredential = await createUserWithEmailAndPassword(auth, formData.email, formData.password);
      const user = userCredential.user;
      
      // Store the user data in Firestore
      await setDoc(doc(db, "users", user.uid), {
        uid: user.uid,
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        normalizedEmail: normalizedEmail,
        role: 'user',
        createdAt: Timestamp.now(),
        lastLoginAt: Timestamp.now()
      });
      
      // Show success message
      setMessage({ 
        text: 'Account created successfully! Redirecting to login...', 
        type: 'success' 
      });
      
      // Clear form
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: ''
      });
      
      // Sign out the newly created user and redirect to login
      await signOut(auth);
      
      // Redirect to login page after 2 seconds
      setTimeout(() => {
        navigate('/login');
      }, 2000);
      
    } catch (error) {
      console.error("Error creating user account: ", error);
      let errorMessage = 'Something went wrong. Please try again later.';
      
      if (error.code === 'auth/email-already-in-use') {
        errorMessage = 'An account with this email already exists. Please use the login page.';
      } else if (error.code === 'auth/weak-password') {
        errorMessage = 'Password is too weak. Please choose a stronger password.';
      } else if (error.code === 'auth/invalid-email') {
        errorMessage = 'Invalid email address format.';
      } else if (error.code === 'auth/operation-not-allowed') {
        errorMessage = 'Account creation is currently disabled. Please contact support.';
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
    <div className="user-signup-page">
      <div className="signup-container">
        <div className="signup-header">
          <h1>Create Your LogiCar Account</h1>
          <p>Join the LogiCar community and track your car maintenance</p>
        </div>

        <form className="signup-form" onSubmit={handleSubmit}>
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="firstName">First Name</label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                value={formData.firstName}
                onChange={handleInputChange}
                placeholder="Enter your first name"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="lastName">Last Name</label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                value={formData.lastName}
                onChange={handleInputChange}
                placeholder="Enter your last name"
                required
              />
            </div>
          </div>

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

          {message.text && (
            <div className={`signup-message ${message.type}`}>
              {message.text}
            </div>
          )}

          <button 
            type="submit" 
            className="signup-button"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Creating Account...' : 'Create Account'}
          </button>
        </form>

        <div className="signup-footer">
          <p>
            Already have an account? <Link to="/login">Sign in here</Link>
          </p>
          <p>
            Want to become an ambassador? <Link to="/ambassador">Apply here</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default UserSignup; 