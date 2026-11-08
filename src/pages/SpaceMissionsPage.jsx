
import { useEffect, useState } from "react";
import { getAllMissions } from "../services/spaceMissionServices";
import { useNavigate } from "react-router";

function SpaceMissionsPage() {
  const [missions, setMissions] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchMissions() {
      try {
        const data = await getAllMissions();
        setMissions(data);
      } catch (error) {
        console.log(error);
      }
    }

    fetchMissions();
  }, []);

  return (
    <div>
      <h1>Space Missions</h1>

      {missions.map((mission) => (
        <div
          key={mission._id}
          onClick={() => navigate(`/missions/${mission._id}`)}
          style={{ cursor: "pointer" }}
        >
          <h2>{mission.missionName}</h2>
          <p>{mission.spaceAgency}</p>
          <p>{mission.description}</p>
          <p>Destination: {mission.destination}</p>
          <p>Status: {mission.status}</p>
          <p>View Details →</p>
        </div>
      ))}
    </div>
  );
}

export default SpaceMissionsPage;
