import React, { useState, useEffect } from "react";
import "./App.css";

const Button = ({ onClick, children }) => (
  <button onClick={onClick} className="game-button">
    {children}
  </button>
);

const Card = ({ children }) => (
  <div className="game-card">{children}</div>
);

const CardContent = ({ children }) => (
  <div className="game-card-content">{children}</div>
);

const words = [ "galaxy",
  "nebula",
  "asteroid",
  "comet",
  "planet",
  "meteor",
  "rocket",
  "star",
  "sun",
  "moon",
  "space",
  "station",
  "alien",
  "cosmos",
  "orbit",
  "universe",
  "black hole",
  "light year",
  "gravity",
  "satellite",
  "telescope",
  "expedition",
  "exploration",
  "mission",
  "launch",
  "astronaut",
  "cosmonaut",
  "spacecraft",
  "interstellar",
  "quasar",
  "supernova",
  "dark matter",];

export default function GamePrototype() {
  const [hasStarted, setHasStarted] = useState(false);
  const [score, setScore] = useState(0);
  const [currentWord, setCurrentWord] = useState("");
  const [input, setInput] = useState("");
  const [timeLeft, setTimeLeft] = useState(10);
  const [gameOver, setGameOver] = useState(false);

  useEffect(() => {
    if (hasStarted && !gameOver) {
      const timer = setTimeout(() => {
        if (timeLeft > 0) {
          setTimeLeft((prev) => prev - 1);
        } else {
          setGameOver(true);
        }
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [timeLeft, hasStarted, gameOver]);

  const startGame = () => {
    setHasStarted(true);
    setGameOver(false);
    setScore(0);
    setTimeLeft(30);
    setNewWord();
  };

  const setNewWord = () => {
    const randomWord = words[Math.floor(Math.random() * words.length)];
    setCurrentWord(randomWord);
    setInput("");
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    setInput(value);
    if (value === currentWord) {
      setScore((prev) => prev + 1);
      setNewWord();
    }
  };

  if (!hasStarted) {
    return (
      <div className="game-wrapper">
        <Card>
          <CardContent>
            <h1 className="game-title">🚀 Typing Speed Game</h1>
            <p style={{ fontSize: "18px", opacity: 0.9 }}>
              Type as many words as you can in 30 seconds.
            </p>
            <Button onClick={startGame}>Start Game</Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="game-wrapper">
      <Card>
        <CardContent>
          <h1 className="game-title">Typing Speed Game</h1>
          {gameOver ? (
            <>
              <p className="game-over-text">Game Over!</p>
              <p className="game-score">{score}</p>
              <Button onClick={startGame}>Play Again</Button>
            </>
          ) : (
            <>
              <div className="game-info">
                <span>Time Left: {timeLeft}s</span>
                <span>Score: {score}</span>
              </div>
              <div className="game-word">{currentWord}</div>
              <input
                className="game-input"
                type="text"
                value={input}
                onChange={handleInputChange}
                placeholder="Type the word..."
              />
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
