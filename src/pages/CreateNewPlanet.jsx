import { useState } from "react"
import { useNavigate } from "react-router"
import axios from "axios"


function CreatePlanet() {

const [formData, setFormData] = useState({
    planetName: '',
    description: '',
    type: "",
    diameter:"",
    distanceFromTheSun:"",
    numberOfMoons:"",
})

const navigate = useNavigate()

function handleChange(event) {
     setFormData({...formData,[event.target.name]:event.target.value})
    
}

async function handleSubmit(event) {
    event.preventDefault()

    try {
        const response = await axios.post(
            `${import.meta.env.VITE_BACK_END_SERVER_URL}/planets`,
            {
                ...formData,
                diameter: Number(formData.diameter),
                distanceFromTheSun: Number(formData.distanceFromTheSun),
                numberOfMoons: Number(formData.numberOfMoons)
            }
        )

        navigate('/planets')

    } catch (error) {
        console.log(error)
    }
}

return (
    <>
     <h1>Create Planet</h1>
        <form onSubmit={handleSubmit}>
            <label htmlFor="planetName">planet Name: </label>
            <input
                type="text"
                name="planetName"
                value={formData.planetName}
                onChange={handleChange}
                id="planetName"
                required
                maxLength="100"
            />
            <label htmlFor="description">Description: </label>
            <input
                type="text"
                name="description"
                value={formData.description}
                onChange={handleChange}
                id="description"
                required
            />

            <label htmlFor="type">type: </label>
            <input
                type="text"
                name="type"
                value={formData.type}
                onChange={handleChange}
                id="type"
                required
            />

            <label htmlFor="diameter">Diameter: </label>
            <input
                type="number"
                name="diameter"
                value={formData.diameter}
                onChange={handleChange}
                id="diameter"
                required
            />

            <label htmlFor="distanceFromTheSun">Distance From The Sun: </label>
            <input
                type="number"
                name="distanceFromTheSun"
                value={formData.distanceFromTheSun}
                onChange={handleChange}
                id="distanceFromTheSun"
                required
            />

            <label htmlFor="numberOfMoons">Number Of Moons: </label>
            <input
                type="number"
                name="numberOfMoons"
                value={formData.numberOfMoons}
                onChange={handleChange}
                id="numberOfMoons"
                required
            />

            <button type="submit">Create Planet</button>

        </form>
    </>
)

}

export default CreatePlanet