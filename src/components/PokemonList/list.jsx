/* eslint-disable react/prop-types */
import React from "react";

const List = ({ allPokemon, selectedPokemon, pokemonSelected }) => {

  const handleSelectedPokemon = (name) => {
    selectedPokemon(name);
  };

  return (
    <div className="card-container flex-center-center">
        {allPokemon &&
            allPokemon.map((pokemon) => {
            return (
                <div
                className={`pokemon-card ${pokemonSelected.includes(pokemon.name) ? 'selected' : ''}`}
                key={pokemon.name}
                onClick={() => handleSelectedPokemon(pokemon.name)}
                >
                    {pokemon.name.toUpperCase()}
                </div>
            );
            })}
    </div>
  );
};

export default List;
