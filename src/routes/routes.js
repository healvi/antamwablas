import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import * as Middleware from "../middleware/Middleware";
import Login from "../pages/Auth/Login";
import Broadcast from "../pages/Dashboard/Broadcast";
import Dashboard from "../pages/Dashboard/Dashboard";
import History from "../pages/Dashboard/History";
import Home from "../pages/Home";

const Routest = () => (
  <Router>
    <Routes>
      <Route path="/" exact element={<Home />}>
        <Route index element={<Dashboard />} />
        <Route path="/Broadcast" element={<Broadcast />} />
        <Route path="/History" element={<History />} />
      </Route>
      <Route
        path="/Login"
        element={
          <Login />
        }
      />
    
    </Routes>
  </Router>
);

export default Routest;
