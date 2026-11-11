
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
      <Navbar user={user} handleLogout={handleLogout} />

      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/sign-up" element={<SignupPage />} />
        <Route path="/sign-in" element={<SignInPage setUser={setUser} />} />

        <Route path="/missions" element={<SpaceMissionsPage />} />
        <Route path="/missions/:missionId" element={<MissionDetails />} />
        <Route path="/astronauts" element={<AstronautsPage />} />
        <Route path="/astronauts/:astronautId" element={<AstronautDetails />} />
        <Route
          path="/dashboard"
          element={user ? <Dashboard user={user} /> : <Navigate to="/sign-in" />}
        />

        <Route
          path="/planets"
          element={user ? <PlanetPage /> : <Navigate to="/sign-in" />}
        />
        <Route
          path="/planets/:planetId"
          element={user ? <PlanetDetails user={user} /> : <Navigate to="/sign-in" />}
        />
        <Route
          path="/planets/new"
          element={user ? <CreatePlanet user={user} /> : <Navigate to="/sign-in" />}
        />
        <Route
          path="/planets/:id/edit"
          element={user ? <EditPlanet user={user} /> : <Navigate to="/sign-in" />}
        />
      </Routes>
    </div>
  );
}

export default App;
