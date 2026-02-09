"use client";

import { NavButton } from "@/app/bubble/components/bubble-buttons";

export default function Page() {
  return (
    <main
      style={{
        fontFamily: "'Comic Sans MS', 'Baloo 2', cursive, system-ui",
        backgroundImage: "url('/Underwater_background.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        padding: 24,
      }}
    >
      <h1
        style={{
          fontSize: "5rem",
          fontWeight: 900,
          color: "white",
          margin: 0,
          lineHeight: 1.1,
          textShadow: "2px 2px 8px rgba(0,0,0,0.3)",
        }}
      >
        WELCOME
      </h1>
      <h2
        style={{
          fontSize: "3.5rem",
          fontWeight: 900,
          color: "white",
          margin: "0 0 2rem 0",
          lineHeight: 1.1,
          textShadow: "2px 2px 8px rgba(0,0,0,0.3)",
        }}
      >
        TO THE WORLD OF ATLANTIS
      </h2>

      <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
        <NavButton href={"/bubble/game"}>
        START
        </NavButton>
        <NavButton href={"/"}>
        BACK
        </NavButton>
      </div>
    </main>
  );
}
