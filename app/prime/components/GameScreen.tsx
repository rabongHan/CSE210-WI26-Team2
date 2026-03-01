/**
 * Main game screen with question, buttons, feedback, and health bars
 */

import { GameData, Feedback } from '../lib/types';
import { MAX_USER_HEALTH, MAX_BOSS_HEALTH } from '../lib/gameLogic';
import HealthBar from './HealthBar';

interface GameScreenProps {
  gameData: GameData;
  feedback: Feedback | null;
  showContinue: boolean;
  onAnswer: (isPrime: boolean) => void;
  onContinue: () => void;
}

export default function GameScreen({ 
  gameData, 
  feedback, 
  showContinue, 
  onAnswer, 
  onContinue 
}: GameScreenProps) {
  return (
    <div style={{ paddingBottom: "2vh" }}>
      {/* Question */}
      <div 
        style={{
          maxWidth: "40%",
          margin: "2vh auto 1vh",
          padding: "1.5vh 3vw",
          backgroundColor: "rgba(128, 128, 128, 0.3)",
          border: "5px solid black",
          borderRadius: "12px",
          textAlign: "center",
          fontSize: "clamp(22px, 3vw, 36px)",
          fontWeight: "bold",
          fontFamily: "'Trebuchet MS', 'Verdana', 'Geneva', sans-serif"
        }}
      >
        Is <span id="num">{gameData.currNum}</span> prime?
      </div>

      {/* Answer Buttons */}
      <div style={{ display: "flex", justifyContent: "center", gap: "2vw", marginTop: "2vh" }}>
        <button
          id="yesButton"
          onClick={() => onAnswer(true)} 
          disabled={gameData.buttonsDisabled}
          style={{
            backgroundColor: "#7dd3fc",
            color: "#0f172a",
            border: "3px solid #0f172a",
            borderRadius: "999px",
            padding: "2% 4%",
            fontSize: "clamp(18px, 2vw, 28px)",
            fontWeight: 700,
            fontFamily: "'Trebuchet MS', 'Verdana', 'Geneva', sans-serif",
            cursor: gameData.buttonsDisabled ? "not-allowed" : "pointer",
            opacity: gameData.buttonsDisabled ? 0.5 : 1,
            boxShadow: gameData.buttonsDisabled ? 'none' : "0 6px 0 #0f172a",
          }}
        >
          Yes
        </button>
        <button
          id="noButton"
          onClick={() => onAnswer(false)} 
          disabled={gameData.buttonsDisabled}
          style={{
            backgroundColor: "#fda4af",
            color: "#0f172a",
            border: "3px solid #0f172a",
            borderRadius: "999px",
            padding: "2% 4%",
            fontSize: "clamp(18px, 2vw, 28px)",
            fontWeight: 700,
            fontFamily: "'Trebuchet MS', 'Verdana', 'Geneva', sans-serif",
            cursor: gameData.buttonsDisabled ? "not-allowed" : "pointer",
            opacity: gameData.buttonsDisabled ? 0.5 : 1,
            boxShadow: gameData.buttonsDisabled ? 'none' : "0 6px 0 #0f172a",
          }}
        >
          No
        </button>
      </div>

      {/* Feedback Section */}
      <div style={{ textAlign: "center", marginTop: "1vh", fontSize: "clamp(16px, 1.5vw, 24px)", minHeight: "80px" }}>
        <p id="correct" style={{ color: feedback?.isCorrect ? "green" : "red", minHeight: "20px" }}>
          {feedback?.correctText || ""}
        </p>
        <p id="feedback" style={{ display: feedback ? "block" : "none", minHeight: "20px" }}>
          {feedback?.factorization || ""}
        </p>
        <p id="divisibilityFeedback" style={{ display: feedback?.divisibility ? "block" : "none", minHeight: "40px" }}>
          {feedback?.divisibility || ""}
        </p>
        <p>Time left: <span id="timer">{gameData.timeLeft}</span> sec</p>
      </div>

      {/* Continue Button */}
      <div style={{ display: "flex", justifyContent: "center", marginTop: "1vh" }}>
        <button
          id="continueButton"
          onClick={onContinue}
          style={{
            display: showContinue ? "block" : "none",
            backgroundColor: "#4ade80",
            color: "#0f172a",
            border: "3px solid #0f172a",
            borderRadius: "999px",
            padding: "1.5% 3.5%",
            fontSize: "clamp(18px, 2vw, 28px)",
            fontWeight: 700,
            fontFamily: "'Trebuchet MS', 'Verdana', 'Geneva', sans-serif",
            boxShadow: "0 6px 0 #0f172a",
            cursor: "pointer"
          }}
        >
          Continue
        </button>
      </div>

      {/* Health Bars */}
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "2vh", marginTop: "1vh" }}>
        <HealthBar 
          label="Boss Health" 
          current={gameData.bossHealth} 
          max={MAX_BOSS_HEALTH}
        />
        <HealthBar 
          label="User Health" 
          current={gameData.userHealth} 
          max={MAX_USER_HEALTH}
        />
      </div>
    </div>
  );
}
