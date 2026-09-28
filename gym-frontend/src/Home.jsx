import React, { useState, useEffect } from 'react';

export default function Home() {
    const [duration, setDuration] = useState(1);

    useEffect(() => {
        window.$('.star').on('click', function() {
            window.$('.star').css('color', '#ccc');
            window.$(this).prevAll().addBack().css('color', '#f39c12');
            window.$('#rating-msg').text(`Thank you for rating us ${window.$(this).data('val')} stars!`);
        });
    }, []);

    const handlePayment = async (tierName, pricePerMonth) => {
        const totalPrice = pricePerMonth * duration;
        localStorage.setItem('pendingPlan', JSON.stringify({ tier: tierName, duration: duration }));
        
        try {
            const response = await fetch('http://localhost:5001/api/checkout', { 
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ tierName, totalPrice })
            });
            const session = await response.json();
            
            // 🛑 PUT YOUR REAL STRIPE PUBLISHABLE KEY HERE
            const stripe = window.Stripe('pk_test_51UKHX80GdgkE0lZp389fceHlEiXmzQ1VFSoaIB5fNrPgsfZO0hOpKG0Mh8hYqbieSEeiw1cxfh1geBSUEj9xUCEe00DceslsVu'); 
            await stripe.redirectToCheckout({ sessionId: session.id });
        } catch (error) {
            alert("Network error: Make sure your backend server is running.");
        }
    };

    const cardStyle = { background: 'rgba(255, 255, 255, 0.95)', backdropFilter: 'blur(10px)', padding: '40px', borderRadius: '20px', flex: '1', minWidth: '300px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', border: '1px solid rgba(0,0,0,0.1)' };
    const btnStyle = { padding: '16px', background: '#0a0a0a', color: 'white', border: 'none', borderRadius: '10px', cursor: 'pointer', fontSize: '16px', fontWeight: '800', textTransform: 'uppercase', width: '100%', marginTop: '30px', transition: 'background 0.3s' };

    return (
        <div style={{ fontFamily: 'Poppins, sans-serif' }}>
            {/* HERO SECTION */}
            <div style={{ 
                position: 'relative', 
                background: 'url("https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=2000&auto=format&fit=crop") center/cover no-repeat', 
                padding: '120px 20px', 
                textAlign: 'center', 
                color: 'white' 
            }}>
                <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, background: 'linear-gradient(to bottom, rgba(0,0,0,0.8), rgba(0,0,0,0.4))', zIndex: 1 }}></div>
                
                <div style={{ position: 'relative', zIndex: 2, maxWidth: '800px', margin: '0 auto' }}>
                    <h1 style={{ fontSize: '4rem', fontWeight: '800', marginBottom: '20px', textShadow: '2px 2px 4px rgba(0,0,0,0.5)' }}>ELEVATE YOUR <span style={{ color: '#f39c12' }}>FITNESS</span></h1>
                    <p style={{ fontSize: '1.2rem', color: '#ddd', marginBottom: '40px', lineHeight: '1.8' }}>
                        Join the most exclusive training facility. State-of-the-art equipment, world-class trainers, and a community built on pushing limits.
                    </p>
                </div>
            </div>

            {/* PRICING SECTION */}
            <div style={{ padding: '80px 20px', background: '#f8f9fa', textAlign: 'center' }}>
                <h2 style={{ fontSize: '2.5rem', fontWeight: '800', color: '#111', marginBottom: '20px' }}>Choose Your Plan</h2>
                
                {/* Duration Toggle */}
                <div style={{ margin: '0 auto 50px', padding: '10px', background: 'white', borderRadius: '50px', display: 'inline-flex', boxShadow: '0 4px 15px rgba(0,0,0,0.05)', border: '1px solid #eee' }}>
                    {[1, 3, 6, 12].map(m => (
                        <button 
                            key={m}
                            onClick={() => setDuration(m)}
                            style={{ 
                                padding: '12px 24px', border: 'none', borderRadius: '40px', cursor: 'pointer', fontWeight: '600', fontSize: '15px', transition: 'all 0.3s ease',
                                background: duration === m ? '#f39c12' : 'transparent',
                                color: duration === m ? '#fff' : '#666'
                            }}
                        >
                            {m} {m === 1 ? 'Month' : 'Months'}
                        </button>
                    ))}
                </div>

                {/* Pricing Cards */}
                <div style={{ display: 'flex', gap: '30px', justifyContent: 'center', flexWrap: 'wrap', maxWidth: '1100px', margin: '0 auto' }}>
                    
                    <div className="card-hover" style={cardStyle}>
                        <div>
                            <h2 style={{ fontSize: '1.5rem', color: '#555', textTransform: 'uppercase', letterSpacing: '1px' }}>Basic</h2>
                            <h3 style={{ fontSize: '3rem', fontWeight: '800', color: '#111', margin: '20px 0' }}>${30 * duration}</h3>
                            <p style={{ color: '#888', marginBottom: '30px' }}>Perfect for getting started.</p>
                            <ul style={{ listStyle: 'none', padding: 0, textAlign: 'left', color: '#444', lineHeight: '2.2', fontWeight: '500' }}>
                                <li><span style={{ color: '#f39c12', marginRight: '10px' }}>✔</span> Off-peak hour access</li>
                                <li><span style={{ color: '#f39c12', marginRight: '10px' }}>✔</span> Standard equipment</li>
                                <li style={{ opacity: 0.5 }}><span style={{ marginRight: '10px' }}>✖</span> Group Classes</li>
                            </ul>
                        </div>
                        <button onClick={() => handlePayment('Basic', 30)} style={btnStyle}>Select Basic</button>
                    </div>

                    <div className="card-hover" style={{...cardStyle, transform: 'scale(1.05)', border: '2px solid #f39c12', background: '#111', color: 'white', position: 'relative' }}>
                        <div style={{ position: 'absolute', top: '-15px', left: '50%', transform: 'translateX(-50%)', background: '#f39c12', color: '#000', padding: '5px 20px', borderRadius: '20px', fontWeight: '800', fontSize: '12px', letterSpacing: '1px' }}>MOST POPULAR</div>
                        <div>
                            <h2 style={{ fontSize: '1.5rem', color: '#ccc', textTransform: 'uppercase', letterSpacing: '1px' }}>Pro</h2>
                            <h3 style={{ fontSize: '3rem', fontWeight: '800', color: '#f39c12', margin: '20px 0' }}>${50 * duration}</h3>
                            <p style={{ color: '#999', marginBottom: '30px' }}>Everything you need to grow.</p>
                            <ul style={{ listStyle: 'none', padding: 0, textAlign: 'left', color: '#ddd', lineHeight: '2.2', fontWeight: '500' }}>
                                <li><span style={{ color: '#f39c12', marginRight: '10px' }}>✔</span> 24/7 Gym Access</li>
                                <li><span style={{ color: '#f39c12', marginRight: '10px' }}>✔</span> All Group Classes</li>
                                <li><span style={{ color: '#f39c12', marginRight: '10px' }}>✔</span> Monthly Trainer Check-in</li>
                            </ul>
                        </div>
                        <button onClick={() => handlePayment('Pro', 50)} style={{...btnStyle, background: '#f39c12', color: '#000'}}>Select Pro</button>
                    </div>

                    <div className="card-hover" style={cardStyle}>
                        <div>
                            <h2 style={{ fontSize: '1.5rem', color: '#555', textTransform: 'uppercase', letterSpacing: '1px' }}>Elite</h2>
                            <h3 style={{ fontSize: '3rem', fontWeight: '800', color: '#111', margin: '20px 0' }}>${80 * duration}</h3>
                            <p style={{ color: '#888', marginBottom: '30px' }}>The ultimate fitness experience.</p>
                            <ul style={{ listStyle: 'none', padding: 0, textAlign: 'left', color: '#444', lineHeight: '2.2', fontWeight: '500' }}>
                                <li><span style={{ color: '#f39c12', marginRight: '10px' }}>✔</span> 24/7 Gym Access</li>
                                <li><span style={{ color: '#f39c12', marginRight: '10px' }}>✔</span> Unlimited Classes</li>
                                <li><span style={{ color: '#f39c12', marginRight: '10px' }}>✔</span> Dedicated Personal Trainer</li>
                                <li><span style={{ color: '#f39c12', marginRight: '10px' }}>✔</span> Spa & Sauna Access</li>
                            </ul>
                        </div>
                        <button onClick={() => handlePayment('Elite', 80)} style={btnStyle}>Select Elite</button>
                    </div>
                </div>
            </div>

            {/* RATINGS SECTION */}
            <div style={{ background: '#0a0a0a', padding: '60px 20px', color: 'white' }}>
                <h3 style={{ fontSize: '2rem', marginBottom: '15px' }}>Rate Your Experience</h3>
                <p style={{ color: '#888', marginBottom: '20px' }}>Let us know how we are doing!</p>
                <div style={{ fontSize: '3rem', cursor: 'pointer', marginBottom: '10px' }}>
                    <span className="star" data-val="1" style={{ color: '#444', textShadow: '0 0 5px rgba(0,0,0,0.5)', transition: 'color 0.2s' }}>★</span>
                    <span className="star" data-val="2" style={{ color: '#444', textShadow: '0 0 5px rgba(0,0,0,0.5)', transition: 'color 0.2s' }}>★</span>
                    <span className="star" data-val="3" style={{ color: '#444', textShadow: '0 0 5px rgba(0,0,0,0.5)', transition: 'color 0.2s' }}>★</span>
                    <span className="star" data-val="4" style={{ color: '#444', textShadow: '0 0 5px rgba(0,0,0,0.5)', transition: 'color 0.2s' }}>★</span>
                    <span className="star" data-val="5" style={{ color: '#444', textShadow: '0 0 5px rgba(0,0,0,0.5)', transition: 'color 0.2s' }}>★</span>
                </div>
                <p id="rating-msg" style={{ color: '#f39c12', fontWeight: '600', fontSize: '1.2rem' }}></p>
            </div>
        </div>
    );
}