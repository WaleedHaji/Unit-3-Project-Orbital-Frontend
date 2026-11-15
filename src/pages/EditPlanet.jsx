
import {
    House,
    Orbit,
    Rocket,
    UserRound,
    LogOut
} from 'lucide-react'

import { Link } from "react-router"
import '../css/Dashboard.css'
import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router"
import axios from "axios"

function EditPlanet() {

    const [formData, setFormData] = useState({
        planetName: '',
        description: '',
        type: '',
        diameter: '',
        distanceFromTheSun: '',
        numberOfMoons: '',
        image: ''
    })

    const [image, setImage] = useState(null)

    const navigate = useNavigate()
    const planetId = useParams().id

    useEffect(() => {
        async function getPlanet() {
            try {
                const response = await axios.get(
                    `${import.meta.env.VITE_BACK_END_SERVER_URL}/planets/${planetId}`
                )

                setFormData(response.data)

            } catch (error) {
                console.log(error)
            }
        }

        getPlanet()

    }, [planetId])

    function handleChange(event) {
        setFormData({
            ...formData,
            [event.target.name]: event.target.value
        })
    }

    function handleImageChange(event) {
        setImage(event.target.files[0])
    }

    async function handleSubmit(event) {
        event.preventDefault()

        try {

            const data = new FormData()

            data.append('planetName', formData.planetName)
            data.append('description', formData.description)
            data.append('type', formData.type)
            data.append('diameter', Number(formData.diameter))
            data.append('distanceFromTheSun', Number(formData.distanceFromTheSun))
            data.append('numberOfMoons', Number(formData.numberOfMoons))

            // Only upload an image if a new one was selected
            if (image) {
                data.append('image', image)
            }

            await axios.put(
                `${import.meta.env.VITE_BACK_END_SERVER_URL}/planets/${planetId}`,
                data
            )

            navigate(`/planets/${planetId}`)

        } catch (error) {
            console.log(error)
        }
    }

    // Image preview
    const imagePreview = image
        ? URL.createObjectURL(image)
        : formData.image
            ? `${import.meta.env.VITE_BACK_END_SERVER_URL}/uploads/${formData.image}`
            : null

    return (
        <>
            {/* Sidebar */}
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

            {/* Main Content */}
            <div className="cp-page">

                <h1 className="cp-title">Edit Planet</h1>

                <form className="cp-form" onSubmit={handleSubmit}>

                    {/* Planet Image */}
                    <div className="cp-upload-section">

                        <label>Current Planet Image:</label>

                        {imagePreview ? (
                            <img
                                src={imagePreview}
                                alt={formData.planetName}
                                className="ep-image-preview"
                            />
                        ) : (
                            <p>No image uploaded yet.</p>
                        )}

                        <label htmlFor="image">
                            Choose New Planet Image:
                        </label>

                        <input
                            type="file"
                            id="image"
                            name="image"
                            className="cp-image-input"
                            accept="image/*"
                            onChange={handleImageChange}
                        />

                    </div>

                    {/* Planet Information */}
                    <div className="cp-fields">

                        <label htmlFor="planetName">Planet Name:</label>

                        <input
                            type="text"
                            name="planetName"
                            value={formData.planetName}
                            onChange={handleChange}
                            id="planetName"
                            className="cp-input"
                            required
                            maxLength="100"
                            placeholder="Enter planet name"
                        />

                        <label htmlFor="type">Type:</label>

                        <input
                            type="text"
                            name="type"
                            value={formData.type}
                            onChange={handleChange}
                            id="type"
                            className="cp-input"
                            required
                            placeholder="Enter planet type"
                        />

                        <label htmlFor="description">Description:</label>

                        <textarea
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            id="description"
                            className="cp-textarea"
                            required
                            placeholder="Write a short description about the planet..."
                        />

                    </div>

                    {/* Planet Measurements */}
                    <div className="cp-measurements">

                        <div className="cp-measurement-field">

                            <label htmlFor="diameter">Diameter (km):</label>

                            <input
                                type="number"
                                name="diameter"
                                value={formData.diameter}
                                onChange={handleChange}
                                id="diameter"
                                className="cp-input"
                                required
                            />

                        </div>

                        <div className="cp-measurement-field">

                            <label htmlFor="distanceFromTheSun">
                                Distance From The Sun (km):
                            </label>

                            <input
                                type="number"
                                name="distanceFromTheSun"
                                value={formData.distanceFromTheSun}
                                onChange={handleChange}
                                id="distanceFromTheSun"
                                className="cp-input"
                                required
                            />

                        </div>

                        <div className="cp-measurement-field">

                            <label htmlFor="numberOfMoons">
                                Number Of Moons:
                            </label>

                            <input
                                type="number"
                                name="numberOfMoons"
                                value={formData.numberOfMoons}
                                onChange={handleChange}
                                id="numberOfMoons"
                                className="cp-input"
                                required
                            />

                        </div>

                    </div>

                    {/* Buttons */}
                    <div className="cp-buttons">

                        <button type="submit" className="cp-create">
                            Update Planet
                        </button>

                    </div>

                </form>

            </div>
        </>
    )
}

export default EditPlanet
