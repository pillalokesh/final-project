import React, { useEffect, useState } from 'react';

function Home({ onSignUp }) {
  const [backendStatus, setBackendStatus] = useState('checking...');
  const [dbStatus, setDbStatus] = useState('checking...');

  useEffect(() => {
    fetch('/api/health')
      .then(res => res.json())
      .then(data => setBackendStatus(data.status === 'ok' ? '✅ Online' : '❌ Offline'))
      .catch(() => setBackendStatus('❌ Offline'));

    fetch('/api/db-health')
      .then(res => res.json())
      .then(data => setDbStatus(data.status === 'ok' ? '✅ Connected' : '❌ Disconnected'))
      .catch(() => setDbStatus('❌ Disconnected'));
  }, []);

  return (
    <div className="home">
      <div className="hero">
        <div className="hero-content">
          <h1>🧇 Welcome to Lokesh Waffle</h1>
          <p className="hero-subtitle">A Production-Ready AWS 3-Tier Architecture</p>
          <p className="hero-description">
            Experience seamless cloud deployment with ECS Fargate, RDS MySQL, and Application Load Balancer
          </p>
          <button className="hero-btn" onClick={onSignUp}>
            Get Started - Sign Up Free →
          </button>
        </div>
      </div>

      <div className="features">
        <div className="feature-card">
          <span className="feature-icon">⚡</span>
          <h3>Fast & Scalable</h3>
          <p>Powered by AWS ECS Fargate with auto-scaling</p>
        </div>
        <div className="feature-card">
          <span className="feature-icon">🔒</span>
          <h3>Secure</h3>
          <p>SSL/TLS encryption with AWS ACM</p>
        </div>
        <div className="feature-card">
          <span className="feature-icon">🌍</span>
          <h3>Highly Available</h3>
          <p>Multi-AZ deployment across availability zones</p>
        </div>
      </div>

      <div className="status-section">
        <h2>System Status</h2>
        <div className="status-cards">
          <div className="status-card">
            <span className="status-label">Backend API</span>
            <span className="status-value">{backendStatus}</span>
          </div>
          <div className="status-card">
            <span className="status-label">Database</span>
            <span className="status-value">{dbStatus}</span>
          </div>
          <div className="status-card">
            <span className="status-label">Frontend</span>
            <span className="status-value">✅ Online</span>
          </div>
        </div>
      </div>

      <footer className="footer">
        <p>© 2025 Lokesh Waffle | Built with AWS 3-Tier Architecture</p>
      </footer>
    </div>
  );
}

export default Home;
