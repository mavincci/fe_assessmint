import { Outlet, Navigate } from "react-router-dom";

const ProtectedRoutes = () => {
  const getAccessToken = () => {
    return localStorage.getItem("access");
  };

  const userData = localStorage.getItem("user");
  const user = userData ? JSON.parse(userData) : null;

  const isAuthenticated = () => {
    return !!getAccessToken();
  };

  if (!isAuthenticated()) {
    return <Navigate to="/" replace />;
  }

//   if (user?.roles?.includes("EXAMINEE")) {
//     return <Navigate to="/manage-assessment" replace />;
//   }

  // ✅ If authenticated and NOT an EXAMINEE → allow route
  return <Outlet />;
};

export default ProtectedRoutes;
