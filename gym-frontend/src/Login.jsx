import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        const response = await fetch('http://localhost:5001/api/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        });
        const data = await response.json();
        
        if (data.success) {
            localStorage.setItem('gymUser', JSON.stringify(data.user));
            
            // ADMIN ROUTING LOGIC
            if (data.user.email === 'admin@fitlife.com') {
                navigate('/admin');
            } else {
                navigate('/dashboard');
            }
        } else {
            alert(data.message); 
        }
    };

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '60px 20px' }}>
            <div style={{ background: 'white', padding: '40px', borderRadius: '10px', boxShadow: '0 4px 15px rgba(0,0,0,0.1)', width: '100%', maxWidth: '400px' }}>
                <h2 style={{ textAlign: 'center', marginBottom: '30px', color: '#333' }}>Member Login</h2>
                <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column' }}>
                    <label style={{ marginBottom: '5px', fontWeight: 'bold', fontSize: '14px', color: '#555' }}>Email Address</label>
                    <input type="email" onChange={(e) => setEmail(e.target.value)} required style={{ marginBottom: '20px', padding: '12px', border: '1px solid #ddd', borderRadius: '5px', fontSize: '16px' }} />
                    <label style={{ marginBottom: '5px', fontWeight: 'bold', fontSize: '14px', color: '#555' }}>Password</label>
                    <input type="password" onChange={(e) => setPassword(e.target.value)} required style={{ marginBottom: '30px', padding: '12px', border: '1px solid #ddd', borderRadius: '5px', fontSize: '16px' }} />
                    <button type="submit" style={{ padding: '15px', background: '#333', color: 'white', border: 'none', borderRadius: '5px', fontSize: '16px', fontWeight: 'bold', cursor: 'pointer' }}>Login</button>
                </form>
            </div>
        </div>
    );
}