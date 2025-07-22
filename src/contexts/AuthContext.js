import { onAuthStateChanged, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import React, { createContext, useContext, useEffect, useState } from 'react';
import { auth, db } from '../firebase';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [userProfile, setUserProfile] = useState(null);
  const [userRole, setUserRole] = useState(null); // 'user' or 'ambassador'
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        setUser(firebaseUser);
        
        // Check if user is an ambassador first
        try {
          const ambassadorDoc = await getDoc(doc(db, 'ambassadors', firebaseUser.uid));
          if (ambassadorDoc.exists()) {
            setUserProfile(ambassadorDoc.data());
            setUserRole('ambassador');
          } else {
            // Check if user is a regular user
            const userDoc = await getDoc(doc(db, 'users', firebaseUser.uid));
            if (userDoc.exists()) {
              setUserProfile(userDoc.data());
              setUserRole('user');
            } else {
              // User exists in Firebase Auth but not in our collections
              setUserProfile(null);
              setUserRole(null);
            }
          }
        } catch (error) {
          console.error('Error fetching user profile:', error);
          setUserProfile(null);
          setUserRole(null);
        }
      } else {
        setUser(null);
        setUserProfile(null);
        setUserRole(null);
      }
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const login = async (email, password) => {
    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      
      // Check if user exists in either collection
      const ambassadorDoc = await getDoc(doc(db, 'ambassadors', result.user.uid));
      const userDoc = await getDoc(doc(db, 'users', result.user.uid));
      
      if (!ambassadorDoc.exists() && !userDoc.exists()) {
        await signOut(auth);
        throw new Error('Account not found. Please create an account first.');
      }
      
      return result;
    } catch (error) {
      throw error;
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const value = {
    user,
    userProfile,
    userRole,
    login,
    logout,
    loading
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}; 