import React from 'react';
import './App.css';
import Table from './components/Table';
import NameFilter from './components/NameFilter';
import { PlanetProvider } from './ContextApi/PlanetContext';
import FilterInterface from './components/FilterInterface';

function App() {
  return (
    <PlanetProvider>
      <NameFilter />
      <FilterInterface />
      <Table />
    </PlanetProvider>
  );
}

export default App;
