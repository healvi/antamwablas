import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import * as Middleware from "../middleware/Middleware";
import Login from "../pages/Auth/Login";
import Home from "../pages/Home";

const Routest = () => (
  <Router>
    <Routes>
    <Route
        path="/"
        exact
        element={
        //   <Middleware.Guest>
            <Home />
        //   </Middleware.Guest>
        }
      ></Route>
      <Route
        path="/Login"
        element={
        //   <Middleware.Guest>
            <Login />
        //   </Middleware.Guest>
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