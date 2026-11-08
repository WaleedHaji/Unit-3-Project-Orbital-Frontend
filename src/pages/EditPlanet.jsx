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
        numberOfMoons: ''
    })

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

    async function handleSubmit(event) {
        event.preventDefault()

        try {
            await axios.put(
                `${import.meta.env.VITE_BACK_END_SERVER_URL}/planets/${planetId}`,
                {
                    ...formData,
                    diameter: Number(formData.diameter),
                    distanceFromTheSun: Number(formData.distanceFromTheSun),
                    numberOfMoons: Number(formData.numberOfMoons)
                }
            )
            navigate(`/planets/${planetId}`)
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <>
            <h1>Edit Planet</h1>

            <form onSubmit={handleSubmit}>
                <label htmlFor="planetName">Planet Name:</label>
                <input type="text"
                 name="planetName" 
                 value={formData.planetName}
                 onChange={handleChange} 
                 id="planetName"
                  required />

                <label htmlFor="description">Description:</label>
                <input type="text"
                 name="description"
                  value={formData.description}
                    onChange={handleChange}
                     id="description"
                      required />

                <label htmlFor="type">Type:</label>
                <input type="text"
                 name="type"
                  value={formData.type}
                    onChange={handleChange}
                     id="type"
                      required />

                <label htmlFor="diameter">Diameter:</label>
                <input type="number"
                 name="diameter" 
                 value={formData.diameter}
                    onChange={handleChange} 
                    id="diameter" 
                    required />

                <label htmlFor="distanceFromTheSun">Distance From The Sun:</label>
                <input type="number"
                 name="distanceFromTheSun" 
                 value={formData.distanceFromTheSun}
                    onChange={handleChange}
                     id="distanceFromTheSun"
                      required />

                <label htmlFor="numberOfMoons">Number Of Moons:</label>
                <input type="number"
                 name="numberOfMoons"
                  value={formData.numberOfMoons}
                    onChange={handleChange}
                     id="numberOfMoons"
                      required />

                <button type="submit">Update Planet</button>
            </form>
        </>
    )
}

export default EditPlanet