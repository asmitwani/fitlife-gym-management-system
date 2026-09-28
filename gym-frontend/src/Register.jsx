import React, { useState, useEffect } from 'react';

export default function Register() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    // Experiment 2: Password Strength Indicator using jQuery
    useEffect(() => {
        window.$('#password').on('input', function() {
            const val = window.$(this).val();
            const strengthText = val.length > 5 ? "Strong ✅" : "Weak ❌";
            const color = val.length > 5 ? "green" : "red";
            window.$('#strength').text("Password Strength: " + strengthText).css('color', color);
        });
    }, []);

    const handleRegister = async (e) => {
        e.preventDefault();
        const response = await fetch('http://localhost:5001/api/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, email, password })
        });
        const data = await response.json();
        alert(data.message); 
    };

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '60px 20px' }}>
            <div style={{ background: 'white', padding: '40px', borderRadius: '10px', boxShadow: '0 4px 15px rgba(0,0,0,0.1)', width: '100%', maxWidth: '400px' }}>
                <h2 style={{ textAlign: 'center', marginBottom: '30px', color: '#333' }}>Create Account</h2>
                <form onSubmit={handleRegister} style={{ display: 'flex', flexDirection: 'column' }}>
                    <label style={{ marginBottom: '5px', fontWeight: 'bold', fontSize: '14px', color: '#555' }}>Full Name</label>
                    <input type="text" onChange={(e) => setName(e.target.value)} required style={{ marginBottom: '20px', padding: '12px', border: '1px solid #ddd', borderRadius: '5px', fontSize: '16px' }} />
                    
                    <label style={{ marginBottom: '5px', fontWeight: 'bold', fontSize: '14px', color: '#555' }}>Email Address</label>
                    <input type="email" onChange={(e) => setEmail(e.target.value)} required style={{ marginBottom: '20px', padding: '12px', border: '1px solid #ddd', borderRadius: '5px', fontSize: '16px' }} />
                    
                    <label style={{ marginBottom: '5px', fontWeight: 'bold', fontSize: '14px', color: '#555' }}>Password</label>
                    <input type="password" id="password" onChange={(e) => setPassword(e.target.value)} required style={{ marginBottom: '5px', padding: '12px', border: '1px solid #ddd', borderRadius: '5px', fontSize: '16px' }} />
                    <p id="strength" style={{ fontSize: '12px', marginBottom: '25px', fontWeight: 'bold' }}></p>
                    
                    <button type="submit" style={{ padding: '15px', background: '#f39c12', color: 'white', border: 'none', borderRadius: '5px', fontSize: '16px', fontWeight: 'bold', cursor: 'pointer' }}>Sign Up</button>
                </form>
            </div>
        </div>
    );
}