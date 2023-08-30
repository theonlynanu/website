"use client";

import Board from "./board";
import { useState } from "react";

declare global {
  type boardState = "X" | "O" | null;
}

export default function Game() {
  const [xIsNext, setXIsNext] = useState<boolean>(true);

  const [history, setHistory] = useState<boardState[][]>([Array(9).fill(null)]);
  const currentBoard = history[history.length - 1];

  const [gameMode, setGameMode] = useState<string>("local");

  function handlePlay(nextSquares: boardState[]) {
    setHistory([...history, nextSquares]);
    setXIsNext(!xIsNext);
  }

  function reset(): void {
    setHistory([Array(9).fill(null)]);
    setXIsNext(true);
  }

  return (
    <div className="">
      <div className="flex w-fit flex-row items-center">
        <button
          className=" m-2 rounded border border-gray-400 bg-white px-2 py-1 font-bold text-gray-800 shadow hover:bg-gray-200"
          onClick={reset}
        >
          Reset
        </button>

        <p className="capitalize">
          Current mode: <strong>{gameMode}</strong>
        </p>

        <form className="p-4">
          <label>
            Select game mode:
            <select
              name="selectedGameMode"
              defaultValue="local"
              onChange={(e) => {
                setGameMode(e.target.value);
                reset();
              }}
              className="block rounded-lg border border-gray-200 bg-standard-200 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-standard-100 dark:focus:border-blue-500 dark:focus:ring-blue-500"
            >
              <option value="local">Local</option>
              <option value="ai-first">AI - Move First</option>
              <option value="ai-second">AI - Move Second</option>
              <option value="random-first">Random - Move First</option>
              <option value="random-second">Random - Move Second</option>
            </select>
          </label>
        </form>
      </div>

      <div className=" mx-4">
        <Board
          squares={currentBoard}
          xIsNext={xIsNext}
          onPlay={handlePlay}
          gameMode={gameMode}
        />
      </div>
    </div>
  );
}
