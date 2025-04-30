import React, { createContext, useState, useContext, useEffect } from 'react';

// Create the context
const AuthContext = createContext();

// Create a provider component
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  
  // Admin email for demo purposes
  const ADMIN_EMAIL = 'admin@karmickiran.com';

  // Simulate checking for existing session
  useEffect(() => {
    // Simulating an async auth check
    const checkAuth = async () => {
      try {
        // In a real app, check for stored credentials
        // For this demo, we'll just set loading to false
        setLoading(false);
      } catch (error) {
        console.error('Auth check failed:', error);
        setLoading(false);
      }
    };
    
    checkAuth();
  }, []);

  // Login function
  const login = (email, password = null, otp = null) => {
    // For demo purposes, we accept any valid-looking email
    if (email && email.includes('@')) {
      // Check if it's an admin email
      const isAdmin = email.toLowerCase() === ADMIN_EMAIL.toLowerCase();
      
      // Create user object
      const newUser = {
        email,
        name: isAdmin ? 'Admin User' : 'Regular User',
        isAdmin,
        profilePic: null, // In a real app, this would come from the backend
      };
      
      setUser(newUser);
      return true;
    }
    return false;
  };

  // Logout function
  const logout = () => {
    setUser(null);
  };

  // Check if email is admin
  const isAdminEmail = (email) => {
    return email && email.toLowerCase() === ADMIN_EMAIL.toLowerCase();
  };

  return (
    <AuthContext.Provider 
      value={{ 
        user, 
        loading, 
        login, 
        logout, 
        isAdminEmail, 
        adminEmail: ADMIN_EMAIL 
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

// Custom hook to use the auth context
export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}