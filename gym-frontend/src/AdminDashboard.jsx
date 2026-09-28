import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function AdminDashboard() {
    const [members, setMembers] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const userStr = localStorage.getItem('gymUser');
        if (userStr) {
            const user = JSON.parse(userStr);
            if (user.email !== 'admin@fitlife.com') {
                navigate('/dashboard');
            } else {
                fetchUsers();
            }
        } else {
            navigate('/login');
        }
    }, [navigate]);

    const fetchUsers = async () => {
        const response = await fetch('http://localhost:5001/api/users');
        const data = await response.json();
        if (data.success) {
            setMembers(data.users);
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('gymUser');
        navigate('/login');
    };

    // Delete user handler
    const handleDeleteUser = async (userId, userEmail) => {
        if (userEmail === 'admin@fitlife.com') {
            alert("You cannot delete the primary admin account!");
            return;
        }

        if (window.confirm("Are you sure you want to permanently delete this user?")) {
            try {
                const response = await fetch(`http://localhost:5001/api/users/${userId}`, {
                    method: 'DELETE'
                });
                const data = await response.json();
                
                if (data.success) {
                    setMembers(members.filter(member => member._id !== userId));
                } else {
                    alert("Failed to delete user.");
                }
            } catch (error) {
                alert("Server error while deleting.");
            }
        }
    };

    const activeMembersCount = members.filter(m => m.hasActiveMembership).length;
    const totalRevenue = members.reduce((sum, member) => {
        if (!member.hasActiveMembership) return sum;
        if (member.membershipTier === 'Basic') return sum + (30 * member.membershipDuration);
        if (member.membershipTier === 'Pro') return sum + (50 * member.membershipDuration);
        if (member.membershipTier === 'Elite') return sum + (80 * member.membershipDuration);
        return sum;
    }, 0);

    const formatDate = (dateString) => {
        if (!dateString) return "N/A";
        const options = { year: 'numeric', month: 'short', day: 'numeric' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    };

    return (
        <div style={{ padding: '60px 20px', maxWidth: '1200px', margin: '0 auto', fontFamily: 'Poppins, sans-serif' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px' }}>
                <div>
                    <h1 style={{ color: '#111', fontSize: '2.5rem', fontWeight: '800', margin: 0 }}>Admin <span style={{ color: '#f39c12' }}>Portal</span></h1>
                    <p style={{ color: '#666', marginTop: '5px' }}>Manage users and track revenue</p>
                </div>
                <button onClick={handleLogout} style={{ padding: '12px 25px', background: '#111', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '1px' }}>
                    Sign Out
                </button>
            </div>

            {/* Statistics Cards */}
            <div style={{ display: 'flex', gap: '25px', marginBottom: '40px', flexWrap: 'wrap' }}>
                <div style={{ background: '#111', color: 'white', padding: '30px', borderRadius: '15px', flex: 1, minWidth: '250px', boxShadow: '0 10px 30px rgba(0,0,0,0.1)', borderTop: '4px solid #3498db' }}>
                    <h3 style={{ color: '#aaa', fontSize: '1rem', textTransform: 'uppercase', letterSpacing: '1px' }}>Total Users</h3>
                    <p style={{ fontSize: '3rem', margin: '10px 0 0 0', fontWeight: '800' }}>{members.length}</p>
                </div>
                <div style={{ background: '#111', color: 'white', padding: '30px', borderRadius: '15px', flex: 1, minWidth: '250px', boxShadow: '0 10px 30px rgba(0,0,0,0.1)', borderTop: '4px solid #27ae60' }}>
                    <h3 style={{ color: '#aaa', fontSize: '1rem', textTransform: 'uppercase', letterSpacing: '1px' }}>Active Members</h3>
                    <p style={{ fontSize: '3rem', margin: '10px 0 0 0', fontWeight: '800' }}>{activeMembersCount}</p>
                </div>
                <div style={{ background: '#111', color: 'white', padding: '30px', borderRadius: '15px', flex: 1, minWidth: '250px', boxShadow: '0 10px 30px rgba(0,0,0,0.1)', borderTop: '4px solid #f39c12' }}>
                    <h3 style={{ color: '#aaa', fontSize: '1rem', textTransform: 'uppercase', letterSpacing: '1px' }}>Total Revenue</h3>
                    <p style={{ fontSize: '3rem', margin: '10px 0 0 0', fontWeight: '800', color: '#f39c12' }}>${totalRevenue}</p>
                </div>
            </div>

            {/* Member Database Table */}
            <div style={{ background: 'white', padding: '30px', borderRadius: '15px', boxShadow: '0 10px 40px rgba(0,0,0,0.08)', overflowX: 'auto' }}>
                <h2 style={{ paddingBottom: '15px', marginBottom: '20px', fontSize: '1.5rem', fontWeight: '800', color: '#333' }}>Member Directory</h2>
                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                    <thead>
                        <tr style={{ background: '#f8f9fa', color: '#555', textTransform: 'uppercase', fontSize: '12px', letterSpacing: '1px' }}>
                            <th style={{ padding: '15px', borderBottom: '2px solid #eee' }}>Name</th>
                            <th style={{ padding: '15px', borderBottom: '2px solid #eee' }}>Email</th>
                            <th style={{ padding: '15px', borderBottom: '2px solid #eee' }}>Registered</th>
                            <th style={{ padding: '15px', borderBottom: '2px solid #eee' }}>Status</th>
                            <th style={{ padding: '15px', borderBottom: '2px solid #eee' }}>Plan / End Date</th>
                            <th style={{ padding: '15px', borderBottom: '2px solid #eee' }}>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {members.map((member) => (
                            <tr key={member._id} style={{ borderBottom: '1px solid #f4f4f4', transition: 'background 0.2s' }} onMouseOver={e => e.currentTarget.style.background = '#fcfcfc'} onMouseOut={e => e.currentTarget.style.background = 'white'}>
                                <td style={{ padding: '15px', fontWeight: '600' }}>{member.name}</td>
                                <td style={{ padding: '15px', color: '#666' }}>{member.email}</td>
                                <td style={{ padding: '15px', color: '#888', fontSize: '14px' }}>{formatDate(member.registrationDate)}</td>
                                <td style={{ padding: '15px' }}>
                                    <span style={{ 
                                        background: member.hasActiveMembership ? 'rgba(39, 174, 96, 0.1)' : 'rgba(231, 76, 60, 0.1)', 
                                        color: member.hasActiveMembership ? '#27ae60' : '#e74c3c', 
                                        padding: '5px 12px', borderRadius: '20px', fontWeight: '800', fontSize: '12px' 
                                    }}>
                                        {member.hasActiveMembership ? 'ACTIVE' : 'INACTIVE'}
                                    </span>
                                </td>
                                <td style={{ padding: '15px', fontSize: '14px' }}>
                                    {member.membershipTier !== 'None' ? (
                                        <div>
                                            <strong>{member.membershipTier}</strong> ({member.membershipDuration} mo)<br/>
                                            <span style={{ color: '#888', fontSize: '12px' }}>Exp: {formatDate(member.membershipEndDate)}</span>
                                        </div>
                                    ) : <span style={{ color: '#bbb' }}>N/A</span>}
                                </td>
                                <td style={{ padding: '15px' }}>
                                    {member.email !== 'admin@fitlife.com' && (
                                        <button 
                                            onClick={() => handleDeleteUser(member._id, member.email)}
                                            style={{ background: '#e74c3c', color: 'white', border: 'none', padding: '8px 12px', borderRadius: '5px', cursor: 'pointer', fontWeight: 'bold', fontSize: '12px', transition: '0.2s' }}
                                        >
                                            Delete
                                        </button>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}