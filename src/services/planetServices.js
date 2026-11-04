import api from "./api";

export async function getAllPlanets(){
    const response = await api.get('/planets')
    return response.data
}

export async function createNewPlanet(newPlanet){
    const response = await api.post('/planets', newPlanet)
    return response.data
}

export async function getPlanetById(planetId) {
    const response = await api.get(`/planets/${planetId}`)
    return response.data
}

export async function updatePlanetById(planetId, updatedPlanet){
    const response = await api.put(`/planets/${planetId}`, updatedPlanet)
    return response.data
}

export async function deletePlanetById(planetId){
    const response = await api.delete(`/planets/${planetId}`)
    return response.data
}