import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { CartProvider, AuthProvider, useAuth } from './context/AppContext';
import Navbar from './components/Navbar';
import LandingPage from './pages/LandingPage';
import HomePage from './pages/HomePage';
import MenuPage from './pages/MenuPage';
import CategoryPage from './pages/CategoryPage';
import JuiceDetailPage from './pages/JuiceDetailPage';
import CartPage from './pages/CartPage';
import WishlistPage from './pages/WishlistPage';
import ContactPage from './pages/ContactPage';
import ProfilePage from './pages/ProfilePage';
import OffersPage from './pages/OffersPage';

function ProtectedRoute({ children }) {
  const { user } = useAuth();
  return user ? children : <Navigate to="/" replace />;
}

function AppRoutes({ darkMode, setDarkMode }) {
  const { user } = useAuth();
  return (
    <div className={darkMode ? 'dark' : ''}>
      <Toaster position="top-right" toastOptions={{ duration: 3000 }} />
      {user && <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />}
      <Routes>
        <Route path="/" element={user ? <Navigate to="/home" replace /> : <LandingPage />} />
        <Route path="/home" element={<ProtectedRoute><HomePage /></ProtectedRoute>} />
        <Route path="/menu" element={<ProtectedRoute><MenuPage /></ProtectedRoute>} />
        <Route path="/category/:id" element={<ProtectedRoute><CategoryPage /></ProtectedRoute>} />
        <Route path="/juice/:id" element={<ProtectedRoute><JuiceDetailPage /></ProtectedRoute>} />
        <Route path="/cart" element={<ProtectedRoute><CartPage /></ProtectedRoute>} />
        <Route path="/wishlist" element={<ProtectedRoute><WishlistPage /></ProtectedRoute>} />
        <Route path="/contact" element={<ProtectedRoute><ContactPage /></ProtectedRoute>} />
        <Route path="/offers" element={<ProtectedRoute><OffersPage /></ProtectedRoute>} />
        <Route path="/profile" element={<ProtectedRoute><ProfilePage /></ProtectedRoute>} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  );
}

export default function App() {
  const [darkMode, setDarkMode] = useState(true);
  return (
    <BrowserRouter>
      <AuthProvider>
        <CartProvider>
          <AppRoutes darkMode={darkMode} setDarkMode={setDarkMode} />
        </CartProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}
