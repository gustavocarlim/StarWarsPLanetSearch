import React, { useState, useEffect } from 'react';
import { fetchPlanets, Planet } from '../api';

function Table() {
  const [planetsData, setPlanetsData] = useState<Planet[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchPlanets();
      setPlanetsData(data);
    };

    fetchData();
  }, []);

  return (
    <div>
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
          {planetsData.map((planet, index) => (
            <tr key={ index }>
              <td>{planet.name}</td>
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
