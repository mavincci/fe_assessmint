// import { LayoutDashboard, LibraryBig, UserCog } from "lucide-react";
import { role } from "../lib/data";
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
      } from "lucide-react";
      
// import AssessmentRoundedIcon from '@mui/icons-material/AssessmentRounded';
const Menus = () => {

      const menuItems = [
        {
          title: "TASKS",
          items: [
            {
              icon: <LayoutDashboard />,
              label: "Dashboard",
              href: "/dashboard",
              visible: ["admin", "user"],
            },
            {
              icon: <UserCog />,
              label: "User Management",
              href: "/user-management",
              visible: ["admin"],
            },
            {
              icon: <LibraryBig />,
              label: "Manage Assignment",
              href: "/manage-assignment",
              visible: ["admin"],
            },
            {
              icon: <FileText />,
              label: "My Assessments",
              href: "/my-assessments",
              visible: ["user"],
            },
            {
              icon: <ClipboardList />,
              label: "Take Assessment",
              href: "/take-assessment",
              visible: ["user"],
            },
            {
              icon: <BarChart3 />,
              label: "Reporting & Analytics",
              href: "/reporting-analytics",
              visible: ["admin"],
            },
            {
              icon: <CalendarDays />,
              label: "Calendar",
              href: "/calendar",
              visible: ["admin"],
            },
            {
              icon: <History />,
              label: "History",
              href: "/history",
              visible: ["user"],
            },
            {
              icon: <MessageSquare />,
              label: "Message",
              href: "/message",
              visible: ["admin", "user"],
            },
            {
              icon: <Settings />,
              label: "Setting",
              href: "/settings",
              visible: ["admin", "user"],
            },
            {
              icon: <LifeBuoy />,
              label: "Support",
              href: "/support",
              visible: ["admin"],
            },
            {
              icon: <ShieldCheck />,
              label: "Security",
              href: "/security",
              visible: ["admin"],
            },
          ],
        },
        {
          title: "ACTIONS",
          items: [
            {
              icon: <FilePlus />,
              label: "Create Assignment",
              href: "create-assignment",
              visible: ["admin", "user"],

            },
            {
              icon: <LogOut />,
              label: "Logout",
              href: "/logout",
              visible: ["admin", "user"],
            },
          ],
        },
      ];
      
  return (
      <div className="mt-4 text-sm">
          {menuItems.map((item) => (
              <div className="flex flex-col gap-2" key={item.title}>
                  <span className="hidden lg:block text-gray-400 font-light my-4">
                     {item.title}
                  </span>
                  {item.items.map((subItems) => {
                      if (subItems.visible.includes(role)) {
                          return (
                              <Link to={subItems.href}
                                  key={subItems.label}
                  className="flex items-center justify-center lg:justify-start gap-4 text-gray-500 py-2 md:px-2 rounded-md hover:bg-accent"
                              >
                                  <span>
                                  {subItems.icon}
                                  </span>
                                  <span className="hidden lg:block">
                                      {subItems.label}
                                  </span>
                              </Link>
                          )
                      }
                  })}
             </div> 
          ))}
      
          
    </div>
  )
}

export default Menus
