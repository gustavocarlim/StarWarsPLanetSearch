import React, { useState } from 'react';
import { usePlanetContext } from '../ContextApi/PlanetContext';
import { Planet } from '../api';

function FilterInterface() {
  const { setFilteredPlanets, planets } = usePlanetContext();
  const [selectedColumn, setSelectedColumn] = useState<string>('population');
  const [selectedComparison, setSelectedComparison] = useState<string>('greater');
  const [filterValue, setFilterValue] = useState<string>('0');

  const handleFilter = () => {
    const comparisonMap: { [key: string]: (a: number, b: number) => boolean } = {
      greater: (a, b) => a > b,
      lesser: (a, b) => a < b,
      equal: (a, b) => a === b,
    };

    const selectedComparisonFunction = comparisonMap[selectedComparison];
    const selectedValue = parseFloat(filterValue);

    if (!Number.isNaN(selectedValue)) {
      const filteredPlanets = planets.filter((planet: Planet) => {
        const planetValue = planet[selectedColumn as keyof Planet];

        if (Array.isArray(planetValue)) {
          return planetValue.length > 0;
        }
        const numericValue = parseFloat(planetValue);

        if (!Number.isNaN(numericValue)) {
          return selectedComparisonFunction(numericValue, selectedValue);
        }

        return false;
      });

      setFilteredPlanets(filteredPlanets);
    }
  };

  return (
    <div>
      <select
        value={ selectedColumn }
        onChange={ (e) => setSelectedColumn(e.target.value) }
        data-testid="column-filter"
      >
        <option value="population">population</option>
        <option value="orbital_period">orbital_period</option>
        <option value="diameter">diameter</option>
        <option value="rotation_period">rotation_period</option>
        <option value="surface_water">surface_water</option>
      </select>

      <select
        value={ selectedComparison }
        onChange={ (e) => setSelectedComparison(e.target.value) }
        data-testid="comparison-filter"
      >
        <option value="maior que">maior que</option>
        <option value="lesser">menor que</option>
        <option value="equal">igual a</option>
      </select>

      <input
        type="number"
        value={ filterValue }
        onChange={ (e) => setFilterValue(e.target.value) }
        data-testid="value-filter"
      />

      <button onClick={ handleFilter } data-testid="button-filter">
        Filtrar
      </button>
    </div>
  );
}

export default FilterInterface;
