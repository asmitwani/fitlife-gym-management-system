import React from 'react';
import { Link } from 'react-router-dom';

export default function Cancel() {
  return (
    <div style={{ textAlign: 'center', padding: '80px 20px' }}>
      <div style={{ background: 'white', maxWidth: '500px', margin: '0 auto', padding: '40px', borderRadius: '10px', boxShadow: '0 4px 15px rgba(0,0,0,0.1)' }}>
        <h1 style={{ color: '#e74c3c', fontSize: '3rem', margin: '0 0 10px 0' }}>✕</h1>
        <h2 style={{ color: '#333', marginBottom: '15px' }}>Payment Cancelled</h2>
        <p style={{ color: '#666', lineHeight: '1.6', marginBottom: '30px' }}>
          No charges were made. You can try purchasing a membership again at any time.
        </p>
        <Link 
          to="/" 
          style={{ display: 'inline-block', padding: '12px 30px', background: '#333', color: 'white', textDecoration: 'none', borderRadius: '5px', fontWeight: 'bold' }}
        >
          Back to Plans
        </Link>
      </div>
    </div>
  );
}