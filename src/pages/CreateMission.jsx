
import {
  House,
  Orbit,
  Rocket,
  UserRound,
  LogOut
} from "lucide-react";

import { useState } from "react";
import { useNavigate, Link } from "react-router";
import { createMission } from "../services/spaceMissionServices";

import "../css/Dashboard.css";

function CreateMission() {
  const [formData, setFormData] = useState({
    missionName: "",
    spaceAgency: "",
    description: "",
    launchDate: "",
    status: "Upcoming",
    destination: ""
  });

  const [image, setImage] = useState(null);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  function handleChange(event) {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value
    });
  }

  async function handleSubmit(event) {
    event.preventDefault();

    try {
      const missionData = new FormData();

      Object.entries(formData).forEach(([key, value]) => {
        missionData.append(key, value);
      });

      if (image) {
        missionData.append("image", image);
      }

      await createMission(missionData);

      navigate("/missions");
    } catch (error) {
      console.log(error);
      setError(
        error.response?.data?.message || "Unable to create mission."
      );
    }
  }

  return (
    <>
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

          <Link to="/missions" className="active">
            <Rocket size={20} />
            Space Missions
          </Link>

          <Link to="/astronauts">
            <UserRound size={20} />
            Astronauts
          </Link>
        </nav>

      <button className="logout-button">
    <LogOut size={20} />
    Logout
</button>
      </aside>

      <div className="cp-page">
        <h1 className="cp-title">Create Space Mission</h1>

        <form className="cp-form" onSubmit={handleSubmit}>
          <div className="cp-upload-section">
            <label htmlFor="image">Mission Image:</label>
            <input
              type="file"
              id="image"
              name="image"
              className="cp-image-input"
              accept="image/*"
              onChange={(event) => setImage(event.target.files[0])}
            />
          </div>

          <div className="cp-fields">
            <label htmlFor="missionName">Mission Name:</label>
            <input
              type="text"
              name="missionName"
              id="missionName"
              value={formData.missionName}
              onChange={handleChange}
              className="cp-input"
              required
              placeholder="Enter mission name"
            />

            <label htmlFor="spaceAgency">Space Agency:</label>
            <input
              type="text"
              name="spaceAgency"
              id="spaceAgency"
              value={formData.spaceAgency}
              onChange={handleChange}
              className="cp-input"
              required
              placeholder="e.g. NASA"
            />

            <label htmlFor="destination">Destination:</label>
            <input
              type="text"
              name="destination"
              id="destination"
              value={formData.destination}
              onChange={handleChange}
              className="cp-input"
              required
              placeholder="e.g. Mars"
            />

            <label htmlFor="description">Description:</label>
            <textarea
              name="description"
              id="description"
              value={formData.description}
              onChange={handleChange}
              className="cp-textarea"
              required
              placeholder="Write a description about the mission..."
            />
          </div>

          <div className="cp-measurements">
            <div className="cp-measurement-field">
              <label htmlFor="launchDate">Launch Date:</label>
              <input
                type="date"
                name="launchDate"
                id="launchDate"
                value={formData.launchDate}
                onChange={handleChange}
                className="cp-input"
                required
              />
            </div>

            <div className="cp-measurement-field">
              <label htmlFor="status">Mission Status:</label>
              <select
                name="status"
                id="status"
                value={formData.status}
                onChange={handleChange}
                className="cp-input"
                required
              >
                <option value="Upcoming">Upcoming</option>
                <option value="Ongoing">Ongoing</option>
                <option value="Completed">Completed</option>
              </select>
            </div>
          </div>

          {error && <p className="error-message">{error}</p>}

          <div className="cp-buttons">
            <button type="submit" className="cp-create">
              + Create Mission
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default CreateMission;
