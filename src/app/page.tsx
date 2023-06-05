'use client'

import Square from "./square"
import { useState } from 'react';

export default function Board() {
  const [squares, setSquares] = useState<string[]|null[]>(Array(9).fill(null))

  function handleClick(i: number) {
    const nextSquares = squares.slice();
    nextSquares[i] = "X";
    setSquares(nextSquares);
    console.log("clicked");
  }

  return (
    <div className=" flex-row flex-wrap w-1/4 aspect-square">
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
  )
}
