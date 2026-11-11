
import { useEffect, useState } from "react";
import { getAllMissions } from "../services/spaceMissionServices";
import { useNavigate } from "react-router";

function SpaceMissionsPage() {
  const [missions, setMissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

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

  if (loading) {
    return <h2>Loading missions...</h2>;
  }

  if (error) {
    return <h2>{error}</h2>;
  }

  return (
    <div style={{ padding: "30px" }}>
      <h1>Space Missions</h1>

      {missions.length === 0 ? (
        <p>No missions available yet. Check back soon!</p>
      ) : (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
            gap: "25px",
          }}
        >
          {missions.map((mission) => (
            <div
              key={mission._id}
              onClick={() => navigate(`/missions/${mission._id}`)}
              style={{
                cursor: "pointer",
                border: "1px solid #444",
                borderRadius: "12px",
                overflow: "hidden",
                paddingBottom: "15px",
              }}
            >
              {mission.image ? (
                <img
                  src={mission.image}
                  alt={mission.missionName}
                  style={{
                    width: "100%",
                    height: "180px",
                    objectFit: "cover",
                  }}
                />
              ) : (
                <div
                  style={{
                    height: "180px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundColor: "#222",
                    color: "white",
                  }}
                >
                  Image coming soon
                </div>
              )}

              <div style={{ padding: "15px" }}>
                <h2>{mission.missionName}</h2>
                <p>Agency: {mission.spaceAgency}</p>
                <p>
                  Launch Date:{" "}
                  {new Date(mission.launchDate).toLocaleDateString()}
                </p>
                <p>Astronaut: To be added</p>
                <p>View Details →</p>
              </div>
            </div>
          ))}
         </div>
        )}
    </div>
  );
}

export default SpaceMissionsPage;
