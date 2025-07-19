// weedata/src/contexts/AuthContext.js
import React, { createContext, useState, useContext, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Check if user is authenticated on app start
  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    try {
      const storedToken = await AsyncStorage.getItem('userToken');
      if (storedToken) {
        // Verify token with backend
        const response = await fetch('https://wee.mylivara.com/api/verify-user/', {
          headers: {
            'Authorization': `Token ${storedToken}`,
            'Content-Type': 'application/json',
          },
        });
        
        if (response.ok) {
          const data = await response.json();
          setToken(storedToken);
          setUser(data.user);
        } else {
          // Token is invalid, clear it
          await AsyncStorage.removeItem('userToken');
          setToken(null);
          setUser(null);
        }
      }
    } catch (error) {
      console.log('Auth check error:', error);
      await AsyncStorage.removeItem('userToken');
      setToken(null);
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (username, password) => {
    try {
      const response = await fetch('https://wee.mylivara.com/api/login/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });
        const data = await response.json();
        console.log('LOGIN API RESPONSE:', data);
      if (response.ok && data.token) {
        await AsyncStorage.setItem('userToken', data.token);
        setToken(data.token);
        setUser(data.user);
        console.log('User set in context:', data.user);
        return { success: true };
      } else {
        return { success: false, error: data.error || 'Login failed' };
      }
    } catch (error) {
      return { success: false, error: 'Network error' };
    }
  };

  const logout = async () => {
    try {
      // Call logout API if token exists
      if (token) {
        await fetch('https://wee.mylivara.com/api/logout/', {
          method: 'POST',
          headers: {
            'Authorization': `Token ${token}`,
            'Content-Type': 'application/json',
          },
        });
      }
    } catch (error) {
      console.log('Logout API error:', error);
    } finally {
      // Clear local data regardless of API call success
      await AsyncStorage.removeItem('userToken');
      setToken(null);
      setUser(null);
    }
  };

  return (
    <AuthContext.Provider value={{ 
      token, 
      user, 
      isLoading, 
      login, 
      logout, 
      checkAuthStatus 
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);