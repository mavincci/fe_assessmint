import { Outlet, useNavigate } from "react-router-dom";
import {jwtDecode} from "jwt-decode";
import { useEffect, useState } from "react";

const ProtectedRoute = () => {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const accessToken = localStorage.getItem("access");

  useEffect(() => {
    if (!accessToken) {
      navigate("/login", { replace: true });
      return;
    }

    try {
      const decodedToken = jwtDecode(accessToken);
      const currentTime = Date.now() / 1000;

      if (decodedToken.exp < currentTime) {
        localStorage.clear();
        navigate("/login", { replace: true });
      } else {
        setIsAuthenticated(true);
      }
    } catch (error) {
      console.error("Invalid token", error);
      localStorage.clear();
      navigate("/login", { replace: true });
    }
  }, [accessToken, navigate]);

//   return isAuthenticated ? <Outlet /> : null;
};

export default ProtectedRoute;
