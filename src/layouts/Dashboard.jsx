import { useEffect, useState } from "react";
import Header from "../components/Header";
import Avatar from "@mui/material/Avatar";
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { Bot, LogOut, PlusCircle, Settings, User } from "lucide-react";
import Menus from "../components/Menu";
import { Outlet } from "react-router-dom";
import useAuthCheck from "../hooks/useAuthCheck";
import ChatAi from "../features/ai/Chat";
import { motion, AnimatePresence } from "framer-motion";

const Dashboard = () => {
  // useAuthCheck()
   const [showHeader, setShowHeader] = useState(true);

  // useEffect(() => {
  //   // Set a timer to hide the header after 5000 milliseconds (5 seconds)
  //   const timer = setTimeout(() => {
  //     setShowHeader(false);
  //   }, 5000);

  //   // Cleanup function: Clear the timer if the component unmounts
  //   // before the 5 seconds are up.
  //   return () => clearTimeout(timer);
  // }, []);
  console.log("use authnitce runnig");
  const user = JSON.parse(localStorage.getItem("user"));

  const [manageprofile, setvisibleManageProfile] = useState(false);
  const [chatVisible, setChatVisible] = useState(true);

  const imgSrc = "";
  const formattedName = user?.firstName
    ? user.firstName.charAt(0).toUpperCase() + user.firstName.slice(1).toLowerCase()
    : "";
  const formattedLastName = user?.lastName
    ? user.lastName.charAt(0).toUpperCase() + user.lastName.slice(1).toLowerCase()
    : "";

  return (
    <div className="h-full top-0 flex">
      {/* left */}
      <div className="w-[16%] md:w-[10%] lg:w-[14%] p-3 bg-bg-secondary-light max-h-[100vh] overflow-y-auto scrollbar-hide  justify-between ">
        <div
          className="cursor-pointer flex space-x-2 ml-4 items-center align-middle justify-center md:justify-start text-primary-blue-light font-semibold"
          onClick={() => setvisibleManageProfile(!manageprofile)}
        >
          <Avatar
            id="image"
            alt={user?.firstName}
            className="border-2 border-amber-400 text-sm "
            sx={{ bgcolor: "#8380FE", width: 50, height: 50 }}
          >
            {!imgSrc && user.firstName.charAt(0).toUpperCase() + user.lastName.charAt(0).toUpperCase()}
          </Avatar>
          <span id="name" className="hidden lg:block">
            {formattedName} {formattedLastName}
          </span>
        </div>

        {manageprofile && (
          <div className="bg-white rounded-lg shadow-lg p-2 min-w-[200px] mt-7 absolute z-50">
            <div className="flex items-center space-x-2 p-2 hover:bg-violet-50 rounded cursor-pointer">
              <User size={16} />
              <span>Profile</span>
            </div>
            <div className="flex items-center space-x-2 p-2 hover:bg-violet-50 rounded cursor-pointer">
              <Settings size={16} />
              <span>Settings</span>
            </div>
            <DropdownMenu.Separator className="h-px bg-gray-200 my-2" />
            <div className="flex items-center space-x-2 p-2 hover:bg-violet-50 rounded cursor-pointer text-red-600">
              <LogOut size={16} />
              <span>Logout</span>
            </div>
          </div>
        )}

        <Menus roles={user.roles = user.roles.filter(role => role !== "USER")[0]} />
      </div>

      {/* right */}
      <div className="w-[84%] md:w-[90%] lg:w-[88%] bg-bg-light h-[100vh] overflow-auto scrollbar-hide relative">
         <AnimatePresence>
      {/* Conditionally render the motion.div based on the showHeader state */}
      {/* {showHeader && ( */}
        <motion.div
          initial={{ opacity: 1 }}
          // We don't need an explicit 'animate' here if the initial state is the desired visible state.
          // If you wanted a different entry animation, you'd define 'animate'.
          transition={{ duration: 0.8 }}
          exit={{ opacity: 0, y: -50 }} // Example exit animation: fade out and move up
        >
          <Header />
        </motion.div>
      {/* )} */}
    </AnimatePresence>

        {/* Toggle Chat Button */}
 <motion.button
      className="absolute top-7 right-4 z-50 bg-btn-primary  rounded-full p-3 text-white flex items-center justify-center cursor-pointer overflow-hidden your-custom-glow-class" // Add a custom class for styling if using CSS file
      style={{ // Using inline styles for demonstration, can move to CSS class
        boxShadow: '0 0 8px rgba(0, 191, 255, 0.6)', // Initial subtle blue glow
        transition: 'box-shadow 0.4s ease-in-out', // Smooth transition for glow
      }}
      whileHover={{
        scale: 1.1,
        width: "120px",
        boxShadow: '0 0 20px rgba(0, 191, 255, 0.9), 0 0 30px rgba(0, 191, 255, 0.6)', // Stronger glow on hover
        transition: { duration: 0.4 }
      }}
      whileTap={{ scale: 0.9 }}
      onClick={() => setChatVisible(prev => !prev)}
      aria-label="Toggle Chat AI"
      title="Toggle Chat AI"
    >
      <Bot size={24} className="mr-2" />
      <motion.span
        className="whitespace-nowrap your-custom-text-glow-class" // Add a custom class for styling
        initial={{ opacity: 0, width: 0 }}
        whileHover={{
          opacity: 1,
          width: "auto",
          textShadow: '0 0 8px rgba(255, 255, 255, 0.8)', // Subtle text glow on hover
        }}
        transition={{ duration: 0.4 }}
      >
        TestNest AI
      </motion.span>
    </motion.button>


        <div className="max-h-[100vh] flex flex-col lg:flex-row w-full">
          {/* Main Content */}
          <div className={`w-full h-full transition-all duration-300 overflow-auto`}>
            <Outlet />
          </div>

   
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
