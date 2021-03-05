import React, { useCallback, useEffect, useState } from 'react';
import { FiLoader } from 'react-icons/fi';
import { BiX } from 'react-icons/bi';
import { Link } from 'react-router-dom';
import logoPokemon from '../../assets/logo.png';
import personagemPokemon from '../../assets/personagem.png';
import {
  Container,
  Form,
  Error,
  ContainerButtons,
  Button,
  PokemonsInformations,
} from './styles';
import api from '../../services/api';

const Dashboard = () => {
  const [pokemons, setPokemons] = useState([]);
  // const [pokemonsTypes, setPokemonsTypes] = useState([]);
  const [pokemonName, setPokemonName] = useState('');
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  // useEffect(() => {
  //   async function getPokemonsTypes() {
  //     const { data } = await api.get('type');
  //     const { results } = data;
  //     setPokemonsTypes(results);
  //   }
  //   getPokemonsTypes();
  // }, []);

  const handleSearchPokemon = useCallback(
    async event => {
      event.preventDefault();
      setLoading(true);

      const checkIfPokemonAlredyListed = pokemons.find(
        pokemon => pokemon.name === pokemonName,
      );

      if (!checkIfPokemonAlredyListed) {
        try {
          setError(false);
          const { data } = await api.get(
            `pokemon/${pokemonName.toLowerCase()}`,
          );
          setPokemons([...pokemons, data]);
          setLoading(false);
        } catch (err) {
          setLoading(false);
          setError(true);
        } finally {
          setPokemonName('');
        }
      } else {
        setLoading(false);
      }
    },
    [pokemons, pokemonName],
  );

  // const SearchPokemonByType = useCallback(async typeName => {
  //   try {
  //     setError(false);
  //     const { data } = await api.get(`type/${typeName.toLowerCase()}`);
  //     console.log(data);
  //     const pokemonsFilteredByType = data.pokemon;
  //     console.log(pokemonsFilteredByType);
  //     // setPokemons(pokemonsFilteredByType);
  //   } catch (err) {
  //     setError(true);
  //   }
  // }, []);

  return (
    <Container>
      <img src={logoPokemon} alt="logo-pokemon" />
      <img src={personagemPokemon} alt="personagem" />
      <Form onSubmit={handleSearchPokemon}>
        <input
          value={pokemonName}
          placeholder="Pesquise um Pokémon"
          onChange={e => setPokemonName(e.target.value)}
        />
        <button type="submit">
          {loading ? <FiLoader size={32} /> : 'Pesquisar'}
        </button>
      </Form>

      {error && (
        <Error>
          <span>This pokemon doesnt exist </span>
        </Error>
      )}

      {/* <ContainerButtons>
        {pokemonsTypes.map(({ name }) => {
          return (
            <Button key={name} onClick={() => SearchPokemonByType(name)}>
              {name}
            </Button>
          );
        })}
      </ContainerButtons> */}

      <PokemonsInformations>
        {pokemons.map(pokemon => (
          <a key={pokemon.id} href="/">
            <img
              src={pokemon.sprites.other['official-artwork'].front_default}
              alt={pokemon.name}
            />
            <div>
              <strong>{pokemon.name}</strong>
              <p>{pokemon.types[0].type.name}</p>
            </div>

            {/* <button type="button">
                <BiX size={32} />
              </button> */}
          </a>
        ))}
      </PokemonsInformations>
    </Container>
  );
};

export default Dashboard;
