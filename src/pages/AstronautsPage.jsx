
import { useEffect, useState } from "react";
import { getAllAstronauts } from "../services/astronautServices";
import { useNavigate, Link } from "react-router";
import {
  House,
  Orbit,
  Rocket,
  UserRound,
  LogOut
} from "lucide-react";
import "./AstronautsPage.css";
import Starfield from "../components/Starfield";
import "../css/Dashboard.css";

function AstronautsPage({ user, handleLogout }) {
  const [astronauts, setAstronauts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");

  const navigate = useNavigate();
  const isAdmin = user?.role === "admin";

  useEffect(() => {
    async function fetchAstronauts() {
      try {
        const data = await getAllAstronauts();
        setAstronauts(data);
      } catch (error) {
        setError("Unable to load astronauts. Please try again.");
        console.log(error);
      } finally {
        setLoading(false);
      }
    }

    fetchAstronauts();
  }, []);

  const filteredAstronauts = astronauts.filter((astronaut) =>
    `${astronaut.astronautName} ${astronaut.spaceAgency}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  if (loading) {
    return (
      <div className="astronauts-message">
        <div className="astronaut-loading-orbit"></div>
        <h2>Exploring the universe...</h2>
        <p>Loading astronauts</p>
      </div>
    );
  }

  if (error) {
    return <div className="astronauts-message">{error}</div>;
  }

  return (
    <div
      className={
        isAdmin
          ? "astronauts-admin-layout"
          : "astronauts-user-layout"
      }
    >
      {isAdmin && (
        <aside className="sidebar">
          <div className="sidebar-logo">
            <Orbit size={38} />
            <div>
              <h2>Orbital</h2>
              <p>Admin Panel</p>
            </div>
          </div>

          <nav>
            <Link to="/dashboard">
              <House size={20} />
              Dashboard
            </Link>

            <Link to="/planets">
              <Orbit size={20} />
              Planets
            </Link>

            <Link to="/missions">
              <Rocket size={20} />
              Space Missions
            </Link>

            <Link to="/astronauts" className="active">
              <UserRound size={20} />
              Astronauts
            </Link>
          </nav>

          <button
            className="logout-button"
            onClick={handleLogout}
          >
            <LogOut size={20} />
            Logout
          </button>
        </aside>
      )}

      <main className="astronauts-page">
        <Starfield />

        <section className="astronauts-stats">
          <div className="astronaut-stat">
            <span className="astronaut-stat-number">
              {astronauts.length}
            </span>
            <span className="astronaut-stat-label">
              SPACE EXPLORERS
            </span>
          </div>

          <div className="astronaut-stat">
            <span className="astronaut-stat-number">
              {new Set(astronauts.map((a) => a.spaceAgency)).size}
            </span>
            <span className="astronaut-stat-label">
              SPACE AGENCIES
            </span>
          </div>
        </section>

        <section className="astronauts-collection">
          <div className="astronauts-heading">
            <div>
              <span className="astronauts-small-label">
                THE PEOPLE BEHIND THE MISSIONS
              </span>
              <h2>Meet the Astronauts</h2>
              <p>
                Explore the pioneers who have traveled beyond our planet.
              </p>
            </div>
          </div>

          <div className="astronauts-search">
            <span>⌕</span>
            <input
              type="text"
              placeholder="Search astronauts or agencies..."
              value={search}
              onChange={(event) => setSearch(event.target.value)}
            />
          </div>

          {filteredAstronauts.length === 0 ? (
            <div className="astronauts-empty">
              <h3>No astronauts found</h3>
              <p>Try searching for another name or agency.</p>
            </div>
          ) : (
            <div className="astronauts-grid">
              {filteredAstronauts.map((astronaut) => (
                <article
                  className="astronaut-card"
                  key={astronaut._id}
                  onClick={() =>
                    navigate(`/astronauts/${astronaut._id}`)
                  }
                >
                  <div className="astronaut-card-top">
                    <div className="astronaut-avatar">
                      {astronaut.astronautName?.charAt(0)}
                    </div>
                    <span className="astronaut-card-symbol">✦</span>
                  </div>

                  <div className="astronaut-card-content">
                    <span className="astronaut-card-label">
                      SPACE EXPLORER
                    </span>

                    <h3>{astronaut.astronautName}</h3>

                    <p className="astronaut-agency">
                      <span>✧</span>
                      {astronaut.spaceAgency}
                    </p>

                    <p className="astronaut-debut">
                      Debut Year: {astronaut.debutYear || "Not available"}
                    </p>

                    <div className="astronaut-card-link">
                      Explore Profile <span>→</span>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>

        <footer className="astronauts-footer">
          <span></span>
          <p>
            <span>✦</span> Dream <b>•</b> Explore <b>•</b> Discover
          </p>
          <span></span>
        </footer>
      </main>
    </div>
  );
}

export default AstronautsPage;
