'use client';
import { useState } from 'react';

export default function Square({ 
    value, onSquareClick 
}: {
    value: string|null, onSquareClick():void
}) {
    return (
    <button 
        className="border border-collapse border-black w-1/3 lg:text-6xl md:text-4xl flex-shrink"
        onClick={onSquareClick}
    >
        {value}
    </button>
  )}
  