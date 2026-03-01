/**
 * End game screen shown when player wins or loses
 */

import { splitIncorrectGuesses, splitCorrectGuesses } from '../lib/gameLogic';
import { IncorrectGuess, CorrectGuess } from '../lib/types';

interface EndGameScreenProps {
  message: string;
  color: 'green' | 'red';
  onPlayAgain: () => void;
  incorrectGuesses: IncorrectGuess[];
  correctGuesses: CorrectGuess[];
}

export default function EndGameScreen({ message, color, onPlayAgain, incorrectGuesses, correctGuesses }: EndGameScreenProps) {
  const { primeGuesses: incorrectPrimes, compositeGuesses: incorrectComposites } = splitIncorrectGuesses(incorrectGuesses);
  const { primeGuesses: correctPrimes, compositeGuesses: correctComposites } = splitCorrectGuesses(correctGuesses);

  return (
    <div 
      id={color === 'green' ? "winMsg" : "loseMsg"}
      style={{ 
        maxWidth: "60%",
        margin: "5vh auto",
        padding: "2vh 3vw",
        backgroundColor: "rgba(128, 128, 128, 0.3)",
        border: "5px solid black",
        borderRadius: "12px",
        display: "flex",
        flexDirection: "column",
        textAlign: "center",
        color: color,
        fontFamily: "'Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', sans-serif",
      }}
    >
      <p style={{ fontSize: "clamp(40px, 4vw, 60px)", fontWeight: 700, margin: "0 0 1.5vh 0" }}>{message}</p>

      <div style={{ 
        flex: 1,
        maxHeight: "50vh",
        overflowY: "auto",
        overflowX: "hidden",
        color: '#111',
        textAlign: 'left',
        padding: "1vh 1.5vw",
        marginBottom: "1.5vh",
        border: "2px solid #333",
        borderRadius: "8px",
        backgroundColor: "rgba(255, 255, 255, 0.5)",
      }}>
        <p style={{ fontWeight: 700, marginBottom: '0.8vh', fontSize: 'clamp(18px, 1.5vw, 24px)' }}>Correct Prime Guesses</p>
        <ul id="correctPrimeList" style={{ margin: '0 0 1.5vh 1.5rem', fontSize: 'clamp(16px, 1.3vw, 20px)', lineHeight: '1.6' }}>
          {correctPrimes.length === 0 ? (
            <li>None</li>
          ) : (
            correctPrimes.map((guess, index) => (
              <li key={`correct-prime-${guess.num}-${index}`}>{guess.num} is prime</li>
            ))
          )}
        </ul>

        <p style={{ fontWeight: 700, marginBottom: '0.8vh', fontSize: 'clamp(18px, 1.5vw, 24px)' }}>Correct Composite Guesses</p>
        <ul id="correctCompositeList" style={{ margin: '0 0 1.5vh 1.5rem', fontSize: 'clamp(16px, 1.3vw, 20px)', lineHeight: '1.6' }}>
          {correctComposites.length === 0 ? (
            <li>None</li>
          ) : (
            correctComposites.map((guess, index) => (
              <li key={`correct-composite-${guess.num}-${index}`}>
                {guess.num}: {guess.compositeRule === -1 ? 'perfect square' : `rule ${guess.compositeRule}`}
              </li>
            ))
          )}
        </ul>

        <p style={{ fontWeight: 700, marginBottom: '0.8vh', fontSize: 'clamp(18px, 1.5vw, 24px)' }}>Incorrect Prime Guesses</p>
        <ul id="incorrectPrimeList" style={{ margin: '0 0 1.5vh 1.5rem', fontSize: 'clamp(16px, 1.3vw, 20px)', lineHeight: '1.6' }}>
          {incorrectPrimes.length === 0 ? (
            <li>None</li>
          ) : (
            incorrectPrimes.map((guess, index) => (
              <li key={`incorrect-prime-${guess.num}-${index}`}>{guess.num} is prime</li>
            ))
          )}
        </ul>

        <p style={{ fontWeight: 700, marginBottom: '0.8vh', fontSize: 'clamp(18px, 1.5vw, 24px)' }}>Incorrect Composite Guesses</p>
        <ul id="incorrectCompositeList" style={{ margin: '0 0 0 1.5rem', fontSize: 'clamp(16px, 1.3vw, 20px)', lineHeight: '1.6' }}>
          {incorrectComposites.length === 0 ? (
            <li>None</li>
          ) : (
            incorrectComposites.map((guess, index) => (
              <li key={`incorrect-composite-${guess.num}-${index}`}>
                {guess.num}: {guess.compositeRule === -1 ? 'perfect square' : `rule ${guess.compositeRule}`}
              </li>
            ))
          )}
        </ul>
      </div>

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
