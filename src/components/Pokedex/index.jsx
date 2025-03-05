import { useEffect, useState } from 'react';
import axios from 'https://cdn.jsdelivr.net/npm/axios@1.7.9/+esm';
import PokeDex from './Pokedex';
import Detail from './detail';
import './styles.scss';

const PokedexPage = () => {
    const [allPokemon, setAllPokemon] = useState(null);
    const [showDetails, setShowDetails] = useState(false);
    const [pokemon, setPokemon] = useState(null);

    const getAllPokemon = async () => {
        try {
            const { data } = await axios.get(`https://pokeapi.co/api/v2/pokemon?limit=151`);
            setAllPokemon(data.results);
        } catch (err) {
            throw new Error(err);
        }
    };
        
    useEffect(() => {
        getAllPokemon();
    }, []);    

    return (
        <div>
            <button onClick={() => setShowDetails(!showDetails)}>Toggle Details</button>
            {showDetails ? <Detail /> : <PokeDex allPokemon={allPokemon} /> }
        </div>
    )
}

export default PokedexPage;