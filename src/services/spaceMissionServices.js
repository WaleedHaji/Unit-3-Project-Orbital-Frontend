import api from "./api";

export async function getAllMissions() {
    const response = await api.get('/missions')
    return response.data
}


export async function getMissionById(missionId) {
    const response = await api.get(`/missions/${missionId}`)
    return response.data
}