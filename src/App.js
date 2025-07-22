import React from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Footer from './components/Footer';
import Navbar from './components/Navbar';
import { AuthProvider } from './contexts/AuthContext';
import Admin from './pages/Admin';
import Ambassador from './pages/Ambassador';
import AmbassadorDashboard from './pages/AmbassadorDashboard';
import AmbassadorLogin from './pages/AmbassadorLogin';
import Cookies from './pages/Cookies';
import Features from './pages/Features';
import Home from './pages/Home';
import Login from './pages/Login';
import NotFound from './pages/NotFound';
import Pricing from './pages/Pricing';
import Privacy from './pages/Privacy';
import Terms from './pages/Terms';
import UserDashboard from './pages/UserDashboard';
import UserSignup from './pages/UserSignup';
import './styles/App.css';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="app">
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/features" element={<Features />} />
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/signup" element={<UserSignup />} />
            <Route path="/login" element={<Login />} />
            <Route path="/dashboard" element={<UserDashboard />} />
            <Route path="/ambassador" element={<Ambassador />} />
            <Route path="/ambassador/login" element={<AmbassadorLogin />} />
            <Route path="/ambassador/dashboard" element={<AmbassadorDashboard />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="/cookies" element={<Cookies />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;