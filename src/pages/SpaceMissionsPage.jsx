
import { useEffect, useState } from "react";
import { getAllMissions } from "../services/spaceMissionServices";
import { useNavigate } from "react-router";
import "./SpaceMissionsPage.css";

function SpaceMissionsPage() {
  const [missions, setMissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [activeFilter, setActiveFilter] = useState("All");

  const navigate = useNavigate();

  useEffect(() => {
    async function fetchMissions() {
      try {
        const data = await getAllMissions();
        setMissions(data);
      } catch (error) {
        setError("Unable to load missions. Please try again.");
        console.log(error);
      } finally {
        setLoading(false);
      }
    }

    fetchMissions();
  }, []);

  const featuredMission =
    missions.find((mission) => mission.status?.toLowerCase() === "ongoing") ||
    missions[0];

  const filteredMissions = missions.filter((mission) => {
    const matchesSearch =
      mission.missionName?.toLowerCase().includes(search.toLowerCase()) ||
      mission.spaceAgency?.toLowerCase().includes(search.toLowerCase()) ||
      mission.destination?.toLowerCase().includes(search.toLowerCase());

    const matchesFilter =
      activeFilter === "All" ||
      mission.status?.toLowerCase() === activeFilter.toLowerCase();

    return matchesSearch && matchesFilter;
  });

  const ongoingCount = missions.filter(
    (mission) => mission.status?.toLowerCase() === "ongoing"
  ).length;

  const upcomingCount = missions.filter(
    (mission) => mission.status?.toLowerCase() === "upcoming"
  ).length;

  const completedCount = missions.filter(
    (mission) => mission.status?.toLowerCase() === "completed"
  ).length;

  function getStatusClass(status) {
    if (status?.toLowerCase() === "ongoing") return "status-ongoing";
    if (status?.toLowerCase() === "upcoming") return "status-upcoming";
    return "status-completed";
  }

  function openMission(id) {
    navigate(`/missions/${id}`);
  }

  if (loading) {
    return (
      <div className="missions-message">
        <div className="loading-orbit"></div>
        <h2>Exploring the universe...</h2>
        <p>Loading space missions</p>
      </div>
    );
  }

  if (error) {
    return <div className="missions-message">{error}</div>;
  }

  return (
    <main className="missions-page">
      <section className="missions-hero">
        <div className="hero-content">
          <div className="hero-eyebrow">
            <span className="hero-eyebrow-line"></span>
            THE UNIVERSE IS WAITING
          </div>

          <h1>
            Beyond <span>Earth.</span>
            <br />
            Beyond <span>Limits.</span>
          </h1>

          <p>
            Discover humanity's greatest journeys into space.
            Explore the missions, people, and discoveries
            shaping our understanding of the universe.
          </p>

          <button
            className="hero-explore-button"
            onClick={() =>
              document
                .getElementById("mission-collection")
                ?.scrollIntoView({ behavior: "smooth" })
            }
          >
            Explore Missions <span>↓</span>
          </button>
        </div>

        <div className="hero-orbit-art">
          <div className="orbit orbit-one"></div>
          <div className="orbit orbit-two"></div>
          <div className="orbit orbit-three"></div>
          <div className="orbit-planet"></div>
          <div className="orbit-moon"></div>
          <span className="orbit-star star-one">✦</span>
          <span className="orbit-star star-two">✧</span>
          <span className="orbit-star star-three">✦</span>
        </div>
      </section>

      <section className="mission-stats">
        <div className="stat-item">
          <span className="stat-number">{missions.length}</span>
          <span className="stat-label">Total Missions</span>
        </div>
        <div className="stat-item">
          <span className="stat-number">{ongoingCount}</span>
          <span className="stat-label">Ongoing</span>
        </div>
        <div className="stat-item">
          <span className="stat-number">{upcomingCount}</span>
          <span className="stat-label">Upcoming</span>
        </div>
        <div className="stat-item">
          <span className="stat-number">{completedCount}</span>
          <span className="stat-label">Completed</span>
        </div>
      </section>

      {featuredMission && (
        <section className="featured-section">
          <div className="section-heading">
            <div>
              <p className="section-kicker">MISSION SPOTLIGHT</p>
              <h2>Featured <span>Mission</span></h2>
            </div>
            <span className="featured-tag">✦ EDITOR'S PICK</span>
          </div>

          <article className="featured-mission">
            <div className="featured-image">
              {featuredMission.image ? (
                <img
                  src={featuredMission.image}
                  alt={featuredMission.missionName}
                />
              ) : (
                <div className="featured-image-placeholder">
                  Image coming soon
                </div>
              )}
              <div className="featured-image-overlay"></div>
            </div>

            <div className="featured-content">
              <span className="featured-small-label">
                A JOURNEY INTO THE UNKNOWN
              </span>

              <span className={`mission-status ${getStatusClass(featuredMission.status)}`}>
                <span className="status-dot"></span>
                {featuredMission.status || "Completed"}
              </span>

              <h3>{featuredMission.missionName}</h3>
              <p className="featured-agency">{featuredMission.spaceAgency}</p>

              <p className="featured-description">
                {featuredMission.description?.length > 190
                  ? `${featuredMission.description.substring(0, 190)}...`
                  : featuredMission.description}
              </p>

              <button
                className="featured-button"
                onClick={() => openMission(featuredMission._id)}
              >
                Explore Mission <span>→</span>
              </button>
            </div>
          </article>
        </section>
      )}

      <section className="mission-collection" id="mission-collection">
        <div className="collection-heading">
          <div>
            <p className="section-kicker">EXPLORE THE ARCHIVE</p>
            <h2>Mission <span>Collection</span></h2>
            <p className="collection-subtitle">
              Every mission tells a story of discovery.
            </p>
          </div>

          <span className="collection-count">
            {filteredMissions.length} missions found
          </span>
        </div>

        <div className="mission-tools">
          <div className="mission-search">
            <span>⌕</span>
            <input
              type="text"
              placeholder="Search missions, agencies, destinations..."
              value={search}
              onChange={(event) => setSearch(event.target.value)}
            />
            {search && (
              <button onClick={() => setSearch("")} aria-label="Clear search">
                ×
              </button>
            )}
          </div>

          <div className="mission-filters">
            {["All", "Ongoing", "Upcoming", "Completed"].map((filter) => (
              <button
                key={filter}
                className={activeFilter === filter ? "filter-button active" : "filter-button"}
                onClick={() => setActiveFilter(filter)}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>

        {filteredMissions.length === 0 ? (
          <div className="missions-message">
            <h2>No missions found</h2>
            <p>Try another search or filter.</p>
          </div>
        ) : (
          <section className="missions-grid">
            {filteredMissions.map((mission) => (
              <article
                className="mission-card"
                key={mission._id}
                onClick={() => openMission(mission._id)}
              >
                <div className="mission-card-image">
                  {mission.image ? (
                    <img src={mission.image} alt={mission.missionName} />
                  ) : (
                    <div className="image-placeholder">Image coming soon</div>
                  )}

                  <span className={`mission-status ${getStatusClass(mission.status)}`}>
                    <span className="status-dot"></span>
                    {mission.status || "Completed"}
                  </span>
                </div>

                <div className="mission-content">
                  <p className="mission-agency">{mission.spaceAgency}</p>
                  <h2>{mission.missionName}</h2>

                  <p className="mission-date">
                    <span>▦</span>
                    {new Date(mission.launchDate).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </p>

                  <p className="mission-description">
                    {mission.description?.length > 100
                      ? `${mission.description.substring(0, 100)}...`
                      : mission.description}
                  </p>

                  <button
                    className="mission-button"
                    onClick={(event) => {
                      event.stopPropagation();
                      openMission(mission._id);
                    }}
                  >
                    View Details <span>→</span>
                  </button>
                </div>
              </article>
            ))}
          </section>
        )}
      </section>

      <footer className="missions-footer">
        <span></span>
        <p>
          <span className="footer-symbol">◉</span>
          Dream <b>•</b> Explore <b>•</b> Discover
        </p>
        <span></span>
      </footer>
    </main>
  );
}

export default SpaceMissionsPage;
