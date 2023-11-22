import React from "react";

const CardDisplay = ({ currentCard }) => {
  return (
    <div>
      {currentCard ? (
        <img src={currentCard.image} alt={currentCard.code} />
      ) : (
        <p>No card drawn yet</p>
      )}
    </div>
  );
};

export default CardDisplay;
