import { useState, useEffect } from "react"
import { Link, useParams, useNavigate } from "react-router"
import { getPlanetById, deletePlanetById } from "../services/planetServices"

function PlanetDetails({user}) {
  const [ planet, setPlanet ] = useState(null)

  const navigate = useNavigate()

  const { planetId } = useParams()

  async function loadPlanet(){
    const response = await getPlanetById(planetId)
    setPlanet(response.planet)
  }

    async function deletePlanet(){
    const deletedPlanet = await deleteHootById(planetId)
    navigate('/planets')
  }

  useEffect(()=>{
    loadPlanet()
  },[])

  return (
    <div>PlanetDetails</div>
  )
}

export default PlanetDetails