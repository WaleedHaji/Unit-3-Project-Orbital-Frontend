
import { useEffect, useState } from "react";
import { getAllAstronauts } from "../services/astronautServices";
import { useNavigate } from "react-router";
import "./AstronautsPage.css";
import Starfield from "../components/Starfield";
function AstronautsPage() {
  const [astronauts, setAstronauts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");

  const navigate = useNavigate();

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
    <main className="astronauts-page">
        <Starfield />
      <section className="astronauts-hero">
        <div className="astronauts-hero-content">
          <div className="astronauts-eyebrow">
            <span></span>
            MEET THE EXPLORERS
          </div>

          <h1>
            Space <span>Explorers</span>
          </h1>

          <p>
            Discover the people who dare to go beyond Earth
            <br />
            and make history among the stars.
          </p>

          <div className="astronauts-hero-line"></div>
        </div>

        <div className="astronauts-hero-orbit">
          <div className="astronauts-orbit orbit-one"></div>
          <div className="astronauts-orbit orbit-two"></div>
          <div className="astronauts-planet"></div>
        </div>
      </section>

      <section className="astronauts-stats">
        <div className="astronaut-stat">
          <span className="astronaut-stat-number">
            {astronauts.length}
          </span>
          <span className="astronaut-stat-label">SPACE EXPLORERS</span>
        </div>

        <div className="astronaut-stat">
          <span className="astronaut-stat-number">
            {new Set(astronauts.map((a) => a.spaceAgency)).size}
          </span>
          <span className="astronaut-stat-label">SPACE AGENCIES</span>
        </div>
      </section>

      <section className="astronauts-collection">
        <div className="astronauts-heading">
          <div>
            <span className="astronauts-small-label">THE PEOPLE BEHIND THE MISSIONS</span>
            <h2>Meet the Astronauts</h2>
            <p>Explore the pioneers who have traveled beyond our planet.</p>
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
  );
}

export default AstronautsPage;
