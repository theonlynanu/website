'use client'

import { ThemeProvider } from "next-themes";
import Square from "./square"
import axios from "axios";

export default function Board({
  squares, xIsNext, onPlay, gameMode}
  
  : {squares: boardState[]
    , xIsNext: boolean
    , onPlay(nextSquares: boardState[]):any
    , gameMode: string
  }) {

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
    onPlay(nextSquares)
  }
                                              
  async function get_ai_move(squares: boardState[], model: string) {
    const requestBody = JSON.stringify({"state": squares})
    const config = {
      method: 'post',
      url: `http://localhost:8000/api/ai-move/${model}`,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
      data: requestBody
    }
    const axios = require('axios').default

    axios.request(config)
    .then((response:any) => {
      handleClick(response.data.ai_move[0]
    );
    console.log(response.data.ai_move[0])
  })
  .catch((error: any) => {
    console.log(error)
  });
  }

  switch(gameMode) {
    case "local":
      break;
    case "ai-first":
      if (!xIsNext) {
        get_ai_move(squares, "minmax")
      };
      break;
    case "ai-second":
      if (xIsNext) {
        get_ai_move(squares, "minmax")
      };
      break;
    case "random-first":
      if (!xIsNext) {
        get_ai_move(squares, "random")
      };
      break;
    case "random-second":
      if (xIsNext) {
        get_ai_move(squares, "random")
      };
      break;
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
    <div className="flex-row flex-wrap justify-stretch w-1/4 aspect-square border border-black dark:border-white">
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