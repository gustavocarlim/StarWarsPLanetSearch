import { createContext, useContext, useState, ReactNode } from 'react';

interface Planet {
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

interface PlanetContextData {
  planets: Planet[];
  setFilteredPlanets: (filteredPlanets: Planet[]) => void;
}

const PlanetContext = createContext<PlanetContextData | undefined>(undefined);

export function usePlanetContext() {
  const context = useContext(PlanetContext);
  if (!context) {
    throw new Error('usePlanetContext must be used within a PlanetProvider');
  }
  return context;
}

interface PlanetProviderProps {
  children: ReactNode;
}

export function PlanetProvider({ children }: PlanetProviderProps) {
  const [filteredPlanets, setFilteredPlanets] = useState<Planet[]>([]);

  return (
    <PlanetContext.Provider value={ { planets: filteredPlanets, setFilteredPlanets } }>
      {children}
    </PlanetContext.Provider>
  );
}
