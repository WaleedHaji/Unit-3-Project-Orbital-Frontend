import api from "./api";

export async function getAllPlanets(){
    const response = await api.get('ROUTE')
    return response.data
}

export async function createNewPlanet(newPlanet){
    const response = await api.post('ROUTE', newPlanet)
    return response.data
}

export async function getPlanetById(planetId) {
    const response = await api.get(`/ROUTE/${planetId}`)
    return response.data
}

export async function updatePlanetById(planetId, updatedPlanet){
    const response = await api.put(`/ROUTE/${planetId}`, updatedPlanet)
    return response.data
}

export async function deletePlanetById(planetId){
    const response = await api.delete(`/ROUTE/${planetId}`)
    return response.data
}