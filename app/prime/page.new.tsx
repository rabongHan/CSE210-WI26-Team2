"use client";

import { useEffect, useState, useCallback } from "react";
import { 
  initializeGame, 
  checkAnswer, 
  generateFeedback, 
  getNextNumber,
  INITIAL_TIME,
  MAX_BOSS_HEALTH,
  MAX_USER_HEALTH
} from "./lib/gameLogic";
import { isPrime } from "./lib/numberGenerator";
import { GameState, GameData, Feedback } from "./lib/types";
import WelcomeScreen from "./components/WelcomeScreen";
import GameScreen from "./components/GameScreen";
import EndGameScreen from "./components/EndGameScreen";
import GameButton from "./components/GameButton";

export default function Page() {
  // ===== React State Management =====
  const [gameState, setGameState] = useState<GameState>('welcome');
  const [gameData, setGameData] = useState<GameData>(() => initializeGame());
  const [feedback, setFeedback] = useState<Feedback | null>(null);
  const [showContinue, setShowContinue] = useState(false);

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
    
    const next = getNextNumber(gameData);
    setGameData(prev => ({
      ...prev,
      bossHealth: newBossHealth,
      currNum: next.num,
      currNumIndex: next.index,
      timeLeft: INITIAL_TIME,
    }));
    
    // Clear feedback after a short delay
    setTimeout(() => setFeedback(null), 2000);
  };

  const handlePlayerFails = (num: number, isPrimeNum: boolean) => {
    const newUserHealth = gameData.userHealth - 1;
    const newFeedback = generateFeedback(num, isPrimeNum, false);
    setFeedback(newFeedback);
    
    setGameData(prev => ({ 
      ...prev, 
      userHealth: newUserHealth,
      buttonsDisabled: true,
    }));
    setShowContinue(true);
  };

  const handleContinue = useCallback(() => {
    
    if (gameData.userHealth <= 0) {
      setGameState('lost');
    }
    else if (gameData.bossHealth <= 0) {
      setGameState('won');
    }
    else {
      setShowContinue(false);
      setFeedback(null);
      const next = getNextNumber(gameData);
      setGameData(prev => ({
        ...prev,
        currNum: next.num,
        currNumIndex: next.index,
        timeLeft: INITIAL_TIME,
        buttonsDisabled: false,
      }));
    }
  }, [gameData]);

  // ===== Render =====
  // ===== Render =====
  return (
    <main 
      className="min-h-screen h-screen overflow-auto"
      style={{
        backgroundImage: "url('/prime-background.png')",
        backgroundSize: "cover",
        backgroundPosition: "center 70%",
        backgroundRepeat: "no-repeat"
      }}
    >
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
        />
      )}

      {gameState === 'lost' && (
        <EndGameScreen 
          message="Game over!" 
          color="red" 
          onPlayAgain={handleStart} 
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
