import React, { createContext, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getSession, deleteAuthSession } from "../utils/Session";

const AuthContext = createContext();
const AuthContextProvider = (props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const BASE_ID = process.env.REACT_APP_VERCEL_BASE_ID;
  const API_KEY = process.env.REACT_APP_VERCEL_API_KEY;
  const typeUser = useSelector((state) => state.users.userType);
  const loggedIn = useSelector((state) => state.users.isAuth);

  useEffect(() => {
    dispatch();
  }, []);
  return (
    <AuthContext.Provider value={{ loggedIn, typeUser }}>
      {props.children}
    </AuthContext.Provider>
  );
};
export { AuthContextProvider };
export default AuthContext;
