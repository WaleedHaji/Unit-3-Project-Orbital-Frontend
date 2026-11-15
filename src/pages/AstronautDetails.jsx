
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import {
  getAstronautById,
  updateAstronaut,
  deleteAstronaut,
} from "../services/astronautServices";
import "./AstronautDetails.css";
import Starfield from "../components/Starfield";

function AstronautDetails({ user }) {
  const { astronautId } = useParams();
  const navigate = useNavigate();
  const isAdmin = user?.role === "admin";

  const [astronaut, setAstronaut] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({});
  const [imageFile, setImageFile] = useState(null);
  const [saving, setSaving] = useState(false);

  const backendUrl = import.meta.env.VITE_BACK_END_SERVER_URL;

  function getImageUrl(image) {
    if (!image) return "";
    if (image.startsWith("http")) return image;
    return `${backendUrl}${image}`;
  }

  useEffect(() => {
    async function fetchAstronaut() {
      try {
        const data = await getAstronautById(astronautId);
        setAstronaut(data);
        setFormData({
          astronautName: data.astronautName || "",
          spaceAgency: data.spaceAgency || "",
          debutYear: data.debutYear || "",
          description: data.description || "",
        });
      } catch (error) {
        setError("Unable to load astronaut details.");
        console.log(error);
      } finally {
        setLoading(false);
      }
    }

    fetchAstronaut();
  }, [astronautId]);

  function handleChange(event) {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  }

  function handleImageChange(event) {
    setImageFile(event.target.files[0] || null);
  }

  async function handleUpdate(event) {
    event.preventDefault();

    if (!isAdmin) return;

    setSaving(true);
    setError("");

    try {
      const astronautData = new FormData();

      astronautData.append("astronautName", formData.astronautName);
      astronautData.append("spaceAgency", formData.spaceAgency);
      astronautData.append("debutYear", formData.debutYear);
      astronautData.append("description", formData.description);

      if (imageFile) {
        astronautData.append("image", imageFile);
      }

      const updatedAstronaut = await updateAstronaut(
        astronautId,
        astronautData
      );

      const refreshedAstronaut = await getAstronautById(astronautId);
      setAstronaut(refreshedAstronaut);
      setFormData({
        astronautName: refreshedAstronaut.astronautName || "",
        spaceAgency: refreshedAstronaut.spaceAgency || "",
        debutYear: refreshedAstronaut.debutYear || "",
        description: refreshedAstronaut.description || "",
      });

      setImageFile(null);
      setIsEditing(false);
    } catch (error) {
      setError("Unable to update astronaut. Please try again.");
      console.log(error);
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete() {
    if (!isAdmin) return;

    const confirmed = window.confirm(
      "Are you sure you want to delete this astronaut?"
    );

    if (!confirmed) return;

    try {
      await deleteAstronaut(astronautId);
      navigate("/astronauts");
    } catch (error) {
      setError("Unable to delete astronaut. Please try again.");
      console.log(error);
    }
  }

  if (loading) return <h2>Loading astronaut...</h2>;
  if (error && !astronaut) return <h2>{error}</h2>;
  if (!astronaut) return <h2>Astronaut not found.</h2>;

  return (
    <main className="astronaut-details-page">
      <Starfield />

      <button
        className="astronaut-back-button"
        onClick={() => navigate("/astronauts")}
      >
        ← Back to Astronauts
      </button>

      <section className="astronaut-details-card">
        {!isEditing ? (
          <>
            {astronaut.image && (
              <img
                className="astronaut-profile-image"
                src={getImageUrl(astronaut.image)}
                alt={astronaut.astronautName}
              />
            )}

            <span className="astronaut-details-label">SPACE EXPLORER</span>

            <h1>{astronaut.astronautName}</h1>

            <p className="astronaut-details-agency">
              {astronaut.spaceAgency}
            </p>

            <p className="astronaut-details-year">
              Debut Year: {astronaut.debutYear || "Not available"}
            </p>

            <p className="astronaut-details-description">
              {astronaut.description}
            </p>

            {isAdmin && (
              <div className="astronaut-details-actions">
                <button
                  className="astronaut-edit-button"
                  onClick={() => setIsEditing(true)}
                >
                  Edit Astronaut
                </button>

                <button
                  className="astronaut-delete-button"
                  onClick={handleDelete}
                >
                  Delete Astronaut
                </button>
              </div>
            )}
          </>
        ) : (
          isAdmin && (
            <form className="astronaut-edit-form" onSubmit={handleUpdate}>
              <h1>Edit Astronaut</h1>

              <label>Astronaut Name</label>
              <input
                type="text"
                name="astronautName"
                value={formData.astronautName}
                onChange={handleChange}
                required
              />

              <label>Space Agency</label>
              <input
                type="text"
                name="spaceAgency"
                value={formData.spaceAgency}
                onChange={handleChange}
                required
              />

              <label>Debut Year</label>
              <input
                type="number"
                name="debutYear"
                value={formData.debutYear}
                onChange={handleChange}
                required
              />

              <label>Description</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows="5"
                required
              />

              <label>Upload Astronaut Image</label>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
              />

              {imageFile && <p>Selected image: {imageFile.name}</p>}

              {astronaut.image && (
                <img
                  className="astronaut-profile-image"
                  src={getImageUrl(astronaut.image)}
                  alt="Current astronaut"
                />
              )}

              <button type="submit" disabled={saving}>
                {saving ? "Saving..." : "Save Changes"}
              </button>

              <button
                type="button"
                className="astronaut-cancel-button"
                onClick={() => {
                  setIsEditing(false);
                  setImageFile(null);
                  setFormData({
                    astronautName: astronaut.astronautName || "",
                    spaceAgency: astronaut.spaceAgency || "",
                    debutYear: astronaut.debutYear || "",
                    description: astronaut.description || "",
                  });
                }}
              >
                Cancel
              </button>
            </form>
          )
        )}

        {error && <p className="astronaut-details-error">{error}</p>}
      </section>

      <section className="astronaut-missions-section">
        <h2>Space Missions</h2>

        {astronaut.missions?.length > 0 ? (
          <div className="astronaut-missions-grid">
            {astronaut.missions.map((mission) => (
              <article
                className="astronaut-mission-card"
                key={mission._id}
                onClick={() => navigate(`/missions/${mission._id}`)}
              >
                {mission.image && (
                  <img
                    src={getImageUrl(mission.image)}
                    alt={mission.missionName}
                  />
                )}

                <h3>{mission.missionName}</h3>

                <p>
                  Launch Date:{" "}
                  {new Date(mission.launchDate).toLocaleDateString()}
                </p>

                <p>View Mission →</p>
              </article>
            ))}
          </div>
        ) : (
          <p>No missions listed for this astronaut yet.</p>
        )}
      </section>
    </main>
  );
}

export default AstronautDetails;
