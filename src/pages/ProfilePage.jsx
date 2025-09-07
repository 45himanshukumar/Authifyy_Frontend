import React from 'react';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import LoadingSpinner from '../components/common/LoadingSpinner';

const ProfilePage = () => {
  const { user, loading, isAuthenticated } = useAuth();

  if (loading) {
    return <LoadingSpinner />;
  }

  if (!isAuthenticated || !user) {
    return <div className="text-center p-8 text-red-600">You must be logged in to view this page.</div>;
  }

  return (
    <div className="container mx-auto p-8">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-md mx-auto">
        <h2 className="text-3xl font-bold mb-4 text-gray-800">My Profile</h2>
        <div className="space-y-4">
          <div className="border-b pb-2">
            <p className="text-gray-500">User ID:</p>
            <p className="text-lg font-semibold">{user.userId}</p>
          </div>
          <div className="border-b pb-2">
            <p className="text-gray-500">Name:</p>
            <p className="text-lg font-semibold">{user.name}</p>
          </div>
          <div className="border-b pb-2">
            <p className="text-gray-500">Email:</p>
            <p className="text-lg font-semibold">{user.email}</p>
          </div>
          <div className="border-b pb-2">
            <p className="text-gray-500">Account Verified:</p>
            <p className={`text-lg font-semibold ${user.isAccountVerified ? 'text-green-600' : 'text-red-600'}`}>
              {user.isAccountVerified ? 'Yes' : 'No'}
            </p>
            {!user.isAccountVerified && (
              <Link to="/verify-account" className="mt-2 inline-block text-sm text-blue-500 hover:underline">
                Verify My Account
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;