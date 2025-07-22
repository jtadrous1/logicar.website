import { collection, doc, getDocs, orderBy, query, updateDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { db } from '../firebase';
import '../styles/AmbassadorAdmin.css';

const AmbassadorAdmin = () => {
  const [ambassadors, setAmbassadors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [processingId, setProcessingId] = useState(null);
  const [expandedCards, setExpandedCards] = useState(new Set());

  useEffect(() => {
    fetchAmbassadors();
  }, []);

  const fetchAmbassadors = async () => {
    try {
      setLoading(true);
      const q = query(collection(db, "ambassadors"), orderBy("timestamp", "desc"));
      const querySnapshot = await getDocs(q);
      
      const ambassadorData = [];
      querySnapshot.forEach((doc) => {
        ambassadorData.push({
          id: doc.id,
          ...doc.data(),
          timestamp: doc.data().timestamp.toDate().toLocaleString()
        });
      });
      
      setAmbassadors(ambassadorData);
      setError(null);
    } catch (err) {
      console.error("Error fetching ambassadors: ", err);
      setError("Failed to load ambassadors. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (ambassadorId) => {
    setProcessingId(ambassadorId);
    try {
      await updateDoc(doc(db, 'ambassadors', ambassadorId), {
        status: 'approved',
        approvedAt: new Date()
      });
      
      await fetchAmbassadors();
      alert('Ambassador approved! They can now access all ambassador resources.');
    } catch (error) {
      console.error('Error approving ambassador:', error);
      alert('Failed to approve ambassador: ' + error.message);
    } finally {
      setProcessingId(null);
    }
  };

  const handleReject = async (ambassadorId) => {
    setProcessingId(ambassadorId);
    try {
      await updateDoc(doc(db, 'ambassadors', ambassadorId), {
        status: 'rejected',
        rejectedAt: new Date()
      });
      
      await fetchAmbassadors();
    } catch (error) {
      console.error('Error rejecting ambassador:', error);
      alert('Failed to reject ambassador: ' + error.message);
    } finally {
      setProcessingId(null);
    }
  };

  const toggleCardExpansion = (ambassadorId) => {
    const newExpanded = new Set(expandedCards);
    if (newExpanded.has(ambassadorId)) {
      newExpanded.delete(ambassadorId);
    } else {
      newExpanded.add(ambassadorId);
    }
    setExpandedCards(newExpanded);
  };

  const getStatusBadge = (status) => {
    const statusConfig = {
      pending: { color: '#FF9800', text: 'Pending' },
      approved: { color: '#4CAF50', text: 'Approved' },
      rejected: { color: '#F44336', text: 'Rejected' }
    };
    
    const config = statusConfig[status] || { color: '#666', text: 'Unknown' };
    
    return (
      <span 
        className="status-badge"
        style={{ backgroundColor: config.color }}
      >
        {config.text}
      </span>
    );
  };

  if (loading) {
    return (
      <div className="ambassador-admin">
        <h2>Ambassador Applications</h2>
        <div className="loading">Loading applications...</div>
      </div>
    );
  }

  return (
    <div className="ambassador-admin">
      <div className="admin-header">
        <h2>Ambassador Applications ({ambassadors.length})</h2>
        <div className="summary-stats-inline">
          <div className="stat-inline pending">
            <span className="stat-number">{ambassadors.filter(a => a.status === 'pending').length}</span>
            <span className="stat-label">Pending</span>
          </div>
          <div className="stat-inline approved">
            <span className="stat-number">{ambassadors.filter(a => a.status === 'approved').length}</span>
            <span className="stat-label">Approved</span>
          </div>
          <div className="stat-inline rejected">
            <span className="stat-number">{ambassadors.filter(a => a.status === 'rejected').length}</span>
            <span className="stat-label">Rejected</span>
          </div>
        </div>
      </div>
      
      {error && <div className="error-message">{error}</div>}
      
      {ambassadors.length === 0 ? (
        <div className="no-applications">
          <p>No ambassador applications found.</p>
        </div>
      ) : (
        <div className="ambassadors-cards">
          {ambassadors.map((ambassador) => {
            const isExpanded = expandedCards.has(ambassador.id);
            return (
              <div key={ambassador.id} className={`ambassador-card ${ambassador.status}`}>
                <div className="card-header">
                  <div className="applicant-info">
                    <h3>{ambassador.firstName ? `${ambassador.firstName} ${ambassador.lastName}` : ambassador.email}</h3>
                    <p className="email">{ambassador.email}</p>
                    <p className="instagram">
                      <i className="fab fa-instagram"></i>
                      <a href={`https://instagram.com/${ambassador.igHandle?.replace('@', '')}`} target="_blank" rel="noopener noreferrer">
                        {ambassador.igHandle}
                      </a>
                    </p>
                  </div>
                  <div className="card-status">
                    {getStatusBadge(ambassador.status)}
                    <p className="application-date">Applied: {ambassador.timestamp}</p>
                  </div>
                </div>

                <div className="card-content">
                  <div className="quick-info">
                    <div className="info-item">
                      <label>Car Information:</label>
                      <p>{ambassador.carInfo}</p>
                    </div>
                  </div>

                  <button 
                    className="expand-button"
                    onClick={() => toggleCardExpansion(ambassador.id)}
                  >
                    {isExpanded ? 'Show Less' : 'View Full Application'}
                    <i className={`fas fa-chevron-${isExpanded ? 'up' : 'down'}`}></i>
                  </button>

                  {isExpanded && (
                    <div className="expanded-content">
                      <div className="detailed-info">
                        <div className="info-section">
                          <label>Why do they want to join?</label>
                          <div className="text-content">
                            {ambassador.whyJoin}
                          </div>
                        </div>

                        <div className="info-section">
                          <label>Where would they promote LogiCar?</label>
                          <div className="text-content">
                            {ambassador.wherePromote}
                          </div>
                        </div>

                        {ambassador.previousRole && (
                          <div className="info-section">
                            <label>Previous Role:</label>
                            <div className="text-content">
                              Upgraded from {ambassador.previousRole}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>

                <div className="card-actions">
                  {ambassador.status === 'pending' && (
                    <>
                      <button
                        className="approve-btn"
                        onClick={() => handleApprove(ambassador.id)}
                        disabled={processingId === ambassador.id}
                      >
                        <i className="fas fa-check"></i>
                        {processingId === ambassador.id ? 'Processing...' : 'Approve'}
                      </button>
                      <button
                        className="reject-btn"
                        onClick={() => handleReject(ambassador.id)}
                        disabled={processingId === ambassador.id}
                      >
                        <i className="fas fa-times"></i>
                        Reject
                      </button>
                    </>
                  )}
                  {ambassador.status !== 'pending' && (
                    <div className="status-note">
                      Application {ambassador.status} on{' '}
                      {ambassador.approvedAt 
                        ? new Date(ambassador.approvedAt.seconds * 1000).toLocaleDateString()
                        : ambassador.rejectedAt 
                        ? new Date(ambassador.rejectedAt.seconds * 1000).toLocaleDateString()
                        : 'Unknown date'
                      }
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default AmbassadorAdmin; 