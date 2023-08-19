import React, { useState, useEffect } from 'react';
import { usePlanetContext } from '../ContextApi/PlanetContext';
import { fetchPlanets } from '../api';

function NameFilter() {
  const { setFilteredPlanets } = usePlanetContext();
  const [filterText, setFilterText] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchPlanets();
      const filteredPlanets = data.filter(
        (planet) => planet.name.toLowerCase().includes(filterText.toLowerCase()),
      );
      setFilteredPlanets(filteredPlanets);
    };

    fetchData();
  }, [filterText, setFilteredPlanets]);

  return (
    <input
      type="text"
      placeholder="Filtrar por nome"
      value={ filterText }
      onChange={ (e) => setFilterText(e.target.value) }
      data-testid="name-filter"
    />
  );
}

export default NameFilter;
