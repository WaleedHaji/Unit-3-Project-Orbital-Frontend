
import { useEffect, useState } from "react"
import { useNavigate, Link } from "react-router"
import axios from "axios"

import '../css/Dashboard.css'

function Dashboard({ user }) {

  const [planets, setPlanets] = useState([])
  const [recentActivity, setRecentActivity] = useState({
    planets: [],
    updatedPlanets: []
})
  const navigate = useNavigate()

  // get all planets
  useEffect(() => {
    async function getPlanets() {
      try {
        const response = await axios.get(`${import.meta.env.VITE_BACK_END_SERVER_URL}/planets`)
        setPlanets(response.data)
      } catch (error) {
        console.log(error)
      }
    }
    getPlanets()
  }, [])

  //recent activity
  useEffect(() => {
    async function getRecentActivity() {
      const response = await axios.get(`${import.meta.env.VITE_BACK_END_SERVER_URL}/planets/recent-activity`)
      setRecentActivity(response.data)
    }
    getRecentActivity()
  }, [])

  return (
    <>
      {/* this is sidebar */}
      <div className="dashboard-container">
        <aside  className="sidebar">
        <h2>Space Explorer</h2>
        <p>Admin Panel</p>
        <nav>
          <Link to="/admin">Dashboard</Link>
          <Link to="/planets">Planets</Link>
          <Link to="/space-missions">Space Missions</Link>
          <Link to="/astronauts">Astronauts</Link>
          <Link to="/users">Users</Link>
        </nav>

        <button>Logout</button>
      </aside>
      {/* main part */}
      <main className="dashboard-main">

        <div className="header">
          <h1>Dashboard</h1>
          <p>Welcome back, {user.username}!</p>
        </div>

        <div className="statics">
    <h2>Statistics</h2>

    <div className="statics-cards">
        <div className="stat-card">
            <h3>Total Planets</h3>
            <p>{planets.length}</p>
        </div>

        <div className="stat-card">
            <h3>Space Missions</h3>
            <p>24</p>
        </div>

        <div className="stat-card">
            <h3>Astronauts</h3>
            <p>15</p>
        </div>

        <div className="stat-card">
            <h3>Registered Users</h3>
            <p>120</p>
        </div>
    </div>
</div>
{/* recent activity section */}
        <div className="recent-activity">
          <h2>Recent Activity</h2>
{/* recentActivity.planets it contains the planets that were recently created */}
          {recentActivity.planets.map((planet) => (
            <div key={planet._id}>
              <p className="planet-added">Planet added: {planet.planetName}</p>
              {/* converts the date from MongoDB into a readable date and time */}
              <p>{new Date(planet.createdAt).toLocaleString()}</p>
            </div>
          ))}

          {recentActivity.updatedPlanets.map((planet) => (
            <div key={planet._id}>
              <p>Planet updated: {planet.planetName}</p>
              <p>{new Date(planet.updatedAt).toLocaleString()}</p>
            </div>
          ))}
        </div>

        <div className='action'>
          <h2>Quick Actions</h2>

          <button onClick={() => navigate('/planets/new')}>Add Planet</button>
          <button onClick={() => navigate('/space-missions/new')}>Add Mission</button>
          <button onClick={() => navigate('/astronauts/new')}> Add Astronaut</button>
        </div>

        <div className='board-planets'>
        <h2>Popular Planets</h2>
        <Link to="/planets">View All Planets</Link>


          {planets.slice(0, 4).map((planet) => (
            <div key={planet._id}>
              <h3>{planet.planetName}</h3>
              <p>{planet.type}</p>

              <button onClick={() => navigate(`/planets/${planet._id}`)}>View Details </button>
            </div>
          ))}

        </div>

      </main>

      </div>
      
    </>
  )
}

export default Dashboard
