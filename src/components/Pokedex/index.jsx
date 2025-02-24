import { useEffect, useState } from 'react';
import axios from 'https://cdn.jsdelivr.net/npm/axios@1.7.9/+esm';
import useDebounce from '../../hooks/debounce';
import Screen from './screen';
import './styles.scss';

const PokeDex = () => {
    const [allPokemon, setAllPokemon] = useState(null);
    const [suggestedPokemon, setSuggestedPokemon] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [pokeData, setPokeData] = useState(null);

    const debouncedSearchTerm = useDebounce(searchTerm, 1000);

    const getPokemonData = async () => {
        if (debouncedSearchTerm == "" || debouncedSearchTerm == null) return ;
        try {    
            const { data } = await axios.get(`https://pokeapi.co/api/v2/pokemon/${debouncedSearchTerm}`);
            setPokeData(data);
        } catch (err) {
            throw new Error(err); 
        }
    };

    const getAllPokemon = async () => {
        try {
            const { data } = await axios.get(`https://pokeapi.co/api/v2/pokemon?limit=151`);
            setAllPokemon(data.results);
        } catch (err) {
            throw new Error(err);
        }
    }

    const handleSearch = (value) => {
        setSearchTerm(value);
        filteredPokmeon(value);
    }

    const filteredPokmeon = (value) => {
        if (value == "") {
            setSuggestedPokemon([]);
            return; 
        }

        const pokemonSuggestions = allPokemon.filter((pokemon) => pokemon.name.includes(value));
        setSuggestedPokemon(pokemonSuggestions);
    }

    useEffect(() => {
        getAllPokemon();
    }, []);

    return (
        <div className="pokedex-container">
            <div className="inner-container">
                <Screen name={pokeData?.name} id={pokeData?.id} weight={pokeData?.weight} front_default={pokeData?.sprites.front_default} />
                <div className="search-container">
                    <input className="search-bar" type="text" value={searchTerm} onChange={(e) => handleSearch(e.target.value)} autoFocus placeholder='Search For Pokemon...'/>
                    <div className="search-btn" onClick={() => getPokemonData()}>Find Pokemon</div>
                    <ul className="dropdown">
                        {suggestedPokemon.length > 0 &&
                            suggestedPokemon.map((pokemon, index) => 
                                <li key={index} onClick={() => setSearchTerm(pokemon.name)}>
                                    {pokemon.name}
                                </li>)
                        }
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default PokeDex;