const API_URL = "https://rickandmortyapi.com/api";

interface ApiInfo {
  next: string | null;
  prev: string | null;
  pages: number;
  count: number;
}

interface CharactersResponse {
  info: ApiInfo;
  results: any[];
}

interface LocationsResponse {
  info: ApiInfo;
  results: any[];
}

export async function getCharacters(): Promise<any[]> {
  const allCharacters: any[] = [];

  let nextUrl: string | null = `${API_URL}/character`;

  while (nextUrl !== null) {
    const url: string = nextUrl;

    const response: Response = await fetch(url);

    if (!response.ok) {
      throw new Error("Error al obtener los personajes");
    }

    const data: CharactersResponse =
      await response.json();

    allCharacters.push(...data.results);

    nextUrl = data.info.next;
  }

  return allCharacters;
}

export async function getLocations(): Promise<any[]> {
  const allLocations: any[] = [];

  let nextUrl: string | null = `${API_URL}/location`;

  while (nextUrl !== null) {
    const url: string = nextUrl;

    const response: Response = await fetch(url);

    if (!response.ok) {
      throw new Error("Error al obtener las ubicaciones");
    }

    const data: LocationsResponse =
      await response.json();

    allLocations.push(...data.results);

    nextUrl = data.info.next;
  }

  return allLocations;
}