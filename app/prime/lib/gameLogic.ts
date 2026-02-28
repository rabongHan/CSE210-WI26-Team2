import { generateBalancedNumbers, isPrime } from "./numberGenerator";
import { primeMnemonic, compositeMnemonic, factorizationMessage } from "./factorCheck";
import { GameData, Feedback, AnswerResult } from "./types";

// Constants
export const MAX_USER_HEALTH = 5;
export const MAX_BOSS_HEALTH = 20;
export const MAX_GUESSES = 25;
export const INITIAL_TIME = 10;

/**
 * Initialize a new game
 * @returns Initial game data
 */
export function initializeGame(): GameData {
  const generated = generateBalancedNumbers(100, 300, MAX_GUESSES, {});
  
  return {
    currNum: generated.numbers[0],
    numList: generated.numbers,
    currNumIndex: 0,
    userHealth: MAX_USER_HEALTH,
    bossHealth: MAX_BOSS_HEALTH,
    timeLeft: INITIAL_TIME,
    buttonsDisabled: false,
  };
}

/**
 * Check if the user's answer is correct
 * @param num - The number being tested
 * @param userSaidPrime - Whether the user said the number is prime
 * @returns Answer result with correctness and actual primality
 */
export function checkAnswer(num: number, userSaidPrime: boolean): AnswerResult {
  const isPrimeNum = isPrime(num);
  return {
    correct: userSaidPrime === isPrimeNum,
    isPrime: isPrimeNum,
  };
}

/**
 * Generate feedback message for the user
 * @param num - The number that was tested
 * @param isPrimeNum - Whether the number is actually prime
 * @param correct - Whether the user answered correctly
 * @returns Feedback object with messages
 */
export function generateFeedback(num: number, isPrimeNum: boolean, correct: boolean): Feedback {
  return {
    correctText: correct ? "Correct!" : "Incorrect!",
    isCorrect: correct,
    factorization: factorizationMessage(num),
    divisibility: !correct ? (isPrimeNum ? primeMnemonic(num) : compositeMnemonic(num)) : "",
  };
}

/**
 * Get the next number in the sequence
 * @param gameData - Current game data
 * @returns Next number and updated index
 */
export function getNextNumber(gameData: GameData): { num: number; index: number } {
  const newIndex = Math.min(gameData.currNumIndex + 1, gameData.numList.length - 1);
  return {
    num: gameData.numList[newIndex],
    index: newIndex,
  };
}

/**
 * Calculate health bar percentage
 * @param current - Current health
 * @param max - Maximum health
 * @returns Percentage (0-100)
 */
export function getHealthPercentage(current: number, max: number): number {
  return (current / max) * 100;
}
