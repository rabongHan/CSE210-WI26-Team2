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

      <div style={{ color: '#111', textAlign: 'left', fontSize: 'clamp(14px, 1.2vw, 18px)', margin: '1.5vh 0' }}>
        <p style={{ fontWeight: 700, marginBottom: '0.5vh' }}>Correct Prime Guesses</p>
        <ul id="correctPrimeList" style={{ margin: '0 0 1vh 1.2rem' }}>
          {correctPrimes.length === 0 ? (
            <li>None</li>
          ) : (
            correctPrimes.map((guess, index) => (
              <li key={`correct-prime-${guess.num}-${index}`}>{guess.num} is prime</li>
            ))
          )}
        </ul>

        <p style={{ fontWeight: 700, marginBottom: '0.5vh' }}>Correct Composite Guesses</p>
        <ul id="correctCompositeList" style={{ margin: '0 0 1vh 1.2rem' }}>
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

        <p style={{ fontWeight: 700, marginBottom: '0.5vh' }}>Incorrect Prime Guesses</p>
        <ul id="incorrectPrimeList" style={{ margin: '0 0 1vh 1.2rem' }}>
          {incorrectPrimes.length === 0 ? (
            <li>None</li>
          ) : (
            incorrectPrimes.map((guess, index) => (
              <li key={`incorrect-prime-${guess.num}-${index}`}>{guess.num} is prime</li>
            ))
          )}
        </ul>

        <p style={{ fontWeight: 700, marginBottom: '0.5vh' }}>Incorrect Composite Guesses</p>
        <ul id="incorrectCompositeList" style={{ margin: '0 0 1vh 1.2rem' }}>
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
