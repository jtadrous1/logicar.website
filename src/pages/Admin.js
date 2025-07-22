import { collection, getDocs, orderBy, query } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import AmbassadorAdmin from '../components/AmbassadorAdmin';
import { db } from '../firebase';
import '../styles/Admin.css';

const Admin = () => {
  const [signups, setSignups] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [password, setPassword] = useState('');
  const [authenticated, setAuthenticated] = useState(false);

  // Simple authentication - in a real app, use proper authentication
  const handleAuthentication = (e) => {
    e.preventDefault();
    if (password === 'logicar2024') { // This is just for demo purposes
      setAuthenticated(true);
    } else {
      setError('Invalid password');
    }
  };

  useEffect(() => {
    if (!authenticated) return;

    const fetchSignups = async () => {
      try {
        setLoading(true);
        const q = query(collection(db, "signups"), orderBy("timestamp", "desc"));
        const querySnapshot = await getDocs(q);
        
        const signupData = [];
        querySnapshot.forEach((doc) => {
          signupData.push({
            id: doc.id,
            ...doc.data(),
            timestamp: doc.data().timestamp.toDate().toLocaleString()
          });
        });
        
        setSignups(signupData);
        setError(null);
      } catch (err) {
        console.error("Error fetching signups: ", err);
        setError("Failed to load signups. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchSignups();
  }, [authenticated]);

  if (!authenticated) {
    return (
      <div className="admin-login">
        <div className="admin-login-container">
          <h2>Admin Login</h2>
          <form onSubmit={handleAuthentication}>
            <input
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button type="submit">Login</button>
          </form>
          {error && <p className="error-message">{error}</p>}
        </div>
      </div>
    );
  }

  return (
    <div className="admin-page">
      <div className="admin-container">
        <h1>Admin Dashboard</h1>
        <p>Manage signups and ambassador applications.</p>
        
        <h2>Sign-up Management</h2>
        <p>View all users who have signed up for launch notifications.</p>
        
        {loading ? (
          <div className="loading">Loading...</div>
        ) : error ? (
          <div className="error">{error}</div>
        ) : (
          <>
            <div className="signup-stats">
              <div className="stat-card">
                <h3>Total Sign-ups</h3>
                <p>{signups.length}</p>
              </div>
            </div>
            
            <div className="signup-table-container">
              <table className="signup-table">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Date</th>
                  </tr>
                </thead>
                <tbody>
                  {signups.length > 0 ? (
                    signups.map((signup) => (
                      <tr key={signup.id}>
                        <td>{signup.name || 'N/A'}</td>
                        <td>{signup.email}</td>
                        <td>{signup.timestamp}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="3" className="no-data">No sign-ups yet</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
            
            <div className="export-section">
              <button 
                onClick={() => {
                  const csvContent = "data:text/csv;charset=utf-8," 
                    + "Name,Email,Date\n"
                    + signups.map(s => `${s.name || 'N/A'},${s.email},${s.timestamp}`).join("\n");
                  
                  const encodedUri = encodeURI(csvContent);
                  const link = document.createElement("a");
                  link.setAttribute("href", encodedUri);
                  link.setAttribute("download", "logicar_signups.csv");
                  document.body.appendChild(link);
                  link.click();
                  document.body.removeChild(link);
                }}
                className="export-button"
              >
                Export to CSV
              </button>
            </div>
          </>
        )}
        
        {/* Ambassador Management Section */}
        <AmbassadorAdmin />
      </div>
    </div>
  );
};

export default Admin; 