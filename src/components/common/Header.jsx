import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const Header = () => {
  const { isAuthenticated, user, logout } = useAuth();
  return (
    <header className="bg-gray-800 text-white p-4">
      <nav className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-xl font-bold">Authify</Link>
        <div className="flex space-x-4">
          <Link to="/" className="hover:text-gray-400">Home</Link>
          {isAuthenticated ? (
            <>
              <Link to="/users" className="hover:text-gray-400">Users</Link>
              <Link to="/profile" className="hover:text-gray-400">Profile</Link>
              <button onClick={logout} className="hover:text-gray-400">
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="hover:text-gray-400">Login</Link>
              <Link to="/register" className="hover:text-gray-400">Register</Link>
            </>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Header;