import { useNavigate } from "react-router-dom";
import { useContext, useEffect } from "react";
import AuthContext from "../context/AuthContext";
import { getSession } from "../utils/Session";
const Authinticated = ({ children }) => {
  const token = getSession("token");
  const navigate = useNavigate();
  const { loggedIn } = useContext(AuthContext);
  useEffect(() => {
    if (token !== undefined && token !== null) {
      navigate(-1);
    }
  }, [loggedIn, navigate, token]);
  return children;
};

export default Authinticated;
