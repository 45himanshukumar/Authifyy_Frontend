import React, { createContext, useState, useEffect, useContext } from 'react';
import authifyApi from '../api/axios';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const verifyAuth = async () => {
    try {
      const response = await authifyApi.get('/is-authenticated');
      if (response.data === true) {
        setIsAuthenticated(true);
        try {
          const profileResponse = await authifyApi.get('/profile');
          setUser(profileResponse.data);
        } catch (profileError) {
          console.error("Failed to fetch user profile:", profileError);
          // Even if profile fetch fails, we know they are authenticated
          // We can handle this as a soft error.
        }
      } else {
        setIsAuthenticated(false);
        setUser(null);
      }
    } catch (error) {
      console.error("Authentication check failed:", error);
      setIsAuthenticated(false);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    verifyAuth();
  }, []);

  const login = async (email, password) => {
    try {
      const response = await authifyApi.post('/login', { email, password });
      if (response.data.token) {
        localStorage.setItem('jwtToken', response.data.token);
      }
      await verifyAuth(); // Re-verify to update state
      navigate('/profile');
    } catch (error) {
      console.error('Login failed:', error);
      throw error; // Re-throw to be handled by the component
    }
  };

  const logout = async () => {
    try {
      await authifyApi.post('/logout');
    } catch (error) {
      console.error("Logout failed:", error);
    } finally {
      localStorage.removeItem('jwtToken');
      setIsAuthenticated(false);
      setUser(null);
      navigate('/login');
    }
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

export default AuthContext;
