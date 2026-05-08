import React, { useEffect, useState } from 'react';

function Dashboard({ user, onLogout }) {
  const [stats, setStats] = useState({ backend: 'checking...', database: 'checking...' });

  useEffect(() => {
    fetch('/api/health')
      .then(res => res.json())
      .then(data => setStats(prev => ({ ...prev, backend: data.status === 'ok' ? '✅ Online' : '❌ Offline' })))
      .catch(() => setStats(prev => ({ ...prev, backend: '❌ Offline' })));

    fetch('/api/db-health')
      .then(res => res.json())
      .then(data => setStats(prev => ({ ...prev, database: data.status === 'ok' ? '✅ Connected' : '❌ Disconnected' })))
      .catch(() => setStats(prev => ({ ...prev, database: '❌ Disconnected' })));
  }, []);

  return (
    <div className="dashboard">
      <nav className="dashboard-nav">
        <div className="nav-brand">🧇 Lokesh Waffle</div>
        <div className="nav-links">
          <span className="user-badge">👤 {user.name}</span>
          <button className="logout-btn" onClick={onLogout}>Logout</button>
        </div>
      </nav>

      <div className="dashboard-content">
        <div className="welcome-section">
          <h1>Welcome, {user.name}! 👋</h1>
          <p>You have successfully signed in to your dashboard</p>
        </div>

        <div className="dashboard-grid">
          <div className="dashboard-card">
            <div className="card-icon">📊</div>
            <h3>System Overview</h3>
            <div className="card-stats">
              <div className="stat-item">
                <span className="stat-label">Backend API</span>
                <span className="stat-value">{stats.backend}</span>
              </div>
              <div className="stat-item">
                <span className="stat-label">Database</span>
                <span className="stat-value">{stats.database}</span>
              </div>
              <div className="stat-item">
                <span className="stat-label">Frontend</span>
                <span className="stat-value">✅ Online</span>
              </div>
            </div>
          </div>

          <div className="dashboard-card">
            <div className="card-icon">👤</div>
            <h3>Account Info</h3>
            <div className="account-info">
              <div className="info-row">
                <span className="info-label">Name:</span>
                <span className="info-value">{user.name}</span>
              </div>
              <div className="info-row">
                <span className="info-label">Email:</span>
                <span className="info-value">{user.email}</span>
              </div>
              <div className="info-row">
                <span className="info-label">User ID:</span>
                <span className="info-value">#{user.id}</span>
              </div>
            </div>
          </div>

          <div className="dashboard-card">
            <div className="card-icon">🚀</div>
            <h3>Infrastructure</h3>
            <ul className="infra-list">
              <li>✅ AWS ECS Fargate</li>
              <li>✅ Application Load Balancer</li>
              <li>✅ RDS MySQL Multi-AZ</li>
              <li>✅ Route53 + ACM SSL</li>
              <li>✅ ECR Docker Registry</li>
            </ul>
          </div>

          <div className="dashboard-card">
            <div className="card-icon">🔐</div>
            <h3>Security</h3>
            <ul className="infra-list">
              <li>✅ HTTPS Enforced</li>
              <li>✅ Private Subnets</li>
              <li>✅ Security Groups</li>
              <li>✅ IAM Roles</li>
              <li>✅ Encrypted Database</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
