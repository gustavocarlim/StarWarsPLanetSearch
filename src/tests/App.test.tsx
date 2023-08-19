import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { PlanetProvider } from '../ContextApi/PlanetContext'; // Certifique-se de importar o provedor correto
import FilterInterface from '../components/FilterInterface';
import Table from '../components/Table';

describe('FilterInterface component', () => {
  it('renders correctly', () => {
    render(
      <PlanetProvider>
        <FilterInterface />
      </PlanetProvider>
    );


    expect(screen.getByTestId('column-filter')).toBeInTheDocument();
    expect(screen.getByTestId('comparison-filter')).toBeInTheDocument();
    expect(screen.getByTestId('value-filter')).toBeInTheDocument();
    expect(screen.getByTestId('button-filter')).toBeInTheDocument();
  });

  it('filters planets correctly', () => {

  });
});

describe('Table component', () => {
  it('renders correctly', () => {
    // Mock dos dados de planetas
    const planetsDataMock = [

    ];

    render(
      <PlanetProvider>
        <Table />
      </PlanetProvider>
    );


    expect(screen.getByText('Name')).toBeInTheDocument();
    expect(screen.getByText('Climate')).toBeInTheDocument();
    expect(screen.getByText('Terrain')).toBeInTheDocument();

  });
});
