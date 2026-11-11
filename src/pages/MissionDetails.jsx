
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import {
  getMissionById,
  updateMission,
  deleteMission,
} from "../services/spaceMissionServices";

function MissionDetails() {
  const { missionId } = useParams();
  const navigate = useNavigate();

  const [mission, setMission] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({});

  useEffect(() => {
    async function fetchMission() {
      try {
        const data = await getMissionById(missionId);
        setMission(data);
        setFormData(data);
      } catch (error) {
        console.log(error);
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

  if (!mission) {
    return <h2>Loading mission...</h2>;
  }

  return (
    <div style={{ padding: "30px" }}>
      <button onClick={() => navigate("/missions")}>
        Back to Missions
      </button>

      {isEditing ? (
        <form onSubmit={handleUpdate}>
          <h1>Edit Mission</h1>

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
          <input
            name="status"
            value={formData.status || ""}
            onChange={handleChange}
            required
          />

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

          <button type="submit">Save Changes</button>
          <button type="button" onClick={() => setIsEditing(false)}>
            Cancel
          </button>
        </form>
      ) : (
        <>
          <h1>{mission.missionName}</h1>

          {mission.image && (
            <img
              src={mission.image}
              alt={mission.missionName}
              width="400"
            />
          )}

          <p><strong>Space Agency:</strong> {mission.spaceAgency}</p>
          <p><strong>Description:</strong> {mission.description}</p>
          <p>
            <strong>Launch Date:</strong>{" "}
            {new Date(mission.launchDate).toLocaleDateString()}
          </p>
          <p><strong>Status:</strong> {mission.status}</p>
          <p><strong>Destination:</strong> {mission.destination}</p>

          <button onClick={() => setIsEditing(true)}>
            Edit Mission
          </button>

          <button onClick={handleDelete}>
            Delete Mission
          </button>
        </>
      )}
    </div>
  );
}

export default MissionDetails;
