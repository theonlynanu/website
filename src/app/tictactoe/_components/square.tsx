"use client";

export default function Square({
  value,
  onSquareClick,
}: {
  value: string | null;
  onSquareClick(): void;
}) {
  return (
    <button
      className="w-1/3 flex-shrink border-collapse border border-black text-6xl dark:border-white md:text-8xl lg:text-8xl"
      onClick={onSquareClick}
    >
      {value}
    </button>
  );
}
