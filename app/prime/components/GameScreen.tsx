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
    <div className="pb-[2vh]">
      {/* Question */}
      <div className="max-w-[40%] mt-[2vh] mx-auto mb-[1vh] py-[1.5vh] px-[3vw] bg-gray-500/30 border-[5px] border-black rounded-xl text-center text-[clamp(22px,3vw,36px)] font-bold font-sans">
        Is <span id="num">{gameData.currNum}</span> prime?
      </div>

      {/* Answer Buttons */}
      <div className="flex justify-center gap-[2vw] mt-[2vh]">
        <button
          id="yesButton"
          onClick={() => onAnswer(true)} 
          disabled={gameData.buttonsDisabled}
          className="bg-sky-300 text-slate-900 border-[3px] border-slate-900 rounded-full py-[2%] px-[4%] text-[clamp(18px,2vw,28px)] font-bold font-sans cursor-pointer disabled:cursor-not-allowed disabled:opacity-50 disabled:shadow-none shadow-[0_6px_0_#0f172a]"
        >
          Yes
        </button>
        <button
          id="noButton"
          onClick={() => onAnswer(false)} 
          disabled={gameData.buttonsDisabled}
          className="bg-rose-300 text-slate-900 border-[3px] border-slate-900 rounded-full py-[2%] px-[4%] text-[clamp(18px,2vw,28px)] font-bold font-sans cursor-pointer disabled:cursor-not-allowed disabled:opacity-50 disabled:shadow-none shadow-[0_6px_0_#0f172a]"
        >
          No
        </button>
      </div>

      {/* Feedback Section */}
      <div className="text-center mt-[1vh] text-[clamp(16px,1.5vw,24px)] min-h-[80px]">
        <p id="correct" className={`min-h-[20px] ${feedback?.isCorrect ? 'text-green-500' : 'text-red-500'}`}>
          {feedback?.correctText || ""}
        </p>
        <p id="feedback" className={`min-h-[20px] ${feedback ? 'block' : 'hidden'}`}>
          {feedback?.factorization || ""}
        </p>
        <p id="divisibilityFeedback" className={`min-h-[40px] ${feedback?.divisibility ? 'block' : 'hidden'}`}>
          {feedback?.divisibility || ""}
        </p>
        <p>Time left: <span id="timer">{gameData.timeLeft}</span> sec</p>
      </div>

      {/* Continue Button */}
      <div className="flex justify-center mt-[1vh]">
        <button
          id="continueButton"
          onClick={onContinue}
          className={`${showContinue ? 'block' : 'hidden'} bg-green-400 text-slate-900 border-[3px] border-slate-900 rounded-full py-[1.5%] px-[3.5%] text-[clamp(18px,2vw,28px)] font-bold font-sans shadow-[0_6px_0_#0f172a] cursor-pointer`}
        >
          Continue
        </button>
      </div>

      {/* Health Bars */}
      <div className="flex flex-col items-center gap-[2vh] mt-[1vh]">
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
