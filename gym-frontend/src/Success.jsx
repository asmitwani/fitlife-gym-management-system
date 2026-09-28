import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

export default function Success() {
  const [isActivated, setIsActivated] = useState(false);

  useEffect(() => {
    const activateMembership = async () => {
      // Get the logged-in user and the plan they just bought
      const userStr = localStorage.getItem('gymUser');
      const planStr = localStorage.getItem('pendingPlan');

      if (userStr && planStr && !isActivated) {
        const user = JSON.parse(userStr);
        const plan = JSON.parse(planStr);

        // Tell the backend to update MongoDB
        const response = await fetch('http://localhost:5001/api/update-membership', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            email: user.email,
            tier: plan.tier,
            duration: plan.duration
          })
        });

        const data = await response.json();
        
        if (data.success) {
          // Update the browser's memory so the Dashboard updates instantly
          localStorage.setItem('gymUser', JSON.stringify(data.user));
          localStorage.removeItem('pendingPlan'); // Clear the temporary plan
          setIsActivated(true);
        }
      }
    };

    activateMembership();
  }, [isActivated]);

  return (
    <div style={{ textAlign: 'center', padding: '80px 20px' }}>
      <div style={{ background: 'white', maxWidth: '500px', margin: '0 auto', padding: '40px', borderRadius: '10px', boxShadow: '0 4px 15px rgba(0,0,0,0.1)' }}>
        <h1 style={{ color: '#27ae60', fontSize: '3rem', margin: '0 0 10px 0' }}>✓</h1>
        <h2 style={{ color: '#333', marginBottom: '15px' }}>Payment Successful!</h2>
        
        {isActivated ? (
            <p style={{ color: '#27ae60', fontWeight: 'bold', marginBottom: '30px' }}>
              Your membership has been successfully activated in our database!
            </p>
        ) : (
            <p style={{ color: '#666', marginBottom: '30px' }}>
              Activating your membership...
            </p>
        )}

        <Link 
          to="/dashboard" 
          style={{ display: 'inline-block', padding: '12px 30px', background: '#f39c12', color: 'white', textDecoration: 'none', borderRadius: '5px', fontWeight: 'bold' }}
        >
          Go to Dashboard
        </Link>
      </div>
    </div>
  );
}