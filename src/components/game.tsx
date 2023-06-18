'use client'

import Board from "../components/board"
import Selectors from "./selectors"
import { useState } from 'react';


export default function Game() {
    const [xIsNext, setXIsNext] = useState<boolean>(true);

    const [history, setHistory] = useState<boardState[][]>([Array(9).fill(null)]);
    const currentBoard = history[history.length - 1];

    const [gameMode, setGameMode] = useState<string>("local");

    function handlePlay(nextSquares: boardState[]) {
        setHistory([...history, nextSquares]);
        setXIsNext(!xIsNext);
    }

    function reset():void {
        setHistory([Array(9).fill(null)]);
        setXIsNext(true);
      }

  return (
    <>
    <div className="flex flex-row">
        <button 
        className="bg-white hover:bg-gray-200 text-gray-800 font-bold border py-1 px-2 m-2 border-gray-400 rounded shadow" 
        onClick={reset}
        >
        Reset
        </button>
        <select className="bg-gray-50 border border-gray-200 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
            <option>Local</option>
            <option>AI - Move First</option>
            <option>AI - Move Second</option>
        </select>
    </div>
    <div> 
        <Board squares={currentBoard} xIsNext = {xIsNext} onPlay={handlePlay}/>
    </div>
    </>
  )
}