import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('orca_user');
    return saved ? JSON.parse(saved) : null;
  });
  const [loading, setLoading] = useState(false);

  const loginWithEmail = async (email, password) => {
    setLoading(true);
    // Simulate brief network authentication
    await new Promise((resolve) => setTimeout(resolve, 600));
    const mockUser = {
      name: email.split('@')[0] || "Captain Sagar",
      email: email,
      role: "Marine Navigator / Fisherman",
      photo: null,
      authMethod: "email"
    };
    setUser(mockUser);
    localStorage.setItem('orca_user', JSON.stringify(mockUser));
    setLoading(false);
    return mockUser;
  };

  const loginWithGoogle = async () => {
    setLoading(true);
    // Simulate Google OAuth popup handshake
    await new Promise((resolve) => setTimeout(resolve, 800));
    const mockUser = {
      name: "Captain Ramesh Patil",
      email: "ramesh.patil.fisheries@gmail.com",
      role: "Licensed Commercial Fisher",
      photo: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80",
      authMethod: "google"
    };
    setUser(mockUser);
    localStorage.setItem('orca_user', JSON.stringify(mockUser));
    setLoading(false);
    return mockUser;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('orca_user');
  };

  return (
    <AuthContext.Provider value={{ user, loading, loginWithEmail, loginWithGoogle, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

