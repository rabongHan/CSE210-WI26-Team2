/**
 * End game screen shown when player wins or loses
 */

interface EndGameScreenProps {
  message: string;
  color: 'green' | 'red';
  onPlayAgain: () => void;
}

export default function EndGameScreen({ message, color, onPlayAgain }: EndGameScreenProps) {
  return (
    <div 
      id={color === 'green' ? "winMsg" : "loseMsg"}
      style={{ 
        maxWidth: "40%",
        margin: "10vh auto 0",
        padding: "1.5vh 3vw",
        backgroundColor: "rgba(128, 128, 128, 0.3)",
        border: "5px solid black",
        borderRadius: "12px",
        display: "block",
        textAlign: "center",
        fontSize: "clamp(30%, 3vw, 50px)",
        color: color
      }}
    >
      <p>{message}</p>
      <button onClick={onPlayAgain} style={{
        backgroundColor: "#f7c948",
        color: "#111",
        border: "3px solid #111",
        borderRadius: "999px",
        textAlign: "center",
        padding: "2% 4%",
        fontSize: "clamp(20%, 2vw, 35px)",
        fontWeight: 700,
        fontFamily: "'Trebuchet MS', 'Verdana', 'Geneva', sans-serif",
        boxShadow: "0 6px 0 #111",
        cursor: "pointer"
      }}>Play again</button>
    </div>
  );
}
