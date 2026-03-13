const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET || 'carbonwise_secret_2024';

// Mock users for demo
const mockUsers = [];

// Register
router.post('/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) return res.status(400).json({ error: 'All fields required' });
    
    const existing = mockUsers.find(u => u.email === email);
    if (existing) return res.status(400).json({ error: 'User already exists' });
    
    const user = { id: Date.now().toString(), name, email, password, preferences: { dailyMileage: 40, yearsOfUse: 8, drivingPattern: 'Mixed' } };
    mockUsers.push(user);
    
    const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, { expiresIn: '7d' });
    res.json({ token, user: { id: user.id, name, email, preferences: user.preferences } });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    // Demo account always works
    if (email === 'demo@carbonwise.com' && password === 'demo123') {
      const token = jwt.sign({ id: 'demo', email }, JWT_SECRET, { expiresIn: '7d' });
      return res.json({ token, user: { id: 'demo', name: 'Demo User', email, preferences: { dailyMileage: 40, yearsOfUse: 8, drivingPattern: 'Mixed' } } });
    }
    const user = mockUsers.find(u => u.email === email && u.password === password);
    if (!user) return res.status(401).json({ error: 'Invalid credentials' });
    const token = jwt.sign({ id: user.id, email }, JWT_SECRET, { expiresIn: '7d' });
    res.json({ token, user: { id: user.id, name: user.name, email, preferences: user.preferences } });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
