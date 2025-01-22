import React, { useState, useEffect, useRef } from "react";
import { hiraganaRows } from "./hiraganaData";
import FlashCard from "./components/FlashCard";
import "./App.css";

const App = () => {
  const [selectedRows, setSelectedRows] = useState([]);
  const [shuffledCards, setShuffledCards] = useState([]);
  const [gameStarted, setGameStarted] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(true);
  const [resetTrigger, setResetTrigger] = useState(0);

  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const shuffleCards = () => {
    resetGame();
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
    setResetTrigger((prev) => prev + 1);
  };

  const restartGame = () => {
    setGameStarted(false);
    setShuffledCards([]);
    setResetTrigger((prev) => prev + 1);

    // ให้รอจน state อัปเดตแล้วเริ่มเกมใหม่
    setTimeout(() => {
      shuffleCards();
    }, 100);
  };

  // ฟังก์ชันเลือกแถว
  const toggleRow = (rowName) => {
    setSelectedRows((prev) =>
      prev.includes(rowName)
        ? prev.filter((row) => row !== rowName)
        : [...prev, rowName]
    );
    resetGame();
  };

  const toggleSelectAll = () => {
    if (selectedRows.length === Object.keys(hiraganaRows).length) {
      setSelectedRows([]); // Clear all if everything is selected
    } else {
      setSelectedRows(Object.keys(hiraganaRows)); // Select all otherwise
    }
    resetGame();
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
        <button onClick={restartGame} disabled={!gameStarted}>
          เล่นอีกครั้ง
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
          {(gameStarted ? shuffledCards : selectedCharacters).map(({ char, romaji }, index) => (
            <FlashCard
              key={char}
              character={char}
              romaji={romaji}
              isGameStarted={gameStarted}
              resetTrigger={resetTrigger}
            />
          ))}
        </div>
      </div>

      <div className={"floating-dropdown"} >
        <button className="dropdown-button" onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
          เลือกแถว
        </button>
        {isDropdownOpen && (
          <div className={"dropdown-menu"} ref={dropdownRef}>
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
