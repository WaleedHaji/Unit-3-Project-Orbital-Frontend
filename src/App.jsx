
import { useState } from "react";
import { Navigate, Route, Routes } from "react-router";
import Navbar from "./components/Navbar";
import SignupPage from "./pages/SignupPage";
import Homepage from "./pages/Homepage";
import SignInPage from "./pages/SigninPage";
import Dashboard from "./pages/Dashboard";
import { logout } from "./services/authService";

import SpaceMissionsPage from "./pages/SpaceMissionsPage";
import MissionDetails from "./pages/MissionDetails";
import AstronautsPage from "./pages/AstronautsPage";
import AstronautDetails from "./pages/AstronautDetails";

import CreatePlanet from "./pages/CreateNewPlanet";
import EditPlanet from "./pages/EditPlanet";
import PlanetPage from "./pages/PlanetPage";
import PlanetDetails from "./pages/PlanetDetails";
import CreateMission from "./pages/CreateMission";
import CreateAstronaut from "./pages/CreateAstronaut";

function App() {
  function getUserFromToken() {
    const token = localStorage.getItem("token");

    if (!token) return null;

    return JSON.parse(atob(token.split(".")[1]));
  }

  const [user, setUser] = useState(getUserFromToken());

  function handleLogout() {
    logout();
    setUser(null);
  }

  return (
    <div>
      {(!user || user.role !== "admin") && (
  <Navbar user={user} handleLogout={handleLogout} />
)}

      <Routes>
        <Route path="/" element={<Homepage />} />

        <Route path="/sign-up" element={<SignupPage />} />

        <Route
          path="/sign-in"
          element={<SignInPage setUser={setUser} />}
        />

        <Route
  path="/dashboard"
  element={
    user?.role === "admin" ? (
      <Dashboard user={user} handleLogout={handleLogout} />
    ) : (
      <Navigate to="/" />
    )
  }
/>

        <Route
          path="/planets"
          element={
            user ? (
              <PlanetPage handleLogout={handleLogout} />
            ) : (
              <Navigate to="/sign-in" />
            )
          }
        />

        <Route
          path="/planets/:planetId"
          element={
            user ? (
              <PlanetDetails user={user} />
            ) : (
              <Navigate to="/sign-in" />
            )
          }
        />

        <Route
          path="/planets/new"
          element={
            user ? (
              <CreatePlanet user={user} />
            ) : (
              <Navigate to="/sign-in" />
            )
          }
        />

        <Route
          path="/planets/:id/edit"
          element={
            user ? (
              <EditPlanet user={user} />
            ) : (
              <Navigate to="/sign-in" />
            )
          }
        />

        <Route
          path="/missions"
          element={<SpaceMissionsPage handleLogout={handleLogout} />}
        />

        <Route
          path="/missions/:missionId"
          element={<MissionDetails user={user} />}
        />

        <Route
          path="/missions/new"
          element={
            user ? (
              <CreateMission handleLogout={handleLogout} />
            ) : (
              <Navigate to="/sign-in" />
            )
          }
        />

        <Route
          path="/astronauts"
          element={<AstronautsPage handleLogout={handleLogout} />}
        />

        <Route
          path="/astronauts/:astronautId"
          element={<AstronautDetails user={user} />}
        />

      <Route
      path="/astronauts/new"
        element={
         user ? (
        <CreateAstronaut handleLogout={handleLogout} />
       ) : (
        <Navigate to="/sign-in" />
         )
      }
   />

        <Route path="/admin" element={<Dashboard />} />
      </Routes>
    </div>
  );
}

export default App;
