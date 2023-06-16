'use client'

import Square from "./square"
import { useState } from 'react';

declare global {
  type boardState = "X" | "O" | null
}

export default function Board() {
  const [squares, setSquares] = useState<boardState[]>(Array(9).fill(null))
  const [xIsNext, setXIsNext] = useState<boolean>(true);

  function handleClick(i: number) {
    if (squares[i] || calculateWinner(squares)) {
      return
    }
    const nextSquares = squares.slice();
    if (xIsNext) {
      nextSquares[i] = "X";
    } else {
      nextSquares[i] = "O"
    }
    setSquares(nextSquares);
    setXIsNext(!xIsNext)
  }

  function reset():void {
    setSquares(Array(9).fill(null));
    setXIsNext(true);
  }

  const winner = calculateWinner(squares)
  let status: string;
  if (winner) {
    status = `Winner: ${winner}`;
  } else if (!(squares.includes(null))) {
    status = "Tie!"
  } else {
    status = `Next player: ${xIsNext ? "X": "O"}`;
  }

  return (
    <>
    <button 
      className="bg-white hover:bg-gray-200 text-gray-800 font-bold border py-1 px-2 m-2 border-gray-400 rounded shadow" 
      onClick={reset}
    >
      Reset
    </button>
    <div className=" flex-row flex-wrap w-1/4 aspect-square border border-black">
      <div className="flex flex-row items-stretch justify-evenly h-1/3">
        <Square value={squares[0]} onSquareClick={() => handleClick(0)} />
        <Square value={squares[1]} onSquareClick={() => handleClick(1)} />
        <Square value={squares[2]} onSquareClick={() => handleClick(2)} />
      </div>
      <div className="flex flex-row items-stretch  justify-evenly h-1/3">
        <Square value={squares[3]} onSquareClick={() => handleClick(3)} />
        <Square value={squares[4]} onSquareClick={() => handleClick(4)} />
        <Square value={squares[5]} onSquareClick={() => handleClick(5)} />
      </div>
      <div className="flex flex-row items-stretch  justify-evenly h-1/3 ">
        <Square value={squares[6]} onSquareClick={() => handleClick(6)} />
        <Square value={squares[7]} onSquareClick={() => handleClick(7)} />
        <Square value={squares[8]} onSquareClick={() => handleClick(8)} />
      </div>
    </div>
    <div className="">
      {status}
    </div>
    </>
  )
}

function calculateWinner(squares:boardState[]) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];

  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a]
    }
  }
  return null;
}