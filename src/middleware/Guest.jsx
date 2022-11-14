import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import { getSession } from "../utils/Session";
const Guest = ({ children }) => {
  const token = getSession("token");
  const navigate = useNavigate();
  const { loggedIn } = useContext(AuthContext);
  useEffect(() => {
    if (token === undefined || token === null) {
      navigate("/login");
    }
  }, [loggedIn, navigate, token]);

  return children;
};

export default Guest;
