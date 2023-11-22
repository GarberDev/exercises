import React, { useState, useEffect } from "react";
import axios from "axios";
import DrawButton from "./sources/DrawButton";
import ShuffleButton from "./sources/ShuffleButton";
import CardDisplay from "./sources/CardDisplay";

const App = () => {
  const [deckId, setDeckId] = useState("");
  const [currentCard, setCurrentCard] = useState(null);
  const [remaining, setRemaining] = useState(52);
  const [isShuffling, setIsShuffling] = useState(false);

  useEffect(() => {
    axios
      .get("http://deckofcardsapi.com/api/deck/new/")
      .then((response) => {
        setDeckId(response.data.deck_id);
        setRemaining(response.data.remaining);
      })
      .catch((error) => console.error("Error fetching new deck:", error));
  }, []);

  const drawCard = () => {
    axios
      .get(`http://deckofcardsapi.com/api/deck/${deckId}/draw/?count=1`)
      .then((response) => {
        setCurrentCard(response.data.cards[0]);
        setRemaining(response.data.remaining);
      })
      .catch((error) => console.error("Error drawing a card:", error));
  };

  const shuffleDeck = () => {
    setIsShuffling(true);
    axios
      .get(`http://deckofcardsapi.com/api/deck/${deckId}/shuffle/`)
      .then(() => {
        setCurrentCard(null);
        setRemaining(52);
        setIsShuffling(false);
      })
      .catch((error) => {
        console.error("Error shuffling the deck:", error);
        setIsShuffling(false);
      });
  };

  return (
    <div className="card-container">
      <DrawButton
        drawCard={drawCard}
        remaining={remaining}
        className="draw-button"
      />
      <ShuffleButton shuffleDeck={shuffleDeck} isShuffling={isShuffling} />
      <CardDisplay currentCard={currentCard} className="card-display" />
    </div>
  );
};

export default App;
