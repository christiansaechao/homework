import React, { useState, useEffect } from 'react';
import axios from 'https://cdn.jsdelivr.net/npm/axios@1.7.9/+esm';

import List from './list';
import Details from './details';

import './styles.scss';

const PokemonList = () => {
    const [allPokemon, setAllPokemon] = useState(null);
    const [pokemonSelected, setPokemonSelected] = useState([]);
    const [showDetails, setShowDetails] = useState(false);
    const [pokemonDetailData, setPokemonDetailData] = useState(null);

    const getAllPokemon = async () => {
        try {
            const { data } = await axios.get(`https://pokeapi.co/api/v2/pokemon?limit=151`);
            setAllPokemon(data.results);
        } catch (err) {
            throw new Error(err);
        }
    };

    const selectedPokemon = (name) => {
        setPokemonSelected((prev) =>
          prev.includes(name) ? prev.filter((pokemon) => pokemon !== name) : [...prev, name]
        );
    };

    const getPokemonDetails = async () => {
        let requests = pokemonSelected.map((pokemon) => {return `https://pokeapi.co/api/v2/pokemon/${pokemon}`});
        try {
            const responses = await axios.all(requests.map((request) => axios.get(request)));
            const pokemonData = responses.map((res) => {
                let data = res.data;
                return {
                    name: data.name,
                    id: data.id,
                    img: data.sprites.front_default,
                    types: {
                        primary: data.types[0].type.name,
                        secondary: data.types[1] ? data.types[1].type.name : null
                    },
                    weight: data.weight,
                    height: data.height,
                    abilities: data.abilities.map((ability) => ability.ability.name).join(', ')
                }
            });
            setPokemonDetailData(pokemonData);
        } catch(err) {
            throw new Error(err);
        }
    };

    const handleShowDetailClick = () => {
        getPokemonDetails();
        setShowDetails(!showDetails)
    }
        
    useEffect(() => {
        getAllPokemon();
    }, []); 

    return (
        <div>
            <button className={`view-details-btn`} disabled={pokemonSelected.length === 0} onClick={() => handleShowDetailClick()}>{!showDetails ? 'View Details' : 'Go Back'}</button>
            {showDetails ?  
                <Details pokemonDetailData={pokemonDetailData} />
                :
                <List allPokemon={allPokemon} selectedPokemon={selectedPokemon} pokemonSelected={pokemonSelected} />
            }
        </div>
    )
}

export default PokemonList;