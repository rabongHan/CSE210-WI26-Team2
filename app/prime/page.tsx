"use client";

import { useEffect, useState, useCallback } from "react";
import { 
  initializeGame, 
  checkAnswer, 
  generateFeedback, 
  getNextNumber,
  createIncorrectGuess,
  createCorrectGuess,
  INITIAL_TIME,
  MAX_BOSS_HEALTH,
  MAX_USER_HEALTH
} from "./lib/gameLogic";
import { isPrime } from "./lib/numberGenerator";
import { GameState, GameData, Feedback, IncorrectGuess, CorrectGuess } from "./lib/types";
import WelcomeScreen from "./components/WelcomeScreen";
import GameScreen from "./components/GameScreen";
import EndGameScreen from "./components/EndGameScreen";
import GameButton from "./components/GameButton";
import { saveGameState, saveGameData } from "./lib/save";

export default function Page() {
  // ===== React State Management =====
  const [gameState, setGameState] = useState<GameState>('welcome');
  const [gameData, setGameData] = useState<GameData>(() => initializeGame());
  const [feedback, setFeedback] = useState<Feedback | null>(null);
  const [showContinue, setShowContinue] = useState(false);
  const [incorrectGuesses, setIncorrectGuesses] = useState<IncorrectGuess[]>([]);
  const [correctGuesses, setCorrectGuesses] = useState<CorrectGuess[]>([]);

  // ===== Timer Effect =====
  useEffect(() => {
    if (gameState !== 'playing' || gameData.buttonsDisabled) return;
    
    const timer = setInterval(() => {
      setGameData(prev => {
        const newTimeLeft = prev.timeLeft - 1;
        
        if (newTimeLeft <= 0) {
          // Time's up - player fails this round
          handleTimeUp();
          return { ...prev, timeLeft: INITIAL_TIME };
        }
        
        return { ...prev, timeLeft: newTimeLeft };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [gameState, gameData.buttonsDisabled, gameData.currNum]);

  // ===== Game Logic Handlers =====
  const handleTimeUp = useCallback(() => {
    const result = checkAnswer(gameData.currNum, false); // timeout counts as wrong
    handlePlayerFails(gameData.currNum, result.isPrime);
  }, [gameData.currNum]);

  const handleStart = useCallback(() => {
    const newGame = initializeGame();
    setGameData(newGame);
    setFeedback(null);
    setShowContinue(false);
    setIncorrectGuesses([]);
    setCorrectGuesses([]);
    setGameState('playing');
  }, []);

  const handleAnswer = useCallback((userSaidPrime: boolean) => {
    if (gameData.buttonsDisabled) return;
    
    const result = checkAnswer(gameData.currNum, userSaidPrime);
    
    if (result.correct) {
      handlePlayerPasses(gameData.currNum, result.isPrime);
    } else {
      handlePlayerFails(gameData.currNum, result.isPrime);
    }
  }, [gameData.currNum, gameData.buttonsDisabled]);

  const handlePlayerPasses = (num: number, isPrimeNum: boolean) => {
    const newBossHealth = gameData.bossHealth - 1;

    const newFeedback = generateFeedback(num, isPrimeNum, true);
    setFeedback(newFeedback);
    setCorrectGuesses(prev => [...prev, createCorrectGuess(num, isPrimeNum)]);

    setGameData(prev => ({
      ...prev,
      bossHealth: newBossHealth,
      timeLeft: INITIAL_TIME,
      buttonsDisabled: true,
    }));

    // Correct answers also pause on feedback and require Continue
    setShowContinue(true);
  };

  const handlePlayerFails = (num: number, isPrimeNum: boolean) => {
    const newUserHealth = gameData.userHealth - 1;
    const newFeedback = generateFeedback(num, isPrimeNum, false);
    setFeedback(newFeedback);
    setIncorrectGuesses(prev => [...prev, createIncorrectGuess(num, isPrimeNum)]);

    setGameData(prev => ({ 
      ...prev, 
      userHealth: newUserHealth,
      timeLeft: INITIAL_TIME,
      buttonsDisabled: true,
    }));

    // Incorrect answers pause on feedback and require Continue
    setShowContinue(true);
  };

  const handlePlayerWin = useCallback(() => {
    setGameState('won');
    saveGameState(gameState);
    saveGameData(gameData);
  }, [gameData, gameState]);

  const handlePlayerLose = useCallback(() => {
    setGameState('lost');
    saveGameState(gameState);
    saveGameData(gameData);
  }, [gameData, gameState]);

  const handleContinue = useCallback(() => {
    setShowContinue(false);

    // End-game happens after showing feedback page and clicking Continue
    if (gameData.userHealth <= 0) {
      handlePlayerLose();
      return;
    }

    if (gameData.bossHealth <= 0) {
      handlePlayerWin();
      return;
    }

    setFeedback(null);
    const next = getNextNumber(gameData);
    setGameData(prev => ({
      ...prev,
      currNum: next.num,
      currNumIndex: next.index,
      timeLeft: INITIAL_TIME,
      buttonsDisabled: false,
    }));
  }, [gameData]);

  // ===== Render =====
  return (
    <main className="min-h-screen h-screen overflow-auto bg-[url('/prime-background.png')] bg-cover bg-[center_70%] bg-no-repeat">
      {/* Conditional rendering based on game state */}
      {gameState === 'welcome' && (
        <WelcomeScreen onStart={handleStart} />
      )}

      {gameState === 'playing' && (
        <GameScreen 
          gameData={gameData}
          feedback={feedback}
          showContinue={showContinue}
          onAnswer={handleAnswer}
          onContinue={handleContinue}
        />
      )}

      {gameState === 'won' && (
        <EndGameScreen 
          message="You win!" 
          color="green" 
          onPlayAgain={handleStart}
          incorrectGuesses={incorrectGuesses}
          correctGuesses={correctGuesses}
        />
      )}

      {gameState === 'lost' && (
        <EndGameScreen 
          message="Game over!" 
          color="red" 
          onPlayAgain={handleStart}
          incorrectGuesses={incorrectGuesses}
          correctGuesses={correctGuesses}
        />
      )}

      {/* Back button - always visible */}
      <div className="flex justify-center mt-[2vh]">
        <GameButton 
          onClick={() => window.location.href = "/"} 
          variant="primary"
        >
          Back
        </GameButton>
      </div>
    </main>
  );
}
