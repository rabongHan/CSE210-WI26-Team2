"use client";

import { Target } from "lucide-react";
import { useEffect, useState } from "react";
import next from "next";
import { startGame, clickYes, clickNo, continueGame } from "./lib/gameLogic";
import { currNum, userHealth, bossHealth, maxUserHealth, maxBossHealth } from "./lib/gameLogic";

// moved to gameLogic.tsx

export default function Page() {
  const [now, setNow] = useState("");

  useEffect(() => setNow(new Date().toISOString()), []);

  return (
    <main
      className="min-h-screen"
      style={{
        fontFamily: "system-ui",
        minHeight: "120vh",
        paddingTop: 1,
        backgroundImage: "url('/prime-background.png')",
        backgroundSize: "100% auto",
        backgroundPosition: "top center",
        backgroundRepeat: "no-repeat"
      }}
    >
      <div
        id="welcomeBox"
        className="welcome"
        style={{
          maxWidth: "40%",
          margin: "20% auto 0",
          padding: "2vh 3vw",
          backgroundColor: "rgba(128, 128, 128, 0.3)",
          border: "5px solid black",
          borderRadius: "12px",
          textAlign: "center",
          fontSize: "clamp(30%, 3vw, 50px)",
          fontWeight: "bold",
          fontFamily: "'Trebuchet MS', 'Verdana', 'Geneva', sans-serif"
        }}
      >
        Welcome to the prime testing minigame!
      </div>
      <div
        id="startButtonWrap"
        style={{ display: "flex", justifyContent: "center", marginTop: "2vh" }}
      >
        <button
          onClick={startGame}
          style={{
            backgroundColor: "#f7c948",
            color: "#111",
            border: "3px solid #111",
            borderRadius: "999px",
            padding: "2% 4%",
            fontSize: "clamp(20%, 2vw, 35px)",
            fontWeight: 700,
            fontFamily: "'Trebuchet MS', 'Verdana', 'Geneva', sans-serif",
            boxShadow: "0 6px 0 #111",
            cursor: "pointer"
          }}
        >
          Start
        </button>
      </div>
      <div id="gameContent" style={{ display: "none" }}>
        <div
          style={{
            maxWidth: "40%",
            margin: "12vh auto 0",
            padding: "2vh 3vw",
            backgroundColor: "rgba(128, 128, 128, 0.3)",
            border: "5px solid black",
            borderRadius: "12px",
            textAlign: "center",
            fontSize: "clamp(22px, 3vw, 36px)",
            fontWeight: "bold",
            fontFamily: "'Trebuchet MS', 'Verdana', 'Geneva', sans-serif"
          }}
        >
          Is <span id="num">{currNum}</span> prime?
        </div>
        <div style={{ display: "flex", justifyContent: "center", gap: "2vw", marginTop: "2vh" }}>
          <button
            id="yesButton"
            onClick={clickYes}
            style={{
              backgroundColor: "#7dd3fc",
              color: "#0f172a",
              border: "3px solid #0f172a",
              borderRadius: "999px",
              padding: "2% 4%",
              fontSize: "clamp(18px, 2vw, 28px)",
              fontWeight: 700,
              fontFamily: "'Trebuchet MS', 'Verdana', 'Geneva', sans-serif",
              boxShadow: "0 6px 0 #0f172a",
              cursor: "pointer"
            }}
          >
            Yes
          </button>
          <button
            id="noButton"
            onClick={clickNo}
            style={{
              backgroundColor: "#fda4af",
              color: "#0f172a",
              border: "3px solid #0f172a",
              borderRadius: "999px",
              padding: "2% 4%",
              fontSize: "clamp(18px, 2vw, 28px)",
              fontWeight: 700,
              fontFamily: "'Trebuchet MS', 'Verdana', 'Geneva', sans-serif",
              boxShadow: "0 6px 0 #0f172a",
              cursor: "pointer"
            }}
          >
            No
          </button>
        </div>
        <div style={{ textAlign: "center", marginTop: "2vh", fontSize: "clamp(16px, 1.5vw, 24px)", minHeight: "180px" }}>
          <p id="correct" style={{ color: "green", minHeight: "24px" }}></p>
          <p id="feedback" style={{ display: "none", minHeight: "24px" }}>Feedback will appear here.</p>
          <p id="divisibilityFeedback" style={{ display: "none", minHeight: "60px" }}>Divisibility feedback will appear here.</p>
          <p>Time left: <span id="timer">10</span> sec</p>
        </div>
        <div style={{ display: "flex", justifyContent: "center", marginTop: "1vh" }}>
          <button
            id="continueButton"
            onClick={continueGame}
            style={{
              display: "none",
              backgroundColor: "#4ade80",
              color: "#0f172a",
              border: "3px solid #0f172a",
              borderRadius: "999px",
              padding: "1.5% 3.5%",
              fontSize: "clamp(18px, 2vw, 28px)",
              fontWeight: 700,
              fontFamily: "'Trebuchet MS', 'Verdana', 'Geneva', sans-serif",
              boxShadow: "0 6px 0 #0f172a",
              cursor: "pointer"
            }}
          >
            Continue
          </button>
        </div>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "2vh", marginTop: "1vh" }}>
          <div style={{ width: "300px" }}>
            <p style={{ marginBottom: "0.5vh", fontWeight: "bold", textAlign: "center" }}>Boss Health: <span id="bossHealthText">{bossHealth}/{maxBossHealth}</span></p>
            <div style={{ width: "100%", height: "30px", backgroundColor: "#ddd", border: "2px solid #000", borderRadius: "8px", overflow: "hidden" }}>
              <div id="bossHealthBar" style={{ height: "100%", width: "100%", backgroundColor: "red", transition: "width 0.3s ease" }}></div>
            </div>
          </div>
          <div style={{ width: "300px" }}>
            <p style={{ marginBottom: "0.5vh", fontWeight: "bold", textAlign: "center" }}>User Health: <span id="userHealthText">{userHealth}/{maxUserHealth}</span></p>
            <div style={{ width: "100%", height: "30px", backgroundColor: "#ddd", border: "2px solid #000", borderRadius: "8px", overflow: "hidden" }}>
              <div id="userHealthBar" style={{ height: "100%", width: "100%", backgroundColor: "red", transition: "width 0.3s ease" }}></div>
            </div>
          </div>
        </div>
      </div>
      <div id="winMsg" style={{ maxWidth: "40%",
          margin: "20% auto 0",
          padding: "2vh 3vw",
          backgroundColor: "rgba(128, 128, 128, 0.3)",
          border: "5px solid black",
          borderRadius: "12px",
          display: "none",
          textAlign: "center",
          fontSize: "clamp(30%, 3vw, 50px)",
          color: "green" }}>
        <p>You win!</p>
        <button onClick={startGame} style={{
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
      <div id="loseMsg" style={{ maxWidth: "40%",
          margin: "20% auto 0",
          padding: "2vh 3vw",
          backgroundColor: "rgba(128, 128, 128, 0.3)",
          border: "5px solid black",
          borderRadius: "12px",
          display: "none",
          textAlign: "center",
          fontSize: "clamp(30%, 3vw, 50px)",
          color: "red" }}>
        <p>Game over!</p>
        <button onClick={startGame} style={{
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
      <div
        id="homeButtonWrap"
        style={{ display: "flex", justifyContent: "center", marginTop: "2vh" }}
      >
        <button onClick={() => window.location.href = "/"} style={{
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
        }}>Back</button>
      </div>
    </main>
  );
}
