"use client";

import { useState } from "react";
import Square from "./square";
import { calculateWinner, getAiMove, type AiModel } from "../utils/minimax";

function aiPlayerForMode(mode: string): "X" | "O" {
  return mode === "ai-second" || mode === "random-second" ? "X" : "O";
}

export default function Board({
  squares,
  xIsNext,
  onPlay,
  gameMode,
}: {
  squares: boardState[];
  xIsNext: boolean;
  onPlay(nextSquares: boardState[]): any;
  gameMode: string;
}) {
  const [isLoading, setIsLoading] = useState(false);
  function handleClick(i: number) {
    if (squares[i] || calculateWinner(squares)) {
      return;
    }
    const nextSquares = squares.slice();
    if (xIsNext) {
      nextSquares[i] = "X";
    } else {
      nextSquares[i] = "O";
    }
    onPlay(nextSquares);
  }

  function play_ai_move(squares: boardState[], model: AiModel) {
    const aiPlayer = aiPlayerForMode(gameMode);
    const move = getAiMove(squares, aiPlayer, model);
    handleClick(move);
    if (isLoading) {
      setIsLoading(false);
    }
  }

  switch (gameMode) {
    case "local":
      break;
    case "ai-first":
      if (!xIsNext) {
        setTimeout(() => setIsLoading(true), 1);
        setTimeout(() => play_ai_move(squares, "minmax"), 300);
      }
      break;
    case "ai-second":
      if (xIsNext) {
        setTimeout(() => setIsLoading(true), 1);
        setTimeout(() => play_ai_move(squares, "minmax"), 300);
      }
      break;
    case "random-first":
      if (!xIsNext) {
        setTimeout(() => setIsLoading(true), 1);
        setTimeout(() => play_ai_move(squares, "random"), 300);
      }
      break;
    case "random-second":
      if (xIsNext) {
        setTimeout(() => setIsLoading(true), 1);
        setTimeout(() => play_ai_move(squares, "random"), 300);
      }
      break;
  }

  const winner = calculateWinner(squares);
  let status: string;
  if (winner) {
    status = `Winner: ${winner}`;
  } else if (!squares.includes(null)) {
    status = "Tie!";
  } else if (isLoading) {
    status = "Awaiting move...";
  } else {
    status = `Next player: ${xIsNext ? "X" : "O"}`;
  }

  return (
    <div className="flex flex-col self-center">
      <div className="border-standard-900 dark:border-standard-100 aspect-square w-auto max-w-lg flex-row flex-wrap justify-stretch border">
        <div className="flex h-1/3 flex-row items-stretch justify-evenly">
          <Square value={squares[0]} onSquareClick={() => handleClick(0)} />
          <Square value={squares[1]} onSquareClick={() => handleClick(1)} />
          <Square value={squares[2]} onSquareClick={() => handleClick(2)} />
        </div>
        <div className="flex h-1/3 flex-row items-stretch justify-evenly">
          <Square value={squares[3]} onSquareClick={() => handleClick(3)} />
          <Square value={squares[4]} onSquareClick={() => handleClick(4)} />
          <Square value={squares[5]} onSquareClick={() => handleClick(5)} />
        </div>
        <div className="flex h-1/3 flex-row items-stretch justify-evenly">
          <Square value={squares[6]} onSquareClick={() => handleClick(6)} />
          <Square value={squares[7]} onSquareClick={() => handleClick(7)} />
          <Square value={squares[8]} onSquareClick={() => handleClick(8)} />
        </div>
      </div>
      <div className="w-fit">{status}</div>
    </div>
  );
}
