import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Home from './Home.jsx';
import Register from './Register.jsx';
import Login from './Login.jsx';
import Dashboard from './Dashboard.jsx';
import AdminDashboard from './AdminDashboard.jsx';
import Success from './Success.jsx';
import Cancel from './Cancel.jsx';

export default function App() {
  return (
    <BrowserRouter>
      {/* Premium Navigation */}
      <nav style={{ padding: '20px 50px', background: '#0a0a0a', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '3px solid #f39c12', position: 'sticky', top: 0, zIndex: 1000 }}>
        <h2 style={{ margin: 0, color: 'white', letterSpacing: '3px', fontWeight: '800', fontSize: '24px' }}>
          FIT<span style={{ color: '#f39c12' }}>LIFE</span>
        </h2>
        <div style={{ display: 'flex', gap: '30px', alignItems: 'center' }}>
          <Link className="nav-link" to="/" style={{ color: '#ddd', textDecoration: 'none', fontWeight: '600', fontSize: '15px', textTransform: 'uppercase' }}>Home</Link>
          <Link className="nav-link" to="/dashboard" style={{ color: '#ddd', textDecoration: 'none', fontWeight: '600', fontSize: '15px', textTransform: 'uppercase' }}>Dashboard</Link>
          <div style={{ width: '1px', height: '20px', background: '#444' }}></div>
          <Link className="nav-link" to="/login" style={{ color: '#ddd', textDecoration: 'none', fontWeight: '600', fontSize: '15px', textTransform: 'uppercase' }}>Login</Link>
          <Link to="/register" style={{ background: '#f39c12', color: '#000', textDecoration: 'none', fontWeight: '800', fontSize: '15px', textTransform: 'uppercase', padding: '10px 24px', borderRadius: '30px', transition: '0.3s' }}>Join Now</Link>
        </div>
      </nav>

      {/* Main Content Area */}
      <div style={{ minHeight: 'calc(100vh - 160px)' }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/success" element={<Success />} />
          <Route path="/cancel" element={<Cancel />} />
        </Routes>
      </div>

      {/* Professional Footer */}
      <footer style={{ background: '#0a0a0a', color: '#777', textAlign: 'center', padding: '30px 20px', borderTop: '1px solid #222', fontSize: '14px' }}>
        <p>&copy; {new Date().getFullYear()} FitLife Premium Fitness. All rights reserved.</p>
        <p style={{ marginTop: '10px' }}>123 Muscle Ave, Strength City, SC 90210 | info@fitlife.com</p>
      </footer>
    </BrowserRouter>
  );
}