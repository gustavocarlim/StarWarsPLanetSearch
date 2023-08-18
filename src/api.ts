export interface Planet {
  name: string,
  rotation_period: string,
  orbital_period: string,
  diameter: string,
  climate: string,
  gravity: string,
  terrain: string,
  surface_water: string,
  population: string,
  residents: string[];
}

export async function fetchPlanets(): Promise<Planet[]> {
  try {
    const response = await fetch('https://swapi.dev/api/planets');
    const data = await response.json();
    return data.results;
  } catch (error) {
    console.error('Erro ao buscar dados da API:', error);
    return [];
  }
}
