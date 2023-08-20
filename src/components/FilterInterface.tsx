import React, { useState } from 'react';
import { usePlanetContext } from '../ContextApi/PlanetContext';
import { Planet } from '../api';

function FilterInterface() {
  const { setFilteredPlanets, planets } = usePlanetContext();
  const [selectedColumn, setSelectedColumn] = useState<string>('population');
  const [selectedComparison, setSelectedComparison] = useState<string>('maior que');
  const [filterValue, setFilterValue] = useState<string>('0');
  const [availableColumns, setAvailableColumns] = useState<string[]>([
    'population', 'orbital_period', 'diameter', 'rotation_period', 'surface_water',
  ]);

  const handleFilter = () => {
    const comparisonMap: { [key: string]: (a: number, b: number) => boolean } = {
      'maior que': (a, b) => a > b,
      'menor que': (a, b) => a < b,
      'igual a': (a, b) => a === b,
    };

    const selectedComparisonFunction = comparisonMap[selectedComparison];
    const selectedNumericValue = parseFloat(filterValue);

    if (!Number.isNaN(selectedNumericValue)) {
      const filteredPlanets = planets.filter((planet: Planet) => {
        const planetValue = planet[selectedColumn as keyof Planet];

        if (Array.isArray(planetValue)) {
          return planetValue.length > 0;
        }

        const numericValue = parseFloat(planetValue);
        return !Number.isNaN(
          numericValue,
        ) && selectedComparisonFunction(numericValue, selectedNumericValue);
      });

      setFilteredPlanets(filteredPlanets);

      setAvailableColumns((prevAvailableColumns) => prevAvailableColumns.filter(
        (col) => col !== selectedColumn,
      ));
    }
  };

  return (
    <div>
      <select
        value={ selectedColumn }
        onChange={ (e) => setSelectedColumn(e.target.value) }
        data-testid="column-filter"
      >
        {availableColumns.map((col) => (
          <option key={ col } value={ col }>{col}</option>
        ))}
      </select>

      <select
        value={ selectedComparison }
        onChange={ (e) => setSelectedComparison(e.target.value) }
        data-testid="comparison-filter"
      >
        <option value="maior que">Maior que</option>
        <option value="menor que">Menor que</option>
        <option value="igual a">Igual a</option>
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
