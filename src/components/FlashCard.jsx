import React, { useState } from "react";
import "./FlashCard.css";

const FlashCard = ({ character, romaji, isGameStarted }) => {
  const [flipped, setFlipped] = useState(false);

  return (
    <div className={isGameStarted ? "card-start" : "card"} onClick={() => setFlipped(!flipped)}>
      {flipped ? romaji : character}
    </div>
  );
};

export default FlashCard;
