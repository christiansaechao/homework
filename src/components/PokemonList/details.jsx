/* eslint-disable react/prop-types */
import React from 'react';

const Details = ({pokemonDetailData}) => {

    return (
        <div className="details-container flex-center-center">{pokemonDetailData && pokemonDetailData.map((pokemon) => 
            <div className={`pokemon-card ${pokemon.types?.primary}`} key={pokemon.name}>
                <div className="title flex-between-center"><span>{pokemon.id}</span> <span className="name">{pokemon.name}</span></div>
                <div className="img-container"><img src={pokemon.img} alt={pokemon.name} /></div>
                <div className="pokemon-abilities">Abilities: {pokemon.abilities}</div>
                <div>
                    Types: {pokemon.types.primary}
                    {pokemon.types.secondary && <span>, {pokemon.types.secondary}</span>}
                </div>
                <div>Height: {pokemon.weight}</div>
                <div>Weight: {pokemon.height}kgs</div>
            </div>
            )}
        </div>
    )
}

export default Details;

// abilities: "overgrow, chlorophyll"
// id: 1
// img: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png"
// name: "bulbasaur"
// types: "grass, poison"
// weight: 69