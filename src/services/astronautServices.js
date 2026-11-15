
import api from "./api";

export async function getAllAstronauts() {
  const response = await api.get("/astronauts");
  return response.data;
}

export async function getAstronautById(astronautId) {
  const response = await api.get(`/astronauts/${astronautId}`);
  return response.data;
}

export async function updateAstronaut(astronautId, astronautData) {
  const response = await api.put(`/astronauts/${astronautId}`, astronautData);
  return response.data;
}

export async function deleteAstronaut(astronautId) {
  const response = await api.delete(`/astronauts/${astronautId}`);
  return response.data;
}
