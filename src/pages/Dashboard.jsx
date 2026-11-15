//icons import
import {
    House,
    Orbit,
    Rocket,
    UserRound,
    Users,
    LogOut,
    Plus,
    Bell,
    ChevronRight,
    Star,
    Clock,
    Zap
} from 'lucide-react'


import { useEffect, useState } from "react"
import { useNavigate, Link } from "react-router"
import axios from "axios"

import '../css/Dashboard.css'

import planet from '../pictues/planet.png'
import mission from '../pictues/mission.png'
import astronautImage from '../pictues/astu2.png'

function Dashboard({ user, handleLogout }) {

    const [planets, setPlanets] = useState([])
    const [recentActivity, setRecentActivity] = useState({
        planets: [],
        updatedPlanets: []
    })
    const [totalUsers, setTotalUsers] = useState(0)
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


    // get total registered users

    // get total registered users
    useEffect(() => {
        async function getTotalUsers() {
            try {
                // get the authenatication token from the browser,so when the user sign in it saves the token in the borwer localstorage
                const token = localStorage.getItem('token')
                const response = await axios.get(
                    `${import.meta.env.VITE_BACK_END_SERVER_URL}/admin/count`,
                    {
                        // send the token inside the request header
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    }
                )
                setTotalUsers(response.data.totalUsers)
            } catch (error) {
                console.log(error)
            }
        }

        getTotalUsers()
    }, [])


    return (
        <>
            {/* this is sidebar */}
            <div className="dashboard-container">

                {/* this is sidebar */}
                <aside className="sidebar">

                    <div className="sidebar-logo">
                        <Orbit size={38} />
                        <div>
                            <h2>Orbital</h2>
                            <p>Admin Panel</p>
                        </div>
                    </div>

                    <nav>
                        <Link to="/dashboard" className="active">
                            <House size={20} />Dashboard
                        </Link>

                        <Link to="/planets">
                            <Orbit size={20} />Planets</Link>

                        <Link to="/missions">
                       <Rocket size={20} />Space Missions
                          </Link>

                        <Link to="/astronauts">
                            <UserRound size={20} /> Astronauts</Link>
                    </nav>

                    <button className="logout-button" onClick={handleLogout}>
                        <LogOut size={20} />
                        Logout
                    </button>

                </aside>

                {/* main part */}
                <main className="dashboard-main">

                    <div className="header">
                        <h1>Dashboard</h1>
                        <p>Welcome back, {user.username}!</p>
                    </div>

                    {/* Statistics */}
                    <div className="statics">
                        <div className="statics-cards">

                            <div className="stat-card planet-card">
                                <Orbit size={38} />
                                <div>
                                    <p>{planets.length}</p>
                                    <h3>Total Planets</h3>
                                </div>
                            </div>

                            <div className="stat-card mission-card">
                                <Rocket size={38} />
                                <div>
                                    <p>24</p>
                                    <h3>Space Missions</h3>
                                </div>
                            </div>

                            <div className="stat-card astronaut-card">
                                <UserRound size={38} />
                                <div>
                                    <p>15</p>
                                    <h3>Astronauts</h3>
                                </div>
                            </div>

                            <div className="stat-card users-card">
                                <Users size={38} />
                                <div>
                                    <p>{totalUsers}</p>
                                    <h3>Registered Users</h3>
                                </div>
                            </div>

                        </div>
                    </div>

                    {/* Recent Activity and Quick Actions */}
                    <div className="dashboard-sections">

                        {/* recent activity section */}
                        <div className="recent-activity">

                            <h2>
                                <Clock size={19} />
                                Recent Activity
                            </h2>

                            <div className="activity-list">

                                {/* recentActivity.planets it contains the planets that were recently created */}
                                {recentActivity.planets.map((planet) => (
                                    <div className="activity-item" key={planet._id}>

                                        <div className="activity-icon">
                                            <Orbit size={18} />
                                        </div>

                                        <div className="activity-info">
                                            <h3>Planet added</h3>
                                            <p>{planet.planetName} has been added.</p>
                                        </div>

                                        {/* converts the date from MongoDB into a readable date and time */}
                                        <span className="activity-time">
                                            {new Date(planet.createdAt).toLocaleString()}
                                        </span>

                                    </div>
                                ))}

                                {recentActivity.updatedPlanets.map((planet) => (
                                    <div className="activity-item" key={planet._id}>

                                        <div className="activity-icon">
                                            <Orbit size={18} />
                                        </div>

                                        <div className="activity-info">
                                            <h3>Planet updated</h3>
                                            <p>{planet.planetName} information was updated.</p>
                                        </div>

                                        <span className="activity-time">
                                            {new Date(planet.updatedAt).toLocaleString()}
                                        </span>

                                    </div>
                                ))}

                            </div>
                        </div>

                        {/* Quick Actions */}
                        <div className="action">

                            <h2>
                                <Zap size={20} />
                                Quick Actions
                            </h2>

                            <div className="action-cards">

                                <button
                                    className="action-card add-planet"
                                    onClick={() => navigate('/planets/new')}
                                >
                                    <Plus size={22} />
                                    <img src={planet} alt="Planet" />
                                    <span>Add Planet</span>
                                </button>

                                <button
                                    className="action-card add-mission"
                                    onClick={() => navigate('/missions/new')}
                                >
                                    <Plus size={22} />
                                    <img src={mission} alt="Rocket" />
                                    <span>Add Mission</span>
                                </button>

                                <button
                                    className="action-card add-astronaut"
                                    onClick={() => navigate('/astronauts/new')}
                                >
                                    <Plus size={22} />
                                    <img src={astronautImage} alt="Astronaut" />
                                    <span>Add Astronaut</span>
                                </button>

                            </div>
                        </div>

                    </div>

                    {/* popular planet section */}
                    <div className='board-planets'>

                        <h2>Popular Planets</h2>

                        <Link to="/planets">View All Planets</Link>
                        {planets.slice(0, 4).map((planet) => (
                            <div key={planet._id}>
                                <h3>{planet.planetName}</h3>
                                <p>{planet.type}</p>

                                <button onClick={() => navigate(`/planets/${planet._id}`)}> View Details</button>
                            </div>
                        ))}
                    </div>


                </main>

            </div>

        </>
    )
}

export default Dashboard
