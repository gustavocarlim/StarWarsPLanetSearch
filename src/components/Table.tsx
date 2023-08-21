import { useState } from 'react';
import { usePlanetContext } from '../ContextApi/PlanetContext';
import { Planet } from '../api';

function Table() {
  const { setFilteredPlanets, planets } = usePlanetContext();
  const [sortColumn, setSortColumn] = useState<string>('population');
  const [sortDirection, setSortDirection] = useState<string>('ASC');

  const sortOrder = sortDirection === 'ASC' ? 1 : -1;
  const handleSort = () => {
    const sortedPlanets = [...planets].sort((a: Planet, b: Planet) => {
      const valueA = a[sortColumn as keyof Planet];
      const valueB = b[sortColumn as keyof Planet];

      if (Array.isArray(valueA) || Array.isArray(valueB)) {
        return 0; // Não é possível ordenar arrays
      }

      if (valueA === 'unknown' && valueB !== 'unknown') return 1;
      if (valueB === 'unknown' && valueA !== 'unknown') return -1;

      if (valueA === 'unknown' && valueB === 'unknown') return 0;

      const numericValueA = parseFloat(valueA);
      const numericValueB = parseFloat(valueB);

      if (!Number.isNaN(numericValueA) && !Number.isNaN(numericValueB)) {
        return (numericValueA - numericValueB) * sortOrder;
      }

      return 0;
    });

    setFilteredPlanets(sortedPlanets);
  };
  return (
    <div>
      <label htmlFor="column-sort-input-asc">ASC</label>
      <input
        type="radio"
        name="sort-direction"
        id="column-sort-input-asc"
        data-testid="column-sort-input-asc"
        value="ASC"
        checked={ sortDirection === 'ASC' }
        onChange={ () => setSortDirection('ASC') }
      />
      <label htmlFor="column-sort-input-desc">DESC</label>
      <input
        type="radio"
        name="sort-direction"
        id="column-sort-input-desc"
        data-testid="column-sort-input-desc"
        value="DESC"
        checked={ sortDirection === 'DESC' }
        onChange={ () => setSortDirection('DESC') }
      />
      <select
        value={ sortColumn }
        onChange={ (e) => setSortColumn(e.target.value) }
        data-testid="column-sort"
      >
        <option value="population">population</option>
        <option value="orbital_period">orbital_period</option>
        <option value="diameter">diameter</option>
        <option value="rotation_period">rotation_period</option>
        <option value="surface_water">surface_water</option>
      </select>
      <button onClick={ handleSort } data-testid="column-sort-button">
        Ordenar
      </button>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Climate</th>
            <th>Terrain</th>
            <th>Diameter</th>
            <th>Gravity</th>
            <th>Orbital Period</th>
            <th>Surface Water</th>
            <th>Rotation Period</th>
            <th>Population</th>
            <th>Films</th>
            <th>Created</th>
            <th>Edited</th>
            <th>Url</th>
          </tr>
        </thead>
        <tbody>
          {planets.map((planet, index) => (
            <tr key={ index }>
              <td data-testid="planet-name">{planet.name}</td>
              <td>{planet.climate}</td>
              <td>{planet.terrain}</td>
              <td>{planet.diameter}</td>
              <td>{planet.gravity}</td>
              <td>{planet.orbital_period}</td>
              <td>{planet.surface_water}</td>
              <td>{planet.rotation_period}</td>
              <td>{planet.population}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Table;
