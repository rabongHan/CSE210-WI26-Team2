/**
 * Type definitions for the Prime Testing Game
 */

// Game state machine
export type GameState = 'welcome' | 'playing' | 'won' | 'lost';

// Main game data structure
export interface GameData {
  currNum: number;
  numList: number[];
  currNumIndex: number;
  userHealth: number;
  bossHealth: number;
  timeLeft: number;
  buttonsDisabled: boolean;
}

// Feedback shown to user after answering
export interface Feedback {
  correctText: string;
  isCorrect: boolean;
  factorization: string;
  divisibility: string;
}

// Result of checking an answer
export interface AnswerResult {
  correct: boolean;
  isPrime: boolean;
}
