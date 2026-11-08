import { useState, useEffect } from "react"
import { Link, useParams, useNavigate } from "react-router"
import { getPlanetById, deletePlanetById } from "../services/planetServices"

function PlanetDetails({user}) {
  const [ planet, setPlanet ] = useState(null)

  const navigate = useNavigate()

  const { planetId } = useParams()
  console.log(planetId)

  async function loadPlanet(){
    const response = await getPlanetById(planetId)
    console.log(response)
    setPlanet(response)
  }

    async function deletePlanet(){
    const deletedPlanet = await deletePlanetById(planetId)
    navigate('/planets')
  }

  useEffect(()=>{
    loadPlanet()
  },[])

  return (
    <div>
      <h1>Planets Details</h1>

      {planet ? (
        <>
          <h2>Planet Name:{planet.planetName}</h2>
          <p><b>Description:</b>:{planet.description}</p>
          <p> <b>Type:</b> {planet.type} </p>
          <p> <b>Diameter:</b> {planet.diameter} </p>
          <p> <b>Distance from the Sun:</b> {planet.distanceFromTheSun} </p>
          <p> <b>Number of Moons:</b> {planet.numberOfMoons} </p>
         

          {user.role ==  'admin' ? (<><button onClick={() => navigate(`/planets/${planetId}`)}>Edit Planet</button>
          <button onClick={deletePlanet}>Delete Planet</button>
          </>) : <></>}
        </>)
      : null}
    </div>
  )
}

export default PlanetDetails