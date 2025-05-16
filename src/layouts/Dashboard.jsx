// import Avatar from "@mui/material/Avatar";
import { useEffect, useState } from "react";
import Header from "../components/Header";
import Avatar from "@mui/material/Avatar";
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { LogOut, PlusCircle, Settings, User } from "lucide-react";
import Menus from "../components/Menu";
import { Outlet } from "react-router-dom";
import useAuthCheck from "../hooks/useAuthCheck";


const Dashboard = () => {
    // useAuthCheck()
  console.log("use authnitce runnig")
  const user = JSON.parse(localStorage.getItem("user"))
  
  // alert(localStorage.getItem("user"))

  const imgSrc = "";
  const formattedName = user?.firstName
  ? user.firstName.charAt(0).toUpperCase() + user.firstName.slice(1).toLowerCase()
    : "";
    const formattedLastName = user?.lastName
  ? user.lastName.charAt(0).toUpperCase() + user.lastName.slice(1).toLowerCase()
  : "";
  const [manageprofile, setvisibleManageProfile] = useState(false); 
  return (
    <div className="h-full top-0  flex">
      {/* left */}
      <div className="w-[16%] md:w-[10%] lg:w-[14%] p-3 bg-bg-secondary-light min-h-screen   justify-between ">
        <div className="cursor-pointer flex space-x-2 ml-4 items-center align-middle justify-center md:justify-start text-primary-blue-light font-semibold" onClick={()=>setvisibleManageProfile(!manageprofile)}>
          <Avatar
            id="image"
                          // src="https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"

            alt={user?.firstName}
            className="border-2 border-amber-400 text-sm "
            sx={{ bgcolor: "#8380FE", width: 50, height: 50 }}
          >
            {!imgSrc && user.firstName.charAt(0).toUpperCase() + user.lastName.charAt(0).toUpperCase()}
          </Avatar>
{/*  */}
          <span id="name" className="hidden lg:block">
            {formattedName} {formattedLastName}
          </span>
        </div>
        {manageprofile && (
        <>
       
       <div
  className={`transition-all duration-1000 ease-fluid transform ${
    manageprofile
      ? 'opacity-100 translate-y-0 pointer-events-auto'
      : 'opacity-0 -translate-y-2 pointer-events-none'
  } bg-white rounded-lg shadow-lg p-2 min-w-[200px] mt-7 absolute z-50`}
>
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
             
      </> 
        )}
      
        <Menus  roles = {user.roles = user.roles.filter(role => role !== "USER")[0]}  />

        {/* <div className="flex justify-baseline   ">
          <div className="rounded-xl md:p-5 bg-primary-blue-light w-[90%] flex flex-col items-center">
            <PlusCircle />
           <span className="hidden md:block text-center"> Create Assignment</span>
          </div>
          
        </div> */}
      </div>
      {/* right */}
      <div className="w-[84%] md:w-[90%] lg:w-[88%] bg-bg-light  max-h-screen overflow-auto scrollbar-hide  ">
        <Header />
        <Outlet />
      </div>
      </div>
  );
};

export default Dashboard;



