/**
 * Local minimax move selection for tic-tac-toe
 */

const WINNING_LINES = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
] as const;

export function calculateWinner(squares: boardState[]): "X" | "O" | null {
  for (const [a, b, c] of WINNING_LINES) {
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }

  return null;
}

function isBoardFull(squares: boardState[]): boolean {
  return squares.every((sq) => sq !== null);
}

function minimax(
  squares: boardState[],
  isAiTurn: boolean,
  aiPlayer: "X" | "O",
  alpha: number,
  beta: number,
  depth: number
): number {
  const winner = calculateWinner(squares);
  if (winner === aiPlayer) {
    return 10 - depth;
  }

  if (winner !== null) {
    return depth - 10;
  }

  if (isBoardFull(squares)) {
    return 0;
  }

  const opponent: "X" | "O" = aiPlayer === "X" ? "O" : "X";
  const currentPlayer = isAiTurn ? aiPlayer : opponent;

  let best = isAiTurn ? -Infinity : Infinity;
  for (let i = 0; i < 9; i++) {
    if (squares[i] !== null) {
      continue;
    }

    squares[i] = currentPlayer;
    const score = minimax(squares, !isAiTurn, aiPlayer, alpha, beta, depth + 1);

    squares[i] = null;

    if (isAiTurn) {
      best = Math.max(best, score);
      alpha = Math.max(alpha, score);
    } else {
      best = Math.min(best, score);
      beta = Math.min(beta, score);
    }
    if (beta <= alpha) {
      break;
    }
  }

  return best;
}

function getMinimaxMove(squares: boardState[], aiPlayer: "X" | "O"): number {
  let bestMove = -1;
  let bestScore = -Infinity;

  const working = squares.slice();
  for (let i = 0; i < 9; i++) {
    if (working[i] !== null) {
      continue;
    }

    working[i] = aiPlayer;
    const score = minimax(working, false, aiPlayer, -Infinity, Infinity, 1);
    working[i] = null;
    if (score > bestScore) {
      bestScore = score;
      bestMove = i;
    }
  }
  return bestMove;
}

function getRandomMove(squares: boardState[]): number {
  const empty: number[] = [];
  for (let i = 0; i < 9; i++) {
    if (squares[i] === null) {
      empty.push(i);
    }
  }

  if (empty.length === 0) {
    return -1;
  }

  return empty[Math.floor(Math.random() * empty.length)];
}

export type AiModel = "minmax" | "random";

export function getAiMove(
  squares: boardState[],
  aiPlayer: "X" | "O",
  model: AiModel
): number {
  if (model === "random") {
    return getRandomMove(squares);
  }

  return getMinimaxMove(squares, aiPlayer);
}
