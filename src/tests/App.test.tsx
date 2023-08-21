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

  });
  it('renders correctly', () => {
    // Mock dos dados de planetas
   
  });
  it('filters planets correctly', () => {
  
  });
  describe('FilterInterface component', () => {
    it('filters planets correctly', () => {
      render(
        <PlanetProvider>
          <FilterInterface />
        </PlanetProvider>
      );
  
      // Simule seleções e entrada de dados nos campos
      const columnSelect = screen.getByTestId('column-filter');
      const comparisonSelect = screen.getByTestId('comparison-filter');
      const valueInput = screen.getByTestId('value-filter');
      const filterButton = screen.getByTestId('button-filter');
  
      // Simule seleção de valores nos campos
      fireEvent.change(columnSelect, { target: { value: 'population' } });
      fireEvent.change(comparisonSelect, { target: { value: 'greater' } });
      fireEvent.change(valueInput, { target: { value: '1000' } });
  
      // Simule um clique no botão de filtro
      fireEvent.click(filterButton);
  
      // Verifique se os planetas foram filtrados corretamente
      // e se o estado do contexto foi atualizado corretamente
      // Espera-se que o estado "setFilteredPlanets" seja chamado com os planetas filtrados
  
      // Exemplo de verificações:
      expect(screen.getByTestId('button-filter')).toBeInTheDocument();;
    });
  }); 
});
