const express = require('express');
const fs = require('fs');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const SECRET_KEY = 'tokenturf';

const app = express();
const PORT = 3000;
const DATA_FILE = './db.json';

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
//app.use(express.static('dist'));


// Helper function to read and write to data.json
const readData = () => JSON.parse(fs.readFileSync(DATA_FILE, 'utf8'));
const writeData = (data) => fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));

app.get('/', (req, res) => {
  res.send('Welcome to the Authentication API!');
});

// Sign-In Route
app.post('/signin', async (req, res) => {
  const { email, password } = req.body;

  // Validate input
  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required' });
  }

  const users = readData();

  // Find user by email
  const user = users.find((u) => u.email === email);
  if (!user) {
    return res.status(400).json({ error: 'Invalid email or password' });
  }

  // Compare passwords
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(400).json({ error: 'Invalid email or password' });
  }

  // Generate JWT
  const token = jwt.sign({ email: user.email }, SECRET_KEY, { expiresIn: '1h' });

  res.json({ message: 'Sign-In successful', token });
});

// Sign-Up Route
app.post('/signup', async (req, res) => {
  const { name, email, password } = req.body;

  // Validate input
  if (!name || !email || !password) {
    return res.status(400).json({ error: 'All fields are required' });
  }
  if (password.length < 8) {
    return res.status(400).json({ error: 'Password must be at least 8 characters' });
  }

  const users = readData();

  // Check if email already exists
  if (users.find((user) => user.email === email)) {
    return res.status(400).json({ error: 'Email already registered' });
  }

  // Hash password
  const hashedPassword = await bcrypt.hash(password, 12);

  // Add new user
  users.push({ name, email, password: hashedPassword });
  writeData(users);

  res.status(201).json({ message: 'Sign-Up successful! Please log in.' });
});


app.get('/portfolio', (req, res) => {
  res.json({
    totalValue: 50000,
    totalTokens: 100
  });
});

app.get('/market-trends', (req, res) => {
  res.json({
    tokenPrice: 500,
    priceTrend: '+5% this week'
  });
});

// Add this endpoint to your server.js
app.get('/api/market-trends', (req, res) => {
  const marketData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
    prices: [100, 120, 130, 110, 140, 150, 160] // Replace with real data from your system
  };
  res.json(marketData);
});


app.get('/investment-opportunities', (req, res) => {
  res.json([
    { property: 'Property 1', price: 100000, tokensAvailable: 10 },
    { property: 'Property 2', price: 250000, tokensAvailable: 25 },
    { property: 'Property 3', price: 500000, tokensAvailable: 50 }
  ]);
});

app.get('/transaction-history', (req, res) => {
  res.json([
    { description: 'Bought 5 tokens for Property 1 on 12/01/2024' },
    { description: 'Sold 2 tokens for Property 2 on 12/05/2024' },
    { description: 'Bought 10 tokens for Property 3 on 12/10/2024' }
  ]);
});

app.get('/account-management', (req, res) => {
  res.json({
    name: 'John Doe',
    email: 'johndoe@example.com'
  });
});

app.get('/analytics', (req, res) => {
  res.json({
    roi: 10
  });
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
