import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import { getSession } from "../utils/Session";
const Impact = ({ children }) => {
  const roles = getSession("roles");
  const navigate = useNavigate();
  const { loggedIn } = useContext(AuthContext);
  useEffect(() => {
    if (roles === undefined || roles === null) {
      navigate("/login");
    } else if (roles !== "impact") {
      navigate("/");
    }
  }, [loggedIn, navigate, roles]);

  return children;
};

export default Impact;
