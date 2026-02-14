type HeartsProps = {
    lives: number;
    maxLives?: number;
  };
  
  export function Hearts({ lives, maxLives = 3 }: HeartsProps) {
    return (
      <div style={{ position: "absolute", right: 16, display: "flex", gap: 8 }}>
        {Array.from({ length: maxLives }, (_, i) => (
          <span
            key={i}
            data-testid={`heart-${i}`}
            style={{ opacity: i < lives ? 1 : 0.3 }}
          >
            <img src="/heart.svg" alt="heart" style={{ width: "2rem", height: "2rem" }} />
          </span>
        ))}
      </div>
    );
  }
  