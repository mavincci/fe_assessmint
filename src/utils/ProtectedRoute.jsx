import { Outlet, Navigate } from "react-router-dom";

// Optional: Use a library like jwt-decode for cleaner parsing
const parseJwt = (token) => {
  try {
    return JSON.parse(atob(token.split('.')[1]));
  } catch (e) {
    return null;
  }
};

const ProtectedRoutes = () => {
  const accessToken = localStorage.getItem("access");
  const userData = localStorage.getItem("user");
  const user = userData ? JSON.parse(userData) : null;

  const isAuthenticated = () => {
    if (!accessToken) return false;

    const decoded = parseJwt(accessToken);
    if (!decoded || !decoded.exp) return false;

    const currentTime = Math.floor(Date.now() / 1000); // in seconds
    if (decoded.exp < currentTime) {
      // Token has expired
      localStorage.removeItem("access");
      localStorage.removeItem("user");
      return false;
    }

    return true;
  };

  if (!isAuthenticated()) {
    return <Navigate to="/" replace />;
  }

  // Optional role-based redirect
  // if (user?.roles?.includes("EXAMINEE")) {
  //   return <Navigate to="/manage-assessment" replace />;
  // }

  return <Outlet />;
};

export default ProtectedRoutes;
