import { useState, useEffect } from "react"
import { Link } from "react-router"
import { getAllPlanets } from "../services/planetServices"


function PlanetPage() {
  const [ planets, setPlanets ] = useState([])

    async function loadPlanets(){
      const response = await getAllPlanets()
      setPlanets(response)
  }

  useEffect(()=>{
    loadPlanets()
  },[])

  return (
    <div className="planetPageDiv">
      <div className="planetPageTitle">
        <h1>All Planets</h1>
      </div>
      <div className="planetContainers">
        {planets.map((onePlanet)=>
        <div className="planetBoxesDiv" key={onePlanet._id}>  
          <h2>{onePlanet.planetName}</h2>
          <Link to={`/planets/${onePlanet._id}`}>See Planet Details</Link>
        </div>
        )}
      </div>
        

    </div>
  )
}

export default PlanetPage