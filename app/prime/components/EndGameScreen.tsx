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
  continueBtn?: boolean; // Optional prop to conditionally show the Continue button
  onContinue?: () => void; // Optional prop for the Continue button's click handler
}

export default function EndGameScreen({ message, color, onPlayAgain, incorrectGuesses, correctGuesses, continueBtn, onContinue }: EndGameScreenProps) {
  const { primeGuesses: incorrectPrimes, compositeGuesses: incorrectComposites } = splitIncorrectGuesses(incorrectGuesses);
  const { primeGuesses: correctPrimes, compositeGuesses: correctComposites } = splitCorrectGuesses(correctGuesses);

  return (
    <div 
      id={color === 'green' ? "winMsg" : "loseMsg"}
      className={`max-w-[60%] my-[5vh] mx-auto py-[2vh] px-[3vw] bg-gray-500/30 border-[5px] border-black rounded-xl flex flex-col gap-3 text-center font-sans ${color === 'green' ? 'text-green-500' : 'text-red-500'} min-h-[70vh]`}
    >
      <p className="text-[clamp(40px,4vw,60px)] font-bold mb-[1.5vh]">{message}</p>

      <div className="flex-1 max-h-[50vh] overflow-y-auto overflow-x-hidden text-gray-900 text-left py-[1vh] px-[1.5vw] mb-[1.5vh] border-2 border-gray-700 rounded-lg bg-white/50">
      <p className="font-bold mb-[0.8vh] text-[clamp(18px,1.5vw,24px)]">Correct Prime Guesses</p>
      <ul id="correctPrimeList" className="mb-[1.5vh] ml-6 text-[clamp(16px,1.3vw,20px)] leading-relaxed">
        {correctPrimes.length === 0 ? (
        <li>None</li>
        ) : (
        correctPrimes.map((guess, index) => (
          <li key={`correct-prime-${guess.num}-${index}`}>{guess.num} is prime</li>
        ))
        )}
      </ul>

      <p className="font-bold mb-[0.8vh] text-[clamp(18px,1.5vw,24px)]">Correct Composite Guesses</p>
      <ul id="correctCompositeList" className="mb-[1.5vh] ml-6 text-[clamp(16px,1.3vw,20px)] leading-relaxed">
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

      <p className="font-bold mb-[0.8vh] text-[clamp(18px,1.5vw,24px)]">Incorrect Prime Guesses</p>
      <ul id="incorrectPrimeList" className="mb-[1.5vh] ml-6 text-[clamp(16px,1.3vw,20px)] leading-relaxed">
        {incorrectPrimes.length === 0 ? (
        <li>None</li>
        ) : (
        incorrectPrimes.map((guess, index) => (
          <li key={`incorrect-prime-${guess.num}-${index}`}>{guess.num} is prime</li>
        ))
        )}
      </ul>

      <p className="font-bold mb-[0.8vh] text-[clamp(18px,1.5vw,24px)]">Incorrect Composite Guesses</p>
      <ul id="incorrectCompositeList" className="ml-6 text-[clamp(16px,1.3vw,20px)] leading-relaxed">
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

      <button 
      onClick={onPlayAgain}
      className="bg-[#f7c948] text-gray-900 border-[3px] border-gray-900 rounded-full text-center py-[2%] px-[4%] text-[clamp(20%,2vw,35px)] font-bold font-sans shadow-[0_6px_0_#111] cursor-pointer"
      >
      Play again
      </button>

      {/* Conditionally render the Continue button if continueBtn prop is true */}
      {continueBtn && (
      <button
        onClick={onContinue}
        className="bg-[#f7c948] text-gray-900 border-[3px] border-gray-900 rounded-full text-center py-[2%] px-[4%] text-[clamp(20%,2vw,35px)] font-bold font-sans shadow-[0_6px_0_#111] cursor-pointer"
      >
        Continue
      </button>
      )}
    </div>
  );
}
