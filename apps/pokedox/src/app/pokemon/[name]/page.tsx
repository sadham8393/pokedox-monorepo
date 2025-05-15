'use client';
import * as React from 'react';
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { CircularProgress } from '@mui/material';
import { PokemonCard } from '@pokedox/components';
import { capitalize, formatHeight, formatWeight } from '@pokedox/utils';

export default function PokemonDetailPage() {
  const params = useParams();
  const name = Array.isArray(params?.name) ? params.name[0] : params?.name;
  interface Pokemon {
    name: string;
    sprites: {
      front_default: string;
    };
    height: number;
    weight: number;
    base_experience: number;
    types: { type: { name: string } }[];
  }

  const [pokemon, setPokemon] = useState<Pokemon | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!name) return;
    setLoading(true);
    fetch(`https://pokeapi.co/api/v2/pokemon/${name}`)
      .then((res) => {
        if (!res.ok) throw new Error('Failed to fetch Pokémon');
        return res.json();
      })
      .then(setPokemon)
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, [name]);

  if (loading) return <CircularProgress />;
  if (error) return <div style={{ color: 'red' }}>{error}</div>;
  if (!pokemon) return null;

  return (
    <div style={{ maxWidth: 400, margin: '2rem auto' }}>
      <PokemonCard
        name={capitalize(pokemon.name)}
        imageUrl={pokemon.sprites.front_default}
        types={pokemon.types.map((t) => t.type.name)}
        height={formatHeight(pokemon.height)}
        weight={formatWeight(pokemon.weight)}
        baseExperience={pokemon.base_experience}
      />
    </div>
  );
}
