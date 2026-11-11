
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import {
  getMissionById,
  updateMission,
  deleteMission,
} from "../services/spaceMissionServices";
import "./MissionDetails.css";

function MissionDetails() {
  const { missionId } = useParams();
  const navigate = useNavigate();

  const [mission, setMission] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({});
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchMission() {
      try {
        const data = await getMissionById(missionId);
        setMission(data);
        setFormData(data);
      } catch (error) {
        console.log(error);
        setError("Unable to load this mission.");
      }
    }

    fetchMission();
  }, [missionId]);

  function handleChange(event) {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  }

  async function handleUpdate(event) {
    event.preventDefault();

    try {
      const updatedMission = await updateMission(missionId, formData);
      setMission(updatedMission);
      setFormData(updatedMission);
      setIsEditing(false);
    } catch (error) {
      console.log(error);
      alert("Unable to update mission.");
    }
  }

  async function handleDelete() {
    const confirmed = window.confirm(
      "Are you sure you want to delete this mission?"
    );

    if (!confirmed) return;

    try {
      await deleteMission(missionId);
      navigate("/missions");
    } catch (error) {
      console.log(error);
      alert("Unable to delete mission.");
    }
  }

  if (error) {
    return <div className="details-message">{error}</div>;
  }

  if (!mission) {
    return (
      <div className="details-message">
        <div className="loading-orbit"></div>
        <h2>Loading mission...</h2>
      </div>
    );
  }

  return (
    <main className="mission-details-page">
      <button
        className="back-button"
        onClick={() => navigate("/missions")}
      >
        ← Back to Missions
      </button>

      {isEditing ? (
        <section className="mission-edit-container">
          <p className="details-label">MISSION MANAGEMENT</p>
          <h1>Edit Mission</h1>

          <form className="mission-edit-form" onSubmit={handleUpdate}>
            <label>Mission Name</label>
            <input
              name="missionName"
              value={formData.missionName || ""}
              onChange={handleChange}
              required
            />

            <label>Space Agency</label>
            <input
              name="spaceAgency"
              value={formData.spaceAgency || ""}
              onChange={handleChange}
              required
            />

            <label>Description</label>
            <textarea
              name="description"
              value={formData.description || ""}
              onChange={handleChange}
              required
              rows="7"
            />

            <label>Launch Date</label>
            <input
              type="date"
              name="launchDate"
              value={formData.launchDate?.slice(0, 10) || ""}
              onChange={handleChange}
              required
            />

            <label>Status</label>
            <select
              name="status"
              value={formData.status || ""}
              onChange={handleChange}
              required
            >
              <option value="Completed">Completed</option>
              <option value="Ongoing">Ongoing</option>
              <option value="Upcoming">Upcoming</option>
            </select>

            <label>Destination</label>
            <input
              name="destination"
              value={formData.destination || ""}
              onChange={handleChange}
              required
            />

            <label>Image URL</label>
            <input
              name="image"
              value={formData.image || ""}
              onChange={handleChange}
            />

            <div className="edit-actions">
              <button type="submit" className="save-button">
                Save Changes
              </button>

              <button
                type="button"
                className="cancel-button"
                onClick={() => {
                  setFormData(mission);
                  setIsEditing(false);
                }}
              >
                Cancel
              </button>
            </div>
          </form>
        </section>
      ) : (
        <>
          <section className="details-hero">
            <div className="details-hero-image">
              {mission.image && (
                <img
                  src={mission.image}
                  alt={mission.missionName}
                />
              )}
            </div>

            <div className="details-hero-content">
              <p className="details-label">EXPLORE THE MISSION</p>

              <span
                className={`mission-status ${
                  mission.status?.toLowerCase() === "ongoing"
                    ? "status-ongoing"
                    : mission.status?.toLowerCase() === "upcoming"
                    ? "status-upcoming"
                    : "status-completed"
                }`}
              >
                <span className="status-dot"></span>
                {mission.status}
              </span>

              <h1>{mission.missionName}</h1>

              <p className="details-agency">
                {mission.spaceAgency}
              </p>

              <p className="details-destination">
                Destination: {mission.destination}
              </p>
            </div>
          </section>

          <section className="mission-info-grid">
            <div className="mission-info-card">
              <span className="info-icon">▦</span>
              <div>
                <p>Launch Date</p>
                <h3>
                  {new Date(mission.launchDate).toLocaleDateString(
                    "en-US",
                    {
                      month: "long",
                      day: "numeric",
                      year: "numeric",
                    }
                  )}
                </h3>
              </div>
            </div>

            <div className="mission-info-card">
              <span className="info-icon">◈</span>
              <div>
                <p>Space Agency</p>
                <h3>{mission.spaceAgency}</h3>
              </div>
            </div>

            <div className="mission-info-card">
              <span className="info-icon">◎</span>
              <div>
                <p>Destination</p>
                <h3>{mission.destination}</h3>
              </div>
            </div>
          </section>

          <section className="mission-description-section">
            <p className="details-label">THE STORY</p>
            <h2>About This Mission</h2>
            <p className="full-description">
              {mission.description}
            </p>
          </section>

          <section className="mission-crew-section">
            <p className="details-label">THE PEOPLE BEHIND THE MISSION</p>
            <h2>Mission Crew</h2>

            {mission.astronauts?.length > 0 ? (
              <div className="crew-list">
                {mission.astronauts.map((astronaut) => (
                  <div className="crew-member" key={astronaut._id}>
                    <span className="crew-icon">✦</span>
                    <div>
                      <h3>{astronaut.astronautName}</h3>
                      <p>{astronaut.spaceAgency}</p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="uncrewed-message">
                This was an uncrewed mission. No astronauts were aboard.
              </p>
            )}
          </section>

          <section className="mission-management">
            <button
              className="edit-mission-button"
              onClick={() => setIsEditing(true)}
            >
              Edit Mission
            </button>

            <button
              className="delete-mission-button"
              onClick={handleDelete}
            >
              Delete Mission
            </button>
          </section>
        </>
      )}
    </main>
  );
}

export default MissionDetails;
