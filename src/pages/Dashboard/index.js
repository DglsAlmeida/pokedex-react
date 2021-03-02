import React, { useCallback, useEffect, useRef, useState } from 'react';
import { FiLoader } from 'react-icons/fi';
import logoPokemon from '../../assets/logo.png';
import personagemPokemon from '../../assets/personagem.png';
import {
  Container,
  Form,
  Loading,
  Error,
  ContainerButtons,
  Button,
  PokemonsInformations,
} from './styles';
import api from '../../services/api';

const Dashboard = () => {
  const nameInputRef = useRef(null);
  const [pokemons, setPokemons] = useState([]);
  const [pokemonsTypes, setPokemonsTypes] = useState([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function getPokemonsTypes() {
      const { data } = await api.get('type');
      const { results } = data;
      setPokemonsTypes(results);
    }
    getPokemonsTypes();
  }, []);

  const handleSearchPokemon = useCallback(
    async event => {
      event.preventDefault();
      setLoading(true);

      try {
        setError(false);
        const { data } = await api.get(
          `pokemon/${nameInputRef.current?.value.toLowerCase()}`,
        );
        setPokemons([...pokemons, data]);
        // setSearchPokemon('');
        setLoading(false);
      } catch (err) {
        setLoading(false);
        setError(true);
        // setSearchPokemon('');
      }
    },
    [pokemons],
  );

  const SearchPokemonByType = useCallback(
    async typeName => {
      setPokemons([]);
      setLoading(true);
      try {
        setError(false);
        const { data } = await api.get(`type/${typeName.toLowerCase()}`);
        const pokemonsFilteredByType = data.pokemon;
        setPokemons([...pokemons, pokemonsFilteredByType]);
        setLoading(false);
      } catch (err) {
        setLoading(false);
        setError(true);
        // setSearchPokemon('');
      }
    },
    [pokemons],
  );

  return (
    <Container>
      <img src={logoPokemon} alt="logo-pokemon" />
      <img src={personagemPokemon} alt="personagem" />
      <Form onSubmit={handleSearchPokemon}>
        <input placeholder="Pesquise um Pokémon" ref={nameInputRef} />
        <button type="submit">Pesquisar</button>
      </Form>

      {error && (
        <Error>
          <span>This pokemon doesnt exist </span>
        </Error>
      )}

      <ContainerButtons>
        {pokemonsTypes.map(({ name }) => {
          return (
            <Button onClick={() => SearchPokemonByType(name)}>{name}</Button>
          );
        })}
      </ContainerButtons>

      {loading && (
        <Loading>
          <FiLoader size={36} />
        </Loading>
      )}

      <PokemonsInformations>
        {pokemons.map(pokemon => (
          <span key={pokemon.id}>{pokemon.name}</span>
        ))}
      </PokemonsInformations>
    </Container>
  );
};

export default Dashboard;
