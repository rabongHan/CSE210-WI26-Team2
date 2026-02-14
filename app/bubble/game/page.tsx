"use client";

import { Hearts } from "@/app/bubble/components/bubble-hearts";
import { BubbleCircle } from "@/app/bubble/components/bubble-circle";
import { NavButton } from "@/app/bubble/components/bubble-buttons";
import { BubbleGameProvider, useBubbleGame } from "@/app/bubble/lib/bubble-context";

// Wrap the page in the provider so useBubbleGame works
export default function Page() {
  return (
    <BubbleGameProvider>
      <GameScreen />
    </BubbleGameProvider>
  );
}

function GameScreen() {
  const { factor, bubbles, lives, status, handleBubbleClick, resetGame } =
    useBubbleGame();

  return (
    <main
      style={{
        fontFamily: "'Comic Sans MS', 'Baloo 2', cursive, system-ui",
        backgroundImage: "url('/Underwater_background.png')",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        position: "relative",
        padding: 24,
      }}
    >
      <Hearts lives={lives} />

      <div style={{ marginTop: "4rem", marginBottom: "4rem" }}>
        <p
          style={{
            color: "#8899AA",
            fontSize: "1.2rem",
            margin: 0,
          }}
        >
          Factor:
        </p>
        <h1
          style={{
            color: "white",
            fontSize: "5rem",
            fontWeight: 900,
            margin: 0,
          }}
        >
          {factor}
        </h1>
      </div>

      {/* Game over / win overlay */}
      {status !== "playing" && (
        <div
          style={{
            backgroundColor: "rgba(0, 0, 0, 0.7)",
            borderRadius: 16,
            padding: "2rem 3rem",
            marginBottom: "2rem",
            textAlign: "center",
          }}
        >
          <h2
            style={{
              color: status === "won" ? "#5BC0EB" : "#FF6B6B",
              fontSize: "2.5rem",
              fontWeight: 800,
              margin: "0 0 1rem 0",
            }}
          >
            {status === "won" ? "You Win! 🎉" : "Game Over 💔"}
          </h2>
          <button
            onClick={resetGame}
            style={{
              backgroundColor: "#FFB6C1",
              color: "black",
              fontSize: "1.2rem",
              fontWeight: 700,
              padding: "0.6rem 2rem",
              border: "none",
              borderRadius: "9999px",
              cursor: "pointer",
              fontFamily: "inherit",
            }}
          >
            PLAY AGAIN
          </button>
        </div>
      )}

      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: 20,
          maxWidth: 500,
          marginTop: "auto",
          marginBottom: "3rem",
        }}
      >
        {bubbles.map((num, i) => (
          <BubbleCircle
            key={i}
            number={num}
            onClick={() => handleBubbleClick(num)}
          />
        ))}
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        <NavButton href={"/bubble/menu"}>BACK</NavButton>
      </div>
    </main>
  );
}
