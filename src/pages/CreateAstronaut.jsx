
import {
    House,
    Orbit,
    Rocket,
    UserRound,
    LogOut
} from 'lucide-react'

import { useState } from "react"
import { useNavigate, Link } from "react-router"
import { createAstronaut } from "../services/astronautServices"

import '../css/Dashboard.css'

function CreateAstronaut({ handleLogout }) {

    const [formData, setFormData] = useState({
        astronautName: '',
        spaceAgency: '',
        description: '',
        debutYear: '',
    })

    const navigate = useNavigate()
    const [image, setImage] = useState(null)

    function handleChange(event) {
        setFormData({
            ...formData,
            [event.target.name]: event.target.value
        })
    }

    async function handleSubmit(event) {
        event.preventDefault()

        try {
            const astronautData = new FormData()

            Object.entries(formData).forEach(([key, value]) => {
                astronautData.append(key, value)
            })

            if (image) {
                astronautData.append("image", image)
            }

            await createAstronaut(astronautData)

            navigate('/astronauts')

        } catch (error) {
            console.log(error)
        }
    }

    return (
        <>
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

                    <Link to="/planets">
                        <Orbit size={20} />
                        Planets
                    </Link>

                    <Link to="/missions">
                        <Rocket size={20} />
                        Space Missions
                    </Link>

                    <Link to="/astronauts" className="active">
                        <UserRound size={20} />
                        Astronauts
                    </Link>
                </nav>

                <button
                    className="logout-button"
                    onClick={handleLogout}
                >
                    <LogOut size={20} />
                    Logout
                </button>

            </aside>

            <div className="cp-page">

                <h1 className="cp-title">Create Astronaut</h1>

                <form className="cp-form" onSubmit={handleSubmit}>

                    <div className="cp-upload-section">
                        <label htmlFor="image">Astronaut Image:</label>
                        <input
                            type="file"
                            id="image"
                            name="image"
                            className="cp-image-input"
                            accept="image/*"
                            onChange={(event) => setImage(event.target.files[0])}
                        />
                    </div>

                    <div className="cp-fields">

                        <label htmlFor="astronautName">Astronaut Name:</label>
                        <input
                            type="text"
                            name="astronautName"
                            value={formData.astronautName}
                            onChange={handleChange}
                            id="astronautName"
                            className="cp-input"
                            required
                            placeholder="Enter astronaut name"
                        />

                        <label htmlFor="spaceAgency">Space Agency:</label>
                        <input
                            type="text"
                            name="spaceAgency"
                            value={formData.spaceAgency}
                            onChange={handleChange}
                            id="spaceAgency"
                            className="cp-input"
                            required
                            placeholder="e.g., NASA"
                        />

                        <label htmlFor="description">Description:</label>
                        <textarea
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            id="description"
                            className="cp-textarea"
                            required
                            placeholder="Write a short description about the astronaut..."
                        />

                        <label htmlFor="debutYear">Debut Year:</label>
                        <input
                            type="number"
                            name="debutYear"
                            value={formData.debutYear}
                            onChange={handleChange}
                            id="debutYear"
                            className="cp-input"
                            required
                            placeholder="e.g., 2019"
                        />

                    </div>

                    <div className="cp-buttons">
                        <button
                            type="submit"
                            className="cp-create"
                        >
                            + Create Astronaut
                        </button>
                    </div>

                </form>
            </div>
        </>
    )
}

export default CreateAstronaut
