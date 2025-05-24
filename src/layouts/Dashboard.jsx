import { useEffect, useState } from "react";
import Header from "../components/Header";
import Avatar from "@mui/material/Avatar";
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { Bot, LogOut, PlusCircle, Settings, User } from "lucide-react";
import Menus from "../components/Menu";
import { Outlet, useLocation } from "react-router-dom";
import useAuthCheck from "../hooks/useAuthCheck";
import ChatAi from "../features/ai/Chat";
import { motion, AnimatePresence } from "framer-motion";
import chatIcon  from "../assets/chatAi.png"
const Dashboard = () => {
  const location = useLocation();

const isQuestionBank = location.pathname === "/question-bank";

  console.log("use authnitce runnig");
  const user = JSON.parse(localStorage.getItem("user"));

  const [manageprofile, setvisibleManageProfile] = useState(false);
  const [chatVisible, setChatVisible] = useState(false);

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

        {/* {manageprofile && (
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
        )} */}

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
{isQuestionBank && (
          <motion.button
            
        className="absolute top-7 right-4 z-50 bg-indigo-700 rounded-full p-3 text-white flex items-center justify-center cursor-pointer overflow-hidden transition-all duration-300 ease-in-out"
        style={{
          boxShadow: '0 0 8px rgba(0, 191, 255, 0.6)',
        }}
        animate={{
          width: chatVisible ? "160px" : "60px",
          borderRadius: chatVisible ? "2rem" : "9999px",
        }}
        transition={{ duration: 0.3 }}
        onClick={() => setChatVisible(prev => !prev)}
        aria-label="Toggle Chat AI"
        title="Toggle Chat AI"
      >
            <motion.img
          src={chatIcon}
          alt="Chat Icon"
          className="h-24 w-24 object-contain mx-auto"
          animate={{
            width: chatVisible ? "70px" : "50px",
            height: chatVisible ? "40px" : "50px",
            // marginRight: chatVisible ? "0.5rem" : "0.5rem",
          }}
              transition={{ duration: 0.3 }}
              
        />
        <motion.span
          className="whitespace-nowrap text-sm font-medium"
          initial={{ opacity: 0 }}
          animate={{ opacity: chatVisible ? 1 : 0 }}
          transition={{ duration: 0.3 }}
        >
          TestNest AI
        </motion.span>
      </motion.button>
)}



        <div className="max-h-[100vh] flex flex-col lg:flex-row w-full">
          {/* Main Content */}
          <div className={`w-full h-full transition-all duration-300 overflow-auto`}>
            <Outlet />
          </div>

         {chatVisible && isQuestionBank && <ChatAi/>}
   
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
