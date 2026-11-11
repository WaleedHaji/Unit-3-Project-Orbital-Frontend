
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import { getAstronautById } from "../services/astronautServices";

function AstronautDetails() {
  const { astronautId } = useParams();
  const navigate = useNavigate();

  const [astronaut, setAstronaut] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchAstronaut() {
      try {
        const data = await getAstronautById(astronautId);
        setAstronaut(data);
      } catch (error) {
        setError("Unable to load astronaut details.");
        console.log(error);
      } finally {
        setLoading(false);
      }
    }

    fetchAstronaut();
  }, [astronautId]);

  if (loading) return <h2>Loading astronaut...</h2>;
  if (error) return <h2>{error}</h2>;
  if (!astronaut) return <h2>Astronaut not found.</h2>;

  return (
    <div style={{ padding: "30px" }}>
      <h1>{astronaut.astronautName}</h1>

      <p>Agency: {astronaut.spaceAgency}</p>
      <p>Debut Year: {astronaut.debutYear}</p>
      <p>{astronaut.description}</p>

      <h2>Space Missions</h2>

      {astronaut.missions?.length > 0 ? (
        astronaut.missions.map((mission) => (
          <div
            key={mission._id}
            onClick={() => navigate(`/missions/${mission._id}`)}
            style={{
              cursor: "pointer",
              border: "1px solid #444",
              borderRadius: "10px",
              padding: "15px",
              marginBottom: "15px",
            }}
          >
            <h3>{mission.missionName}</h3>
            {mission.image && (
              <img
                src={mission.image}
                alt={mission.missionName}
                style={{ width: "200px", borderRadius: "8px" }}
              />
            )}
            <p>
              Launch Date:{" "}
              {new Date(mission.launchDate).toLocaleDateString()}
            </p>
            <p>View Mission →</p>
          </div>
        ))
      ) : (
        <p>No missions listed for this astronaut yet.</p>
      )}
    </div>
  );
}

export default AstronautDetails;
