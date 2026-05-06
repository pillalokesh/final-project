import React, { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [health, setHealth] = useState(null);

  useEffect(() => {
    fetch('/api/health')
      .then(res => res.json())
      .then(data => setHealth(data.status))
      .catch(() => setHealth('unreachable'));
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <h1>🧇 Lokesh Waffle</h1>
        <p>Welcome to Lokesh Waffle!</p>
        <p>Backend Status: <strong>{health || 'checking...'}</strong></p>
      </header>
    </div>
  );
}

export default App;
