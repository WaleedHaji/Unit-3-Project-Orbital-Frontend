import api from "./api";

export async function getAllAstronauts() {
  const response = await api.get("/astronauts");
  return response.data;
}

export async function getAstronautById(astronautId) {
  const response = await api.get(`/astronauts/${astronautId}`);
  return response.data;
}