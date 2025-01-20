import React, { useState } from "react";
import { hiraganaRows } from "./hiraganaData";
import FlashCard from "./components/FlashCard";
import "./App.css";

const App = () => {
  const [selectedRows, setSelectedRows] = useState([]);
  const [shuffledCards, setShuffledCards] = useState([]);
  const [gameStarted, setGameStarted] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const shuffleCards = () => {
    let cards = [];
    selectedRows.forEach((rowName) => {
      cards = [...cards, ...hiraganaRows[rowName]];
    });

    // สุ่มการ์ด
    cards = cards.sort(() => Math.random() - 0.5);
    setShuffledCards(cards);
    setGameStarted(true);
  };

  // ฟังก์ชันในการรีเซ็ตเกม
  const resetGame = () => {
    setGameStarted(false);
    setShuffledCards([]);
  };

  // ฟังก์ชันเลือกแถว
  const toggleRow = (rowName) => {
    setSelectedRows((prev) =>
      prev.includes(rowName)
        ? prev.filter((row) => row !== rowName)
        : [...prev, rowName]
    );
  };

  const toggleSelectAll = () => {
    if (selectedRows.length === Object.keys(hiraganaRows).length) {
      setSelectedRows([]); // Clear all if everything is selected
    } else {
      setSelectedRows(Object.keys(hiraganaRows)); // Select all otherwise
    }
  };

  // รวมตัวอักษรจากแถวที่เลือก
  const selectedCharacters = selectedRows.flatMap((row) => hiraganaRows[row]);

  return (
    <div className="container">
      <h1>ทาย Flash Card ฮิรางานะ</h1>
      <div className="btn-control">
        <button onClick={shuffleCards} disabled={selectedRows.length === 0 || gameStarted}>
          เริ่มการเล่น
        </button>
        <button onClick={resetGame} disabled={!gameStarted}>
          รีเซ็ตเกม
        </button>
      </div>
      <div className="sub-contanier">

        {/* ตัวเลือกแถว */}
        <div className="row-selection">
          <div className="contain-btn">
            <button onClick={toggleSelectAll}>
              {selectedRows.length === Object.keys(hiraganaRows).length
                ? "Clear All"
                : "Select All"}
            </button>
          </div>

          {Object.keys(hiraganaRows).map((rowName) => (
            <label key={rowName} className="row-option">
              <input
                type="checkbox"
                checked={selectedRows.includes(rowName)}
                onChange={() => toggleRow(rowName)}
              />
              {rowName}
            </label>
          ))}
        </div>


        {/* แสดง Flash Cards */}
        <div className="card-grid">
          {!gameStarted ? selectedCharacters.map(({ char, romaji }) => (
            <FlashCard key={char} character={char} romaji={romaji} isGameStarted={gameStarted} />
          ))
            : shuffledCards.map(({ char, romaji }) => (
              <FlashCard key={char} character={char} romaji={romaji} isGameStarted={gameStarted} />
            ))
          }
        </div>
      </div>

      {/* <div className={selectedRows.length > 0 ? "floating-dropdown" : "floating-dropdown-mobile"} > */}
      <div className={"floating-dropdown"} >
        <button className="dropdown-button" onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
          เลือกแถว
        </button>
        {isDropdownOpen && (
          <div className="dropdown-menu">
            <button onClick={toggleSelectAll}>
              {selectedRows.length === Object.keys(hiraganaRows).length ? "Clear All" : "Select All"}
            </button>
            {Object.keys(hiraganaRows).map((rowName) => (
              <label key={rowName} className="row-option">
                <input
                  type="checkbox"
                  checked={selectedRows.includes(rowName)}
                  onChange={() => toggleRow(rowName)}
                />
                {rowName}
              </label>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
