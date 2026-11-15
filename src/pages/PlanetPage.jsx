
import {
    House,
    Orbit,
    Rocket,
    UserRound,
    LogOut
} from 'lucide-react'
import { useState, useEffect } from "react"
import { Link } from "react-router"
import { getAllPlanets } from "../services/planetServices"
import "./PlanetPage.css"

function PlanetPage() {
  const [planets, setPlanets] = useState([])
  const [currentPage, setCurrentPage] = useState(1)

  const planetsPerPage = 9

  async function loadPlanets() {
    const response = await getAllPlanets()
    setPlanets(response)
  }

  useEffect(() => {
    loadPlanets()
  }, [])

  // PAGINATION
  const totalPages = Math.ceil(planets.length / planetsPerPage)

  const lastPlanetIndex = currentPage * planetsPerPage
  const firstPlanetIndex = lastPlanetIndex - planetsPerPage

  const currentPlanets = planets.slice(
    firstPlanetIndex,
    lastPlanetIndex
  )

  function changePage(pageNumber) {
    setCurrentPage(pageNumber)
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  return (

    <div className="planetPageDiv">
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

                    <Link to="/planets" className="active">
                        <Orbit size={20} />
                        Planets
                    </Link>

                    <Link to="/space-missions">
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
      

      {/* PAGE HEADING */}
      <div className="planetPageTitle">
        <h1>All <span>Planets</span></h1>
        
        <p className="planetPageKicker">EXPLORE THE UNIVERSE</p>  
      </div>

      {/* PLANET COLLECTION */}
      <div className="planetCollection">

        <div className="planetCollectionHeading">
          <h2>Planet Collection</h2>

          <span className="planetCount">
            {planets.length} Planets
          </span>
        </div>

        <div className="planetContainers">

          {currentPlanets.map((onePlanet) => (
            <Link
              to={`/planets/${onePlanet._id}`}
              className="planetBoxesDiv"
              key={onePlanet._id}
            >

              <div className="planetImageContainer">

                {onePlanet.image ? (
                  <img
                      src={`${import.meta.env.VITE_BACK_END_SERVER_URL}/uploads/${onePlanet.image}`}
                      alt={onePlanet.planetName}
                      className="planetCardImage"
                  />
                ) : (
                    <div className="planetCardIcon">
                    ✦
                    </div>
                )}

              </div>

              <h2>{onePlanet.planetName}</h2>

              <div className="planetCardDivider"></div>

            </Link>
          ))}

        </div>

        {/* PAGINATION */}
        {totalPages > 1 && (
          <div className="planetPagination">

            <button
              className="paginationButton"
              onClick={() => changePage(currentPage - 1)}
              disabled={currentPage === 1}
            >
              ← Previous
            </button>

            <div className="paginationNumbers">
              {Array.from(
                { length: totalPages },
                (_, index) => index + 1
              ).map((pageNumber) => (
                <button
                  key={pageNumber}
                  className={
                    currentPage === pageNumber
                      ? "pageNumber activePage"
                      : "pageNumber"
                  }
                  onClick={() => changePage(pageNumber)}
                >
                  {pageNumber}
                </button>
              ))}
            </div>

            <button
              className="paginationButton"
              onClick={() => changePage(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              Next →
            </button>

          </div>
        )}

        {/* PAGE INFORMATION */}
        <p className="paginationInfo">
          Showing {planets.length === 0 ? 0 : firstPlanetIndex + 1}
          {" - "}
          {Math.min(lastPlanetIndex, planets.length)}
          {" of "}
          {planets.length} planets
        </p>

      </div>

    </div>
  )
}

export default PlanetPage
