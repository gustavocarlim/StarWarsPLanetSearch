import React, { useState, useEffect } from 'react';
import { usePlanetContext } from '../ContextApi/PlanetContext';
import { Planet } from '../api';

function FilterInterface() {
  const { setFilteredPlanets, planets } = usePlanetContext();
  const [selectedColumn, setSelectedColumn] = useState<string>('population');
  const [selectedComparison, setSelectedComparison] = useState<string>('greater');
  const [filterValue, setFilterValue] = useState<string>('0');
  const [appliedFilters, setAppliedFilters] = useState<Array<{
    column: string; comparison: string; value: string }>>([]);
  const [availableColumns,
    setAvailableColumns] = useState<string[]>(['population',
    'orbital_period', 'diameter', 'rotation_period', 'surface_water']);

  const handleFilter = () => {
    const comparisonMap: { [key: string]: (a: number, b: number) => boolean } = {
      greater: (a, b) => a > b,
      lesser: (a, b) => a < b,
      equal: (a, b) => a === b,
    };

    const newFilter = { column: selectedColumn,
      comparison: selectedComparison,
      value: filterValue };
    const newFilters = [...appliedFilters, newFilter];
    setAppliedFilters(newFilters);

    let filteredPlanets = planets;

    newFilters.forEach((filter) => {
      const { column, comparison, value } = filter;
      const comparisonFunction = comparisonMap[comparison];
      const numericValue = parseFloat(value);

      if (!Number.isNaN(numericValue)) {
        filteredPlanets = filteredPlanets.filter((planet: Planet) => {
          const planetValue = planet[column as keyof Planet];

          if (Array.isArray(planetValue)) {
            return planetValue.length > 0;
          }
          const planetNumericValue = parseFloat(planetValue);

          if (!Number.isNaN(planetNumericValue)) {
            return comparisonFunction(planetNumericValue, numericValue);
          }

          return false;
        });
      }
    });

    setFilteredPlanets(filteredPlanets);
    setFilterValue('0');
    setSelectedColumn('population');
  };

  useEffect(() => {
    const selectedColumns = appliedFilters.map((filter) => filter.column);
    const remainingColumns = availableColumns.filter(
      (column) => !selectedColumns.includes(column),
    );
    setAvailableColumns(remainingColumns);
  }, [appliedFilters]);

  return (
    <div>
      <select
        value={ selectedColumn }
        onChange={ (e) => setSelectedColumn(e.target.value) }
        data-testid="column-filter"
      >
        {availableColumns.map((column) => (
          <option key={ column } value={ column }>{ column }</option>
        ))}
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

      {appliedFilters.map((filter, index) => (
        <div key={ index } data-testid="applied-filter">
          {filter.column}
          {' '}
          {filter.comparison}
          {' '}
          {filter.value}
        </div>
      ))}

    </div>
  );
}

export default FilterInterface;
