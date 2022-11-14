import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import { getSession } from "../utils/Session";
const Donor = ({ children }) => {
  const roles = getSession("roles");
  const navigate = useNavigate();
  const { loggedIn } = useContext(AuthContext);
  useEffect(() => {
    if (roles === undefined || roles === null) {
      navigate("/login");
    } else if (roles !== "donor") {
      navigate("/");
    }
  }, [loggedIn, navigate, roles]);

  return children;
};

export default Donor;
