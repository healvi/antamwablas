import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import * as Middleware from "../middleware/Middleware";
import Login from "../pages/Auth/Login";
import Dashboard from "../pages/Dashboard/Dashboard";
import History from "../pages/Dashboard/History";
import Home from "../pages/Home";

const Routest = () => (
  <Router>
    <Routes>
      <Route path="/" exact element={<Home />}>
        <Route index element={<Dashboard />} />
        <Route path="/History" element={<History />} />
      </Route>
      <Route
        path="/Login"
        element={
          <Login />
        }
      />
      {/* 
      <Route
        path="/"
        element={
          <Middleware.Authinticated>
            <Home />
          </Middleware.Authinticated>
        }
      >
        <Route index element={<CreatePlaylist />} />
        <Route path="playlist" element={<PlaylistPage />} />
        <Route path="track" element={<TrackPage />} />
        <Route path="profile" element={<UserProfile />} />
        <Route path="artist/:id" element={<ArtistsPage />} />
      </Route>
      <Route path="/notfound" element={<NotFound />} />
      <Route path="*" element={<NotFound />} /> */}
    </Routes>
  </Router>
);

export default Routest;
