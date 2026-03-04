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
      <div className="max-w-[40%] mt-[5vh] mx-auto mb-[1vh] py-[1.5vh] px-[3vw] bg-gray-500/30 border-[5px] border-black rounded-xl text-center text-[clamp(30%,3vw,50px)] font-bold font-sans">
        Welcome to the prime testing minigame!
      </div>
      <div className="flex justify-center mt-[2vh]">
        <GameButton onClick={onStart} variant="primary">
          Start
        </GameButton>
      </div>
    </>
  );
}
