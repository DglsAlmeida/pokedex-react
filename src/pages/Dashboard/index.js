import React, { useCallback, useRef, useState } from 'react';
import { FiLoader } from 'react-icons/fi';
// import { BiX } from 'react-icons/bi';
// import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import { Link } from 'react-router-dom';
import logoPokemon from '../../assets/logo.png';
import personagemPokemon from '../../assets/personagem.png';
import { Container, Form, PokemonsInformations } from './styles';
import api from '../../services/api';

const Dashboard = () => {
  const inputRef = useRef(null);
  const [pokemons, setPokemons] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSearchPokemon = useCallback(
    async event => {
      event.preventDefault();
      setLoading(true);

      const checkIfPokemonAlredyListed = pokemons.find(
        pokemon => pokemon.name === inputRef.current?.value,
      );

      if (!checkIfPokemonAlredyListed) {
        if (!inputRef.current.value) {
          setLoading(false);
          toast.warning('Digite o nome de um pokémon');
        } else {
          try {
            const { data } = await api.get(
              `pokemon/${inputRef.current?.value.toLowerCase()}`,
            );
            setPokemons([...pokemons, data]);
            setLoading(false);
          } catch (err) {
            setLoading(false);
            toast.error('Esse pokémon não existe!');
          } finally {
            inputRef.current.value = '';
          }
        }
      } else {
        setLoading(false);
        inputRef.current.value = '';
        toast.warning('Esse pokémon já foi listado!');
      }
    },
    [pokemons],
  );

  return (
    <Container>
      <img src={logoPokemon} alt="logo-pokemon" />
      <img src={personagemPokemon} alt="personagem" />
      <Form onSubmit={handleSearchPokemon}>
        <input ref={inputRef} placeholder="Pesquise um Pokémon" />
        <button type="submit">
          {loading ? <FiLoader size={32} /> : 'Pesquisar'}
        </button>
      </Form>

      <PokemonsInformations>
        {pokemons.map(pokemon => (
          <Link key={pokemon.id} to={`pokemon-informations/${pokemon.name}`}>
            <img
              src={pokemon.sprites.other['official-artwork'].front_default}
              alt={pokemon.name}
            />
            <div>
              <strong>{pokemon.name}</strong>
              <p>{pokemon.types[0].type.name}</p>
            </div>
          </Link>
        ))}
      </PokemonsInformations>
    </Container>
  );
};

export default Dashboard;
