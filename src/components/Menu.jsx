
import { Link } from "react-router-dom";    import {
        LayoutDashboard,
        UserCog,
        LibraryBig,
        FileText,
        ClipboardList,
        BarChart3,
        CalendarDays,
        History,
        MessageSquare,
        Settings,
        LifeBuoy,
        ShieldCheck,
        FilePlus,
        LogOut,
        FileTextIcon,
        FileQuestion,
        TreeDeciduous,
        TreePalm,
        FolderTree,
        PlusCircle,
      } from "lucide-react";
import { logout } from "../action/Auth";
import { connect } from "react-redux";
import { useLocation } from "react-router-dom"; // <-- make sure this is at the top


// import AssessmentRoundedIcon from '@mui/icons-material/AssessmentRounded';
const Menus = ({ roles, logout, isAuthenticated }) => {
  console.log("MENU user role", roles)
  const location = useLocation()
  function handlelogout() {
    console.log("logging out....")
    logout();
  }
  const menuItems = [
    {
      title: "TASKS",
      items: [
        {
          icon: <LayoutDashboard />,
          label: "Dashboard",
          href: "/dashboard",
          visible: ["EXAMINER","ADMIN","EXAMINEE"],
        },
        {
          icon: <UserCog />,
          label: "User Management",
          href: "/user-management",
          visible: ["ADMIN"],
        },
        {
          icon: <LibraryBig />,
          label: "Manage Assessment",
          href: "/manage-assessment",
          visible: ["EXAMINER", "EXAMINEE"],
        },
        {
          icon: <FileText />,
          label: "Assessments Results",
          href: "/assessment-results",
          visible: ["EXAMINER", "ADMIN"],
        },
        // {
        //   icon: <FileTextIcon />,
        //   label: "My Assessments",
        //   href: "/assessment",
        //   visible: ["EXAMINER","EXAMINEE"],
        // },
     
        // {
        //   icon: <ClipboardList />,
        //   label: "Take Assessment",
        //   href: "/take-assessment",
        //   visible: ["EXAMINEE", "EXAMINER"],
        // },
        // {
        //   icon: <BarChart3 />,
        //   label: "Reporting & Analytics",
        //   href: "/reporting-analytics",
        //   visible: ["ADMIN"],
        // },
        // {
        //   icon: <CalendarDays />,
        //   label: "Calendar",
        //   href: "/calendar",
        //   visible: ["ADMIN", ],
        // },
        {
          icon: <History />,
          label: "History",
          href: "/history",
          visible: ["EXAMINER","EXAMINEE"],
        },
        {
          icon: <MessageSquare />,
          label: "Notification",
          href: "/notifications",
          visible: ["EXAMINER","ADMIN"],
        },
        {
          icon: <FilePlus />,
          label: "Create Assessment",
          href: "/create-assessment",
          visible: ["EXAMINER", "ADMIN"],
        },
        // {
        //   icon: <LifeBuoy />,
        //   label: "Support",
        //   href: "/support",
        //   visible: ["EXAMINER"],
        // },
        // {
        //   icon: <ShieldCheck />,
        //   label: "Security",
        //   href: "/security",
        //   visible: ["EXAMINER"],
        // },
      ],
    },
     {
      title: "QUESTION BANK",
      items: [
       {
          icon: <FileQuestion />,
          label: "All Repositories",
          href: "/question-bank",
          visible: ["EXAMINER","ADMIN"],
        },
          {
          icon: <FileQuestion />,
          label: "AI",
          href: "/ai",
          visible: ["EXAMINER","ADMIN"],
        },
        //   {
        //   icon: <FileQuestion />,
        //   label: "My Repositories",
        //   href: "/my-question-repository",
        //   visible: ["EXAMINER","ADMIN"],
        // },
              {
          icon: <FolderTree />,
          label: "Categories",
          href: "/categories",
          visible: ["EXAMINER","ADMIN"],
        },
      ],
    },
    {
      title: "ACTIONS",
      items: [
      
          {
          icon: <Settings />,
          label: "Setting",
          href: "/settings",
          visible: ["EXAMINER", "ADMIN", "EXAMINEE"],
        },
        {
          icon: <LogOut />,
          label: "Logout",
          href: "/",
          visible: ["EXAMINER", "ADMIN","EXAMINEE"],
        },
      ],
    },
  ];
  
   
  return (
      <div className="mt-4 text-sm h-[100vh] overflow-y-auto scrollbar-hide font-display">
          {menuItems.map((item) => (
              <div className="flex flex-col gap-2" key={item.title}>
                  <span className="hidden lg:block text-gray-200 font-light my-4">
                     {item.title}
                  </span>
                  {item.items.map((subItems) => {
                      if (subItems.visible.includes(roles)) {
                          return (
                            <Link
                            to={subItems.label !== "Logout" ? subItems.href : subItems.href}
                            key={subItems.label}
                            onClick={subItems.label === "Logout" ? handlelogout : null}
                            className={`flex items-center justify-center lg:justify-start gap-2 text-white py-2 md:px-2 rounded-md w-full   hover:bg-accent ${
                              location.pathname === subItems.href ? "bg-accent" : ""
                            }`}
                          >
                            <span>{subItems.icon}</span>
                            <span className="hidden lg:block p-1">{subItems.label}</span>
                          </Link>
                          )
                      }
                  })}
              
             </div> 
          ))}
      
      {roles === "EXAMINER" || roles == "ADMIN" && (
          <Link to="/create-assessment" className=" fixed bottom-6 flex items-center justify-center lg:justify-start gap-2 text-white py-2 md:px-2  lg:py-6 lg:w-[10%] rounded-md w-[4%]  bg-[#8380FE] ">
         <span className=""> <PlusCircle className=""/></span> <span className="hidden lg:block p-1">Create Assessment</span>
        </Link>
      )

      }
                
      </div>
  )
}

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});
export default connect(mapStateToProps, { logout })(Menus)