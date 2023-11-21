import React from "react";
import "./Pokecard.css";

function Pokecard(props) {
  const { id, name, type, base_experience } = props;
  let imgSrc = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;

  return (
    <div className="Pokecard">
      <h3 className="Pokecard-title">{name}</h3>
      <div className="Pokecard-image">
        <img src={imgSrc} alt={name} />
      </div>
      <div className="Pokecard-data">Type: {type}</div>
      <div className="Pokecard-data">EXP: {base_experience}</div>
    </div>
  );
}

export default Pokecard;
