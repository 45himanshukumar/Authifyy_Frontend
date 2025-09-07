import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import authifyApi from '../api/axios';
import { useAuth } from '../context/AuthContext';
import ErrorAlert from '../components/common/ErrorAlert';
import LoadingSpinner from '../components/common/LoadingSpinner';

const VerifyAccountPage = () => {
  const [otp, setOtp] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { user } = useAuth();

  const handleSendOtp = async () => {
    setLoading(true);
    setError('');
    try {
      await authifyApi.post('/send-otp', null, { params: { email: user.email } });
      setMessage('OTP sent to your email. Please check your inbox to verify your account.');
    } catch (err) {
      if (err.response && err.response.data && err.response.data.message) {
        setError(err.response.data.message);
      } else {
        setError('Failed to send OTP. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      await authifyApi.post('/verify-otp', { otp });
      setMessage('Account verified successfully!');
      // After verification, you might want to refresh the user state or redirect
      setTimeout(() => {
        navigate('/profile');
      }, 2000);
    } catch (err) {
      if (err.response && err.response.data && err.response.data.message) {
        setError(err.response.data.message);
      } else {
        setError('Verification failed. Please check the OTP and try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <LoadingSpinner />;
  }
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Verify Account</h2>
        <ErrorAlert message={error} />
        {message && (
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-4" role="alert">
            {message}
          </div>
        )}

        {user && user.isAccountVerified ? (
          <div className="text-center">
            <p className="text-lg text-green-600">Your account is already verified.</p>
          </div>
        ) : (
          <div className="space-y-4">
            <p className="text-gray-700">A verification OTP will be sent to your email: <span className="font-semibold">{user?.email}</span></p>
            <button
              onClick={handleSendOtp}
              className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition-colors disabled:opacity-50"
              disabled={loading}
            >
              Send Verification OTP
            </button>
            <form onSubmit={handleVerifyOtp} className="space-y-4">
              <div>
                <label className="block text-gray-700 mb-1" htmlFor="otp">Enter OTP</label>
                <input
                  type="text"
                  id="otp"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  required
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 transition-colors disabled:opacity-50"
                disabled={loading}
              >
                {loading ? 'Verifying...' : 'Verify Account'}
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default VerifyAccountPage;