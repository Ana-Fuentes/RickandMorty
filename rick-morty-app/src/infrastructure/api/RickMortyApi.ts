const API_URL = "https://rickandmortyapi.com/api";

export async function getCharacters() {
  const response = await fetch(`${API_URL}/character`);

  if (!response.ok) {
    throw new Error("Error al obtener los personajes");
  }

  const data = await response.json();

  return data.results;
}

export async function getLocations() {
  const response = await fetch(`${API_URL}/location`);

  if (!response.ok) {
    throw new Error("Error al obtener las ubicaciones");
  }

  const data = await response.json();

  return data.results;
}