
import { useEffect, useState } from "react";
import { getAllAstronauts } from "../services/astronautServices";
import { useNavigate } from "react-router";

function AstronautsPage() {
  const [astronauts, setAstronauts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

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

  if (loading) {
    return <h2>Loading astronauts...</h2>;
  }

  if (error) {
    return <h2>{error}</h2>;
  }

  return (
    <div style={{ padding: "30px" }}>
      <h1>Astronauts</h1>

      {astronauts.length === 0 ? (
        <p>No astronauts available yet. Check back soon!</p>
      ) : (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
            gap: "25px",
          }}
        >
          {astronauts.map((astronaut) => (
            <div
              key={astronaut._id}
              onClick={() => navigate(`/astronauts/${astronaut._id}`)}
              style={{
                cursor: "pointer",
                border: "1px solid #444",
                borderRadius: "12px",
                padding: "15px",
              }}
            >
              <h2>{astronaut.astronautName}</h2>
              <p>Agency: {astronaut.spaceAgency}</p>
              <p>Debut Year: {astronaut.debutYear}</p>
              <p>View Details →</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default AstronautsPage;
