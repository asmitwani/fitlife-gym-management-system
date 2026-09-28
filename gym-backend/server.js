require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const Stripe = require('stripe');

const app = express();
const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

// SCHEMA: Includes Registration Date and End Date
const userSchema = new mongoose.Schema({
    name: String,
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    hasActiveMembership: { type: Boolean, default: false },
    membershipTier: { type: String, default: 'None' },
    membershipDuration: { type: Number, default: 0 },
    hasTrainer: { type: Boolean, default: false },
    registrationDate: { type: Date, default: Date.now },
    membershipEndDate: { type: Date, default: null }
});
const User = mongoose.model('User', userSchema);

// Register User
app.post('/api/register', async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const newUser = new User({ name, email, password });
        await newUser.save();
        res.json({ message: "Success! User saved to MongoDB." });
    } catch (error) {
        res.status(400).json({ message: "Error: Email might already exist." });
    }
});

// Login User
app.post('/api/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email, password });
        if (user) {
            res.json({ success: true, message: "Login successful", user });
        } else {
            res.status(401).json({ success: false, message: "Invalid email or password." });
        }
    } catch (error) {
        res.status(500).json({ success: false, message: "Server error" });
    }
});

// Get All Users (Admin)
app.get('/api/users', async (req, res) => {
    try {
        const users = await User.find({});
        res.json({ success: true, users });
    } catch (error) {
        res.status(500).json({ success: false, message: "Server error" });
    }
});

// Delete User (Admin)
app.delete('/api/users/:id', async (req, res) => {
    try {
        await User.findByIdAndDelete(req.params.id);
        res.json({ success: true, message: "User deleted successfully" });
    } catch (error) {
        res.status(500).json({ success: false, message: "Error deleting user" });
    }
});

// Stripe Checkout
app.post('/api/checkout', async (req, res) => {
    try {
        const { tierName, totalPrice } = req.body;
        if (!process.env.STRIPE_SECRET_KEY) return res.status(500).json({ error: "Missing Stripe Secret Key" });

        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: [{
                price_data: { currency: 'usd', product_data: { name: `${tierName} Gym Membership` }, unit_amount: totalPrice * 100 },
                quantity: 1,
            }],
            mode: 'payment',
            success_url: 'http://localhost:5173/success',
            cancel_url: 'http://localhost:5173/cancel',
        });
        res.json({ id: session.id });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Update Membership (Calculates End Date)
app.post('/api/update-membership', async (req, res) => {
    try {
        const { email, tier, duration } = req.body;
        const hasTrainer = tier === 'Elite'; 
        
        // Calculate exact expiration date based on duration
        const endDate = new Date();
        endDate.setMonth(endDate.getMonth() + duration);

        const updatedUser = await User.findOneAndUpdate(
            { email: email },
            { 
                hasActiveMembership: true, 
                membershipTier: tier, 
                membershipDuration: duration, 
                hasTrainer: hasTrainer,
                membershipEndDate: endDate 
            },
            { new: true }
        );
        res.json({ success: true, user: updatedUser });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.listen(process.env.PORT, () => console.log(`Server running on port ${process.env.PORT}`));