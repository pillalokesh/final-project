import React, { useState } from 'react';
import Home from './Home';
import Login from './Login';
import './App.css';

function App() {
  const [page, setPage] = useState('home');
  const [user, setUser] = useState(null);

  const handleLogin = (userData) => {
    setUser(userData);
    setPage('home');
  };

  const handleLogout = () => {
    setUser(null);
    setPage('home');
  };

  return (
    <div className="App">
      <nav className="navbar">
        <div className="nav-brand" onClick={() => setPage('home')}>
          🧇 Lokesh Waffle
        </div>
        <div className="nav-links">
          <button className="nav-btn" onClick={() => setPage('home')}>Home</button>
          {user ? (
            <>
              <span className="nav-user">👋 {user.name}</span>
              <button className="nav-btn logout" onClick={handleLogout}>Logout</button>
            </>
          ) : (
            <button className="nav-btn login" onClick={() => setPage('login')}>Login</button>
          )}
        </div>
      </nav>

      {page === 'home' && <Home user={user} onLoginClick={() => setPage('login')} />}
      {page === 'login' && <Login onLogin={handleLogin} onBack={() => setPage('home')} />}
    </div>
  );
}

export default App;
