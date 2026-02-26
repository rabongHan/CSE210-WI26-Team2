import { useEffect, useRef, useState } from "react";

type HeartsProps = {
  lives: number;
  maxLives?: number;
};

export function Hearts({ lives, maxLives = 3 }: HeartsProps) {
  const prevLivesRef = useRef(lives);
  const [poppingHeart, setPoppingHeart] = useState<number | null>(null);
  const [shakingHeart, setShakingHeart] = useState<number | null>(null);

  useEffect(() => {
    const prevLives = prevLivesRef.current;

    if (lives < prevLives) {
      // A life was just lost — pop that heart
      setPoppingHeart(prevLives - 1);
      setTimeout(() => setPoppingHeart(null), 500);
    }

    if (lives === 1) {
      // About to lose — shake the last heart constantly
      setShakingHeart(0);
    } else {
      // Stop shaking when lives are not 1
      setShakingHeart(null);
    }

    prevLivesRef.current = lives;
  }, [lives]);

  return (
    <>
      <style>{`
        @keyframes pop-burst {
          0%   { transform: scale(1);   opacity: 1; }
          30%  { transform: scale(1.6); opacity: 0.8; }
          60%  { transform: scale(0.4); opacity: 0.4; }
          100% { transform: scale(0);   opacity: 0; }
        }
        @keyframes danger-shake {
          0%, 100% { transform: translateX(0) rotate(0deg); }
          15%       { transform: translateX(-4px) rotate(-8deg); }
          30%       { transform: translateX(4px)  rotate(8deg); }
          45%       { transform: translateX(-4px) rotate(-6deg); }
          60%       { transform: translateX(4px)  rotate(6deg); }
          75%       { transform: translateX(-2px) rotate(-3deg); }
          90%       { transform: translateX(2px)  rotate(3deg); }
        }
        .heart-pop {
          animation: pop-burst 0.5s ease-out forwards;
        }
        .heart-shake {
          animation: danger-shake 0.6s ease-in-out infinite;
        }
      `}</style>

      <div className="absolute right-4 flex gap-2">
        {Array.from({ length: maxLives }, (_, i) => {
          const isActive = i < lives;
          const isPopping = poppingHeart === i;
          const isShaking = shakingHeart === i && isActive;

          return (
            <span
              key={i}
              data-testid={`heart-${i}`}
              className={`
                ${isActive ? "opacity-100" : "opacity-30"}
                ${isPopping ? "heart-pop" : ""}
                ${isShaking ? "heart-shake" : ""}
              `}
            >
              <img src="/heart.svg" alt="heart" className="w-8 h-8" />
            </span>
          );
        })}
      </div>
    </>
  );
}
