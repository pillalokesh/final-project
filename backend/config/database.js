const mysql = require('mysql2/promise');

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME || 'lokeshdb',
  port: process.env.DB_PORT || 3306,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  enableKeepAlive: true,
  keepAliveInitialDelay: 0
});

const initDB = async () => {
  try {
    const conn = await pool.getConnection();
    console.log('✅ MySQL RDS Connected:', process.env.DB_HOST);

    // Create users table
    await conn.query(`
      CREATE TABLE IF NOT EXISTS users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        email VARCHAR(100) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        phone VARCHAR(20) DEFAULT '',
        address TEXT DEFAULT '',
        role ENUM('user','admin') DEFAULT 'user',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Create orders table
    await conn.query(`
      CREATE TABLE IF NOT EXISTS orders (
        id INT AUTO_INCREMENT PRIMARY KEY,
        user_id INT NOT NULL,
        order_id VARCHAR(20) UNIQUE NOT NULL,
        items JSON NOT NULL,
        total DECIMAL(10,2) NOT NULL,
        delivery DECIMAL(10,2) DEFAULT 0,
        discount DECIMAL(10,2) DEFAULT 0,
        coupon VARCHAR(50) DEFAULT '',
        address JSON,
        status ENUM('confirmed','preparing','out_for_delivery','delivered','cancelled') DEFAULT 'confirmed',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users(id)
      )
    `);

    conn.release();
    console.log('✅ Database tables ready');
  } catch (error) {
    console.error('❌ DB Init Error:', error.message);
  }
};

module.exports = { pool, initDB };
