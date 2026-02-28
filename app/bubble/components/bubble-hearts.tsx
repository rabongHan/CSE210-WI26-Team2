type HeartsProps = {
  lives: number;
  maxLives?: number;
};

export function Hearts({ lives, maxLives = 3 }: HeartsProps) {
  return (
    <div className="absolute right-4 flex gap-2">
      {Array.from({ length: maxLives }, (_, i) => (
        <span
          key={i}
          data-testid={`heart-${i}`}
          className={i < lives ? "opacity-100" : "opacity-30"}
        >
          <img src="/heart.svg" alt="heart" className="w-8 h-8" />
        </span>
      ))}
    </div>
  );
}
  