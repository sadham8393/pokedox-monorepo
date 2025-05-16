import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { PokemonCard } from './PokemonCard';

describe('PokemonCard', () => {
  it('renders the name, image, and types', () => {
    render(
      <PokemonCard
        name="pikachu"
        imageUrl="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png"
        types={['electric']}
        height={0.4}
        weight={6}
        baseExperience={112}
      />
    );
    expect(screen.getByText(/pikachu/i)).toBeInTheDocument();
    expect(screen.getByAltText(/pikachu/i)).toBeInTheDocument();
    expect(screen.getByText(/electric/i)).toBeInTheDocument();
  });

  it('renders multiple types', () => {
    render(
      <PokemonCard
        name="bulbasaur"
        imageUrl="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png"
        types={['grass', 'poison']}
        height={0.7}
        weight={6.9}
        baseExperience={64}
      />
    );
    expect(screen.getByText(/grass/i)).toBeInTheDocument();
    expect(screen.getByText(/poison/i)).toBeInTheDocument();
  });

  it('calls onClick when clicked', () => {
    const handleClick = jest.fn();
    render(
      <PokemonCard
        name="charmander"
        imageUrl="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/4.png"
        types={['fire']}
        height={0.6}
        weight={8.5}
        baseExperience={62}
        onClick={handleClick}
      />
    );
    fireEvent.click(screen.getByText(/charmander/i));
    expect(handleClick).toHaveBeenCalled();
  });

  it('renders height, weight, and base experience', () => {
    render(
      <PokemonCard
        name="squirtle"
        imageUrl="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/7.png"
        types={['water']}
        height={0.5}
        weight={9}
        baseExperience={63}
      />
    );
    expect(screen.getByText(/0.5/i)).toBeInTheDocument();
    expect(screen.getByText(/9/i)).toBeInTheDocument();
    expect(screen.getByText(/63/i)).toBeInTheDocument();
  });
});