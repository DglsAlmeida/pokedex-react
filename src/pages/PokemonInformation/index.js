import React from 'react';
import { useParams } from 'react-router-dom';

const PokemonInformation = () => {
  const { pokemon_name } = useParams();
  return <h1>{pokemon_name}</h1>;
};

export default PokemonInformation;
