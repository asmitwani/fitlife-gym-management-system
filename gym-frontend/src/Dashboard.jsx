import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Dashboard() {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        // Retrieve user data saved during login
        const loggedInUser = localStorage.getItem('gymUser');
        if (loggedInUser) {
            setUser(JSON.parse(loggedInUser));
        } else {
            // If not logged in, kick them back to login page
            navigate('/login');
        }
    }, [navigate]);

    const handleLogout = () => {
        localStorage.removeItem('gymUser');
        navigate('/login');
    };

    if (!user) return <div style={{ padding: '50px', textAlign: 'center' }}>Loading...</div>;

    return (
        <div style={{ padding: '50px 20px', maxWidth: '800px', margin: '0 auto' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
                <h1 style={{ color: '#333' }}>Welcome, {user.name}</h1>
                <button onClick={handleLogout} style={{ padding: '10px 20px', background: '#e74c3c', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer', fontWeight: 'bold' }}>
                    Logout
                </button>
            </div>

            <div style={{ background: 'white', padding: '30px', borderRadius: '10px', boxShadow: '0 4px 15px rgba(0,0,0,0.1)' }}>
                <h2 style={{ borderBottom: '2px solid #f4f4f9', paddingBottom: '10px', marginBottom: '20px' }}>Membership Overview</h2>
                
                <div style={{ display: 'flex', flexDirection: 'column', gap: '15px', fontSize: '18px' }}>
                    <div>
                        <strong>Status: </strong> 
                        <span style={{ color: user.hasActiveMembership ? '#27ae60' : '#e74c3c', fontWeight: 'bold' }}>
                            {user.hasActiveMembership ? "Active" : "Inactive"}
                        </span>
                    </div>
                    <div>
                        <strong>Current Tier: </strong> {user.membershipTier}
                    </div>
                    <div>
                        <strong>Duration: </strong> {user.membershipDuration > 0 ? `${user.membershipDuration} Months` : 'N/A'}
                    </div>
                    <div>
                        <strong>Personal Trainer: </strong> 
                        <span style={{ color: user.hasTrainer ? '#27ae60' : '#e74c3c', fontWeight: 'bold' }}>
                            {user.hasTrainer ? "Yes (Assigned)" : "No"}
                        </span>
                    </div>
                </div>

                {!user.hasActiveMembership && (
                    <div style={{ marginTop: '30px', padding: '15px', background: '#fff3cd', color: '#856404', borderRadius: '5px', borderLeft: '5px solid #ffeeba' }}>
                        You currently do not have an active membership. Visit the <strong>Home</strong> page to purchase a plan.
                    </div>
                )}
            </div>
        </div>
    );
}