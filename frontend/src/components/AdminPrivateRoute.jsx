import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { useContext, useEffect, useState } from "react";
import Spinner from "./utils/Spinner";

export const AdminPrivateRoute = ({ children }) => {
  const { current_user } = useContext(AuthContext);
  const nav = useNavigate();
  const [loading, setLoading] = useState(true);

  // Simulate a loading delay
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 4000);
    return () => clearTimeout(timer); // Clean up timer
  }, []);

  useEffect(() => {
    // Redirect if user is not admin or staff after loading
    if (!loading && (!current_user || (!current_user.is_admin && !current_user.is_staff))) {
      nav("/login");
    }
  }, [current_user, loading, nav]);

  if (loading) {
    return <Spinner />;
  }

  // Render children only if the user is admin or staff
  return current_user && (current_user.is_admin || current_user.is_staff) ? children : null;
};






