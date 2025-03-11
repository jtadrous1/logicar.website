import React, { useState } from 'react';
import { collection, addDoc, Timestamp } from 'firebase/firestore';
import { db } from '../firebase';
import '../styles/SignUp.css';

const SignUp = () => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [message, setMessage] = useState({ text: '', type: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Basic validation
    if (!email || !email.includes('@')) {
      setMessage({ text: 'Please enter a valid email address', type: 'error' });
      return;
    }

    try {
      setIsSubmitting(true);
      
      // Store the email in Firebase Firestore
      await addDoc(collection(db, "signups"), {
        name: name,
        email: email,
        timestamp: Timestamp.now()
      });
      
      // Show success message
      setMessage({ 
        text: 'Thank you! We\'ll notify you when LogiCar launches.', 
        type: 'success' 
      });
      
      // Clear form
      setEmail('');
      setName('');
      
      // Reset message after 5 seconds
      setTimeout(() => {
        setMessage({ text: '', type: '' });
      }, 5000);
    } catch (error) {
      console.error("Error adding document: ", error);
      setMessage({ 
        text: 'Something went wrong. Please try again later.', 
        type: 'error' 
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="signup-section" id="signup">
      <div className="signup-container">
        <h2 className="signup-title">Be the First to Know When We Launch</h2>
        <p className="signup-description">
          Sign up to get notified and receive exclusive early-access benefits.
        </p>
        
        <form className="signup-form" onSubmit={handleSubmit}>
          <div className="signup-form-row">
            <input
              type="text"
              className="signup-input"
              placeholder="Your Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <input
              type="email"
              className="signup-input"
              placeholder="Your Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <button 
              type="submit" 
              className="signup-button"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Submitting...' : 'Notify Me'}
            </button>
          </div>
        </form>
        
        <div className={`signup-message ${message.text ? 'visible' : ''} ${message.type}`}>
          {message.text}
        </div>
      </div>
    </section>
  );
};

export default SignUp; 