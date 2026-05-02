import { useState } from "react";
import Square from "./components/Square";
import { getBestMove } from "./utils/ai";
import "./App.css";

export default function App() {
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [isX, setIsX] = useState(true);
  const [mode, setMode] = useState(null);

  function calculateWinner(sq) {
    const lines = [
      [0,1,2],[3,4,5],[6,7,8],
      [0,3,6],[1,4,7],[2,5,8],
      [0,4,8],[2,4,6]
    ];

    for (let [a,b,c] of lines) {
      if (sq[a] && sq[a] === sq[b] && sq[a] === sq[c]) {
        return sq[a];
      }
    }
    return null;
  }

  function handleClick(i) {
    if (squares[i] || calculateWinner(squares)) return;

    const newSquares = [...squares];
    newSquares[i] = isX ? "X" : "O";
    setSquares(newSquares);
    setIsX(!isX);

    if (mode === "ai" && newSquares[i] === "X")  {
      setTimeout(() => {
        const aiMove = getBestMove(newSquares);
        if (aiMove !== undefined) {
          newSquares[aiMove] = "O";
          setSquares([...newSquares]);
          setIsX(true);
        }
      }, 500);
    }
  }

  function resetGame() {
    setSquares(Array(9).fill(null));
    setIsX(true);
  }

  const winner = calculateWinner(squares);

  return (
    <div className="game-container">
      <h1>Tic Tac Toe</h1>

      {!mode && (
        <>
          <button onClick={() => setMode("friend")}>
            Play with Friend
          </button>
          <button onClick={() => setMode("ai")}>
            Play with AI
          </button>
        </>
      )}

      {mode && (
        <>
          <div className="board">
            {squares.map((val, i) => (
              <Square key={i} value={val} onClick={() => handleClick(i)} />
            ))}
          </div>

          <h2>
            {winner ? `Winner: ${winner}` : `Turn: ${isX ? "X" : "O"}`}
          </h2>

          <button onClick={resetGame}>Restart</button>
        </>
      )}
    </div>
  );
}