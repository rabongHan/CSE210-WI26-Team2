import { useEffect, useState } from "react";

type BubbleCircleProps = {
  number: number;
  color?: string;
  onClick?: () => void;
  isWrong?: boolean;
};

export function BubbleCircle({ number, color = "#5BC0EB", onClick, isWrong = false }: BubbleCircleProps) {
  const [shaking, setShaking] = useState(false);

  useEffect(() => {
    if (isWrong) {
      setShaking(true);
      const timer = setTimeout(() => setShaking(false), 500);
      return () => clearTimeout(timer);
    } else {
      setShaking(false);
    }
  }, [isWrong]);

  return (
    <>
      <style>{`
        @keyframes wrong-shake {
          0%, 100% { transform: translateX(0); }
          20%       { transform: translateX(-6px); }
          40%       { transform: translateX(6px); }
          60%       { transform: translateX(-4px); }
          80%       { transform: translateX(4px); }
        }
        .bubble-shake {
          animation: wrong-shake 0.5s ease-in-out;
        }
      `}</style>

      <button
        className={`cursor-target w-[100px] h-[100px] rounded-full border-none
          cursor-pointer flex items-center justify-center text-3xl font-bold
          text-white font-inherit transition-transform duration-150 ease-in-out
          hover:scale-110 ${shaking ? "bubble-shake" : ""}`}
        style={{ backgroundColor: shaking && isWrong ? "#E84855" : color }}
        onClick={onClick}
      >
        {number}
      </button>
    </>
  );
}