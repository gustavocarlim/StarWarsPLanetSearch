import React from 'react';
import './App.css';
import Table from './components/Table';
import NameFilter from './components/NameFilter';
import { PlanetProvider } from './ContextApi/PlanetContext';

function App() {
  return (
    <PlanetProvider>
      <NameFilter />
      <Table />
    </PlanetProvider>
  );
}

export default App;
