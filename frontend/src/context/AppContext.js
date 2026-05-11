import React, { createContext, useContext, useReducer, useEffect } from 'react';

const CartContext = createContext();
const AuthContext = createContext();

// Cart Reducer
function cartReducer(state, action) {
  switch (action.type) {
    case 'ADD_ITEM': {
      const existing = state.items.find(i => i.id === action.payload.id);
      if (existing) {
        return { ...state, items: state.items.map(i => i.id === action.payload.id ? { ...i, qty: i.qty + 1 } : i) };
      }
      return { ...state, items: [...state.items, { ...action.payload, qty: 1 }] };
    }
    case 'REMOVE_ITEM':
      return { ...state, items: state.items.filter(i => i.id !== action.payload) };
    case 'UPDATE_QTY': {
      if (action.payload.qty <= 0) return { ...state, items: state.items.filter(i => i.id !== action.payload.id) };
      return { ...state, items: state.items.map(i => i.id === action.payload.id ? { ...i, qty: action.payload.qty } : i) };
    }
    case 'CLEAR_CART':
      return { ...state, items: [] };
    default:
      return state;
  }
}

export function CartProvider({ children }) {
  const [state, dispatch] = useReducer(cartReducer, { items: [] }, () => {
    try { return { items: JSON.parse(localStorage.getItem('amrutha_cart') || '[]') }; }
    catch { return { items: [] }; }
  });

  useEffect(() => {
    localStorage.setItem('amrutha_cart', JSON.stringify(state.items));
  }, [state.items]);

  const total = state.items.reduce((sum, i) => sum + i.price * i.qty, 0);
  const count = state.items.reduce((sum, i) => sum + i.qty, 0);

  const addItem = (item) => dispatch({ type: 'ADD_ITEM', payload: item });
  const removeItem = (id) => dispatch({ type: 'REMOVE_ITEM', payload: id });
  const updateQty = (id, qty) => dispatch({ type: 'UPDATE_QTY', payload: { id, qty } });
  const clearCart = () => dispatch({ type: 'CLEAR_CART' });

  return (
    <CartContext.Provider value={{ items: state.items, total, count, addItem, removeItem, updateQty, clearCart }}>
      {children}
    </CartContext.Provider>
  );
}

export function AuthProvider({ children }) {
  const [user, setUser] = React.useState(() => {
    try { return JSON.parse(localStorage.getItem('amrutha_user') || 'null'); }
    catch { return null; }
  });
  const [wishlist, setWishlist] = React.useState(() => {
    try { return JSON.parse(localStorage.getItem('amrutha_wishlist') || '[]'); }
    catch { return []; }
  });

  const login = (userData) => {
    setUser(userData);
    localStorage.setItem('amrutha_user', JSON.stringify(userData));
  };
  const logout = () => {
    setUser(null);
    localStorage.removeItem('amrutha_user');
  };
  const toggleWishlist = (id) => {
    setWishlist(prev => {
      const next = prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id];
      localStorage.setItem('amrutha_wishlist', JSON.stringify(next));
      return next;
    });
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, wishlist, toggleWishlist }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);
export const useAuth = () => useContext(AuthContext);
