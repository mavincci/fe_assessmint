import React from 'react';
import { Outlet } from 'react-router-dom';
import hero from '../../assets/hero1.png';
import logo from '../../assets/logo.png';

const AuthLayout = () => {
  return (
    <div className="min-h-screen w-full flex bg-white text-black dark:bg-gray-900 dark:text-white">
      {/* Left Section */}
      <div className="md:w-1/2 w-full p-8 flex items-center justify-center">
        <div className="w-full max-w-md">
          <div className="flex items-center gap-2 mb-8">
            <img
              src={logo}
              alt="logo"
              className="absolute rounded-full inset-0 min-w-10 min-h-10 max-w-24 max-h-24 top-7 left-7"
            />
          </div>
          <Outlet />
        </div>
      </div>

      {/* Right Section */}
      <div className="w-0 md:w-1/2 relative hidden md:flex">
        <img
          src={hero}
          alt="Student studying"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40 dark:bg-black/60 " />
      </div>
    </div>
  );
};

export default AuthLayout;
