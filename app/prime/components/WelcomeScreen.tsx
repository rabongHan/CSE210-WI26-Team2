/**
 * Welcome screen shown when the game starts
 */

import GameButton from './GameButton';

interface WelcomeScreenProps {
  onStart: () => void;
}

export default function WelcomeScreen({ onStart }: WelcomeScreenProps) {
  return (
    <>
      <div 
        style={{
          maxWidth: "40%",
          margin: "5vh auto 1vh",
          padding: "1.5vh 3vw",
          backgroundColor: "rgba(128, 128, 128, 0.3)",
          border: "5px solid black",
          borderRadius: "12px",
          textAlign: "center",
          fontSize: "clamp(30%, 3vw, 50px)",
          fontWeight: "bold",
          fontFamily: "'Trebuchet MS', 'Verdana', 'Geneva', sans-serif"
        }}
      >
        Welcome to the prime testing minigame!
      </div>
      <div style={{ display: "flex", justifyContent: "center", marginTop: "2vh" }}>
        <GameButton onClick={onStart} variant="primary">
          Start
        </GameButton>
      </div>
    </>
  );
}
