'use client';


export default function Square({ 
    value, onSquareClick 
}: {
    value: string|null, onSquareClick():void
}) {
    return (
    <button 
        className="border border-collapse border-black w-1/3 lg:text-8xl md:text-8xl text-6xl flex-shrink dark:border-white"
        onClick={onSquareClick}
    >
        {value}
    </button>
  )}

  