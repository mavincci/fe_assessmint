// src/hooks/useAuthCheck.js
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode"; // Changed to named import

const useAuthCheck = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("access");

    if (token) {
      try {
        // Ensure the token is a string before decoding
        const decodedToken = jwtDecode(token);
        const currentTime = Date.now() / 1000;
        console.log(decodedToken);

        if (decodedToken.exp < currentTime) {
          // Token expired, redirect to login
          console.log("Token expired. Redirecting to /login");
          navigate("/login");
        } else {
          // Token valid, redirect to dashboard
          console.log("Token valid. Redirecting to /home-dashboard");
          // You might want to check if the user is *already* on home-dashboard
          // to avoid unnecessary navigation, but this code *forces* navigation.
          // Depending on your app flow, this might need adjustment.
           navigate("/home-dashboard"); // This line will run if token is valid
        }
      } catch (error) {
        console.error("Error decoding token:", error);
        // Handle decoding errors (invalid token format, etc.)
        navigate("/login");
      }
    } else {
      // No token found, redirect to login
      console.log("No token found. Redirecting to /login");
      navigate("/login");
    }
  }, [navigate]); // Added navigate to dependency array

  // Hooks should return something or null/undefined, or be used for side effects only.
  // Since this hook is primarily for side effects (navigation), it doesn't need to return anything.
};

export default useAuthCheck;