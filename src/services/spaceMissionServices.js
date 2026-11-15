
import api from "./api";

export async function getAllMissions() {
  const response = await api.get("/missions");
  return response.data;
}

export async function getMissionById(missionId) {
  const response = await api.get(`/missions/${missionId}`);
  return response.data;
}

export async function createMission(formData) {
  const response = await api.post("/missions", formData);
  return response.data;
}

export async function updateMission(missionId, formData) {
  const response = await api.put(`/missions/${missionId}`, formData);
  return response.data;
}

export async function deleteMission(missionId) {
  const response = await api.delete(`/missions/${missionId}`);
  return response.data;
}
