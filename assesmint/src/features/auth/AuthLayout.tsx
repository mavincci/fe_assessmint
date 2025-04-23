import React from 'react';
import { Outlet } from 'react-router-dom';
// import { ClipboardList } from 'lucide-react';
import hero from "../../../public/hero1.png"
import logo from "../../../public/logo.png"

const AuthLayout: React.FC = () => {
  return (
    <div className="min-h-screen w-full flex">
      {/* Left Section */}
      <div className="md:w-1/2 w-full p-8 bg-white flex items-center justify-center">
        <div className="w-full max-w-md">
          <div className="flex items-center gap-2 mb-8">
           <img src={logo} alt="logo"    className="absolute inset-0 w-24  h-24 top-7 left-7 rounded-full" />
          </div>
          <Outlet />
        </div>
      </div>
      
      {/* Right Section */}
      <div className="w-0 md:w-1/2 relative hidden md:flex border-0">
        <img 
          src={hero}
          alt="Student studying" 
          className="absolute inset-0 w-full h-full object-cover border-0"
        />
        {/* <div className="absolute inset-0 bg-gradient-to-r from-[#fff] to-[#8382FA]/40 backdrop-blur-[1px] border-0" /> */}
        {/* <div className="absolute inset-0 flex items-center justify-center">
          <div className="p-8 text-center text-white">
            <h2 className="text-4xl font-bold mb-4">Auto-graded Assignments</h2>
            <p className="text-lg text-emerald-50">
              Streamline your workflow with our intelligent grading system
            </p>
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default AuthLayout;