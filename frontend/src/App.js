import React, { useState } from 'react';
import Home from './Home';
import SignUp from './SignUp';
import SignIn from './SignIn';
import Dashboard from './Dashboard';
import './App.css';

function App() {
  const [page, setPage] = useState('home');
  const [user, setUser] = useState(null);

  const handleSignUp = () => {
    setPage('signin');
  };

  const handleSignIn = (userData) => {
    setUser(userData);
    setPage('dashboard');
  };

  const handleLogout = () => {
    setUser(null);
    setPage('home');
  };

  return (
    <div className="App">
      {page !== 'dashboard' && (
        <nav className="navbar">
          <div className="nav-brand" onClick={() => setPage('home')}>
            🧇 Lokesh Waffle
          </div>
          <div className="nav-links">
            <button className="nav-btn" onClick={() => setPage('home')}>Home</button>
            {!user && (
              <>
                <button className="nav-btn" onClick={() => setPage('signin')}>Sign In</button>
                <button className="nav-btn signup" onClick={() => setPage('signup')}>Sign Up</button>
              </>
            )}
          </div>
        </nav>
      )}

      {page === 'home' && <Home onSignUp={() => setPage('signup')} />}
      {page === 'signup' && <SignUp onSuccess={handleSignUp} onBack={() => setPage('home')} />}
      {page === 'signin' && <SignIn onSuccess={handleSignIn} onBack={() => setPage('home')} />}
      {page === 'dashboard' && <Dashboard user={user} onLogout={handleLogout} />}
    </div>
  );
}

export default App;
