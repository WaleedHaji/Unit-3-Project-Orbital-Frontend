
import { useState, useEffect } from "react"
import { Link, useParams, useNavigate } from "react-router"
import { getPlanetById, deletePlanetById, getAllPlanets } from "../services/planetServices"
import { Canvas } from "@react-three/fiber"
import { OrbitControls, useTexture } from "@react-three/drei"
import "./PlanetDetails.css"


function Planet({ planetName }) {
  const textureName = planetName.toLowerCase()

  const texture = useTexture(
    `/textures/${textureName}.jpg`
  )

  const isSaturn = textureName === "saturn"
  const isSun = textureName === "sun"

  return (
    <group>

      {/* PLANET SPHERE */}
      <mesh>
        <sphereGeometry args={[2, 64, 64]} />

        <meshStandardMaterial
          map={texture}
          emissive={isSun ? "white" : "black"}
          emissiveMap={isSun ? texture : null}
          emissiveIntensity={isSun ? 1.5 : 0}
        />
      </mesh>

      {/* SATURN'S RINGS */}
      {isSaturn && (
        <group rotation={[Math.PI / 2.5, 0, 0]}>

          {/* INNER RING */}
          <mesh>
            <ringGeometry args={[2.3, 2.8, 128]} />
            <meshStandardMaterial
              color="#9e8764"
              side={2}
              roughness={0.9}
            />
          </mesh>

          {/* MIDDLE RING */}
          <mesh>
            <ringGeometry args={[2.8, 3.5, 128]} />
            <meshStandardMaterial
              color="#d6c19b"
              side={2}
              roughness={0.8}
            />
          </mesh>

          {/* OUTER RING */}
          <mesh>
            <ringGeometry args={[3.5, 4, 128]} />
            <meshStandardMaterial
              color="#a18b69"
              side={2}
              roughness={1}
            />
          </mesh>

        </group>
      )}

    </group>
  )
}


function PlanetDetails({ user }) {
  const [planet, setPlanet] = useState(null)
  const [planets, setPlanets] = useState([])

  const navigate = useNavigate()
  const { planetId } = useParams()

  async function loadPlanet() {
    const response = await getPlanetById(planetId)
    setPlanet(response)
  }

  async function loadPlanets() {
    const response = await getAllPlanets()
    setPlanets(response)
  }

  async function deletePlanet() {
    await deletePlanetById(planetId)
    navigate("/planets")
  }

  useEffect(() => {
    loadPlanet()
  }, [planetId])

  useEffect(() => {
    loadPlanets()
  }, [])

  return (
    <div className="planet-page">

      {/* LEFT SIDEBAR */}
      <aside className="planet-sidebar">
        <h2>Explore Planets</h2>

        <ul>
          {planets.map((item) => (
            <li key={item._id}>
              <Link
                to={`/planets/${item._id}`}
                className={
                  item._id === planetId ? "active-planet" : ""
                }
              >
                {item.planetName}
              </Link>
            </li>
          ))}
        </ul>
      </aside>

      {/* MAIN CONTENT */}
      <main className="planet-content">

        {planet ? (
          <>
            <h1>{planet.planetName}</h1>

            {/* 3D PLANET MODEL */}
            <div className="planet-model">
              <Canvas camera={{ position: [0, 0, 6] }}>
                <ambientLight intensity={1} />
                <directionalLight position={[5, 5, 5]} />

                <Planet planetName={planet.planetName} />

                <OrbitControls
                  enableZoom={true}
                  autoRotate
                  autoRotateSpeed={0.5}
                />
              </Canvas>
            </div>

            {/* PLANET INFORMATION */}
            <div className="planet-information">

              

              <p>
                <b>Description:</b> {planet.description}
              </p>

              <p>
                <b>Type:</b> {planet.type}
              </p>

              <p>
                <b>Diameter:</b> {planet.diameter} km
              </p>

              <p>
                <b>Distance from the Sun:</b>{" "}
                {planet.distanceFromTheSun} km
              </p>

              <p>
                <b>Number of Moons:</b> {planet.numberOfMoons}
              </p>

              {user?.role === "admin" && (
                <div className="admin-buttons">
                  <button
                    onClick={() =>
                      navigate(`/planets/${planetId}/edit`)
                    }
                  >
                    Edit Planet
                  </button>

                  <button onClick={deletePlanet}>
                    Delete Planet
                  </button>
                </div>
              )}

            </div>
          </>
        ) : (
          <p>Loading planet...</p>
        )}

      </main>
    </div>
  )
}

export default PlanetDetails
