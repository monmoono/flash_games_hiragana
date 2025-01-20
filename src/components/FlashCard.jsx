import React, { useState,useEffect } from "react";
import "./FlashCard.css";

const FlashCard = ({ character, romaji, isGameStarted, resetTrigger }) => {
  const [flipped, setFlipped] = useState(false);

  useEffect(() => {
    setFlipped(false);
  }, [resetTrigger]);

  return (
    <div className={isGameStarted ? "card-start" : "card"} onClick={() => setFlipped(!flipped)}>
      {flipped ? romaji : character}
    </div>
  );
};

export default FlashCard;
