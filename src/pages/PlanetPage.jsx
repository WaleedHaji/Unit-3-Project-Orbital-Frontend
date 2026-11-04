import { useState, useEffect } from "react"
import { Link } from "react-router"
import { getAllPlanets } from "../services/planetServices"


function PlanetPage() {
  const [ planets, setPlanets ] = useState([])

    async function loadPlanets(){
      const response = await getAllPlanets()
      setHoots(response)
  }

  useEffect(()=>{
    loadPlanets()
  },[])

  return (
    <div>
      <h1>All Planets</h1>
      {planets.map((onePlanet)=>
      <div key={onePlanet._id}>
        <h2>{onePlanet.planetName}</h2>
        <Link to={`/planets/${onePlanet._id}`}>See Planet Details</Link>
      </div>
      )}

    </div>
  )
}

export default PlanetPage