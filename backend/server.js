const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const crypto = require('crypto');

const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10
});

// Initialize DB table and demo user
db.getConnection((err, connection) => {
  if (err) {
    console.log('DB connection error:', err.message);
    return;
  }
  connection.query(`
    CREATE TABLE IF NOT EXISTS users (
      id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(100) NOT NULL,
      email VARCHAR(100) UNIQUE NOT NULL,
      password VARCHAR(64) NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `, (err) => {
    if (err) console.log('Table creation error:', err.message);
  });

  const demoPassword = crypto.createHash('sha256').update('admin123').digest('hex');
  connection.query(`
    INSERT IGNORE INTO users (name, email, password) VALUES (?, ?, ?)
  `, ['Admin User', 'admin@lokesh.com', demoPassword], (err) => {
    if (err) console.log('Demo user error:', err.message);
    else console.log('Demo user ready');
    connection.release();
  });
});

// Health check
app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'ok', message: 'Backend is healthy' });
});

// DB health check
app.get('/api/db-health', (req, res) => {
  db.query('SELECT 1', (err) => {
    if (err) return res.status(500).json({ status: 'error', message: 'DB connection failed' });
    res.status(200).json({ status: 'ok', message: 'DB connected' });
  });
});

// Login
app.post('/api/login', (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required' });
  }

  const hashedPassword = crypto.createHash('sha256').update(password).digest('hex');

  db.query(
    'SELECT id, name, email FROM users WHERE email = ? AND password = ?',
    [email, hashedPassword],
    (err, results) => {
      if (err) return res.status(500).json({ message: 'Server error' });
      if (results.length === 0) return res.status(401).json({ message: 'Invalid email or password' });
      res.status(200).json({ message: 'Login successful', user: results[0] });
    }
  );
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Backend running on port ${PORT}`);
});
