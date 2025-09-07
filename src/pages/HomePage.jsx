import React from 'react';

const HomePage = () => {
  return (
    <div className="bg-[#7e748a] min-h-screen text-white p-4 flex flex-col items-center justify-center">
      
      <div className="w-full max-w-4xl text-center">

        
        <h1 className="text-4xl md:text-5xl font-bold mb-4 text-[#6EE7B7]">
          Welcome to Authentication!
        </h1>
        
        
        <p className="text-lg md:text-xl text-gray-200">
          A secure and robust authentication system built with Spring Boot and React.
        </p>
        
        <div className="mt-8 space-y-4">
         
          <h2 className="text-2xl md:text-3xl font-semibold text-[#6EE7B7]">
            Features:
          </h2>
          <ul className="list-disc list-inside text-left mx-auto max-w-md text-gray-200">
            <li>User Registration with Email Verification</li>
            <li>Login with JWT Authentication</li>
            <li>Secure Password Reset via OTP</li>
            <li>User Profile Management</li>
            <li>Full CRUD Operations on User Data</li>
          </ul>
        </div>

      </div>
    </div>
  );
};

export default HomePage;