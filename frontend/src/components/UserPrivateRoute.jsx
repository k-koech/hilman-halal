import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { useContext, useEffect, useState } from "react";
import Spinner from "./utils/Spinner";

export const UserPrivateRoute = ({ children }) => {
  const { current_user } = useContext(AuthContext);
  const nav = useNavigate();
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    // Simulate a 2-second loading period
    const timer = setTimeout(() => {
      setLoading(false);
    }, 4000);

    return () => clearTimeout(timer); // Clean up the timer on unmount
  }, []);

  useEffect(() => {
    // Redirect after loading if the user is not logged in
    if (!loading && !current_user) {
      nav("/login");
    }
  }, [current_user, loading, nav]);

  if (loading) {
    // Display a loading spinner or placeholder during the 2-second delay
    return <Spinner/>
  }

  return current_user ? children : null;
};
