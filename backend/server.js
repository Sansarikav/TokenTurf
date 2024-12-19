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

// Start Server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
