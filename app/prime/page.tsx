"use client";

import { Target } from "lucide-react";
import { useEffect, useState } from "react";
import { generateBalancedNumbers, isPrime } from "./lib/numberGenerator";
import next from "next";
import { primeMnemonic, compositeMnemonic, factorizationMessage } from "./lib/factorCheck";

var maxGuesses = 25;
var numList;
var currNumInd;
var currNum;
var userHealth;
var bossHealth;
var timerInterval;
var timeLeft;

function startGame() {
  numList = generateBalancedNumbers(100, 300, maxGuesses, {});
  currNumInd = 0; // the index into the num list
  currNum = numList.numbers[currNumInd];
  document.getElementById("num").textContent = currNum;
  userHealth = 5;
  document.getElementById("userHealth").textContent = userHealth;
  bossHealth = 20;
  document.getElementById("bossHealth").textContent = bossHealth;
  document.getElementById("welcomeBox").style.display = "none";
  document.getElementById("startButtonWrap").style.display = "none";
  startTimer();
  showGameContent();
  hidePlayerWin();
  hideGameOver();
}

var clickYes = function() {
  var nIsPrime = isPrime(currNum);
  var correct = nIsPrime;
  if (correct) {
    playerPasses(currNum, nIsPrime);
  }
  else {
    playerFails(currNum, nIsPrime);
  }
}
var clickNo = function() {
  var nIsPrime = isPrime(currNum);
  var correct = !nIsPrime;
  if (correct) {
    playerPasses(currNum, nIsPrime);
  }
  else {
    playerFails(currNum, nIsPrime);
  }
}

// Functions for when the player guesses correctly or incorrectly.
// These include the code for moving to the next number or ending the game.
var playerPasses = function(currNum, nIsPrime) {
  bossHealth -= 1;
  document.getElementById("bossHealth").textContent = bossHealth;
  if (bossHealth === 0) {
    playerWin();
  }
  else {
    giveFeedback(currNum, nIsPrime, true);
    nextNumber();
  }
}

var playerFails = function(currNum, nIsPrime) {
  userHealth -= 1;
  document.getElementById("userHealth").textContent = userHealth;
  if (userHealth === 0) {
    gameOver();
  }
  else {
    giveFeedback(currNum, nIsPrime, false);
    nextNumber();
  }
}

var giveFeedback = function(n, nIsPrime, correct) {
  document.getElementById("correct").textContent = correct ? "Correct!" : "Incorrect!";
  document.getElementById("feedback").style.display = "block";
  document.getElementById("feedback").textContent = factorizationMessage(n);
  if (!correct) { // only display the mnemonic if the user is wrong
    document.getElementById("divisibilityFeedback").style.display = "block";
    document.getElementById("divisibilityFeedback").textContent = nIsPrime ? primeMnemonic(n) : compositeMnemonic(n);
  }
  else {
    document.getElementById("divisibilityFeedback").style.display = "none";
  }
}

var showGameContent = function() {
  document.getElementById("gameContent").style.display = "block";
}
var hideGameContent = function() {
  document.getElementById("gameContent").style.display = "none";
}
var playerWin = function() {
  showPlayerWin();
  hideGameContent();
}
var gameOver = function() {
  showGameOver();
  hideGameContent();
}
var showPlayerWin = function() {
  document.getElementById("winMsg").style.display = "block";
}
var showGameOver = function() {
  document.getElementById("loseMsg").style.display = "block";
}
var hidePlayerWin = function() {
  document.getElementById("winMsg").style.display = "none";
}
var hideGameOver = function() {
  document.getElementById("loseMsg").style.display = "none";
}
var nextNumber = function() {
  if (currNumInd < maxGuesses - 1) {
    currNumInd += 1;
  }
  currNum = numList.numbers[currNumInd];
  document.getElementById("num").textContent = currNum;
  startTimer();
}

var startTimer = function() {
  // initialize and start a 10-second countdown; when it hits 0 advance the number
  if (typeof timerInterval !== 'undefined') clearInterval(timerInterval);
  timeLeft = 10;
  const el = document.getElementById('timer');
  if (el) el.textContent = String(timeLeft);
  timerInterval = setInterval(() => {
    timeLeft -= 1;
    const t = document.getElementById('timer');
    if (t) t.textContent = String(timeLeft);
    if (timeLeft <= 0) {
      clearInterval(timerInterval);
      // time's up, which means the user lost this round
      resetTimer();
      playerFails(currNum, isPrime(currNum));
    }
  }, 1000);
}

var resetTimer = function() {
  timeLeft = 10;
  const el = document.getElementById('timer');
  if (el) el.textContent = String(timeLeft);
}

var stopTimer = function() {
  if (typeof timerInterval !== 'undefined') {
    clearInterval(timerInterval);
  }
}
// ...

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
        <p id="correct"></p>
        <p id="feedback" style={{ display: "none" }}>Feedback will appear here.</p>
        <p id="divisibilityFeedback" style={{ display: "none" }}>Divisibility feedback will appear here.</p>
        <p>Time left: <span id="timer">10</span> sec</p>
        <p>User health: <span id="userHealth">{userHealth}</span></p>
        <p>Boss health: <span id="bossHealth">{bossHealth}</span></p>
      </div>
      <div id="winMsg" style={{ display: "none" }}>
        <p>You win!</p>
      </div>
      <div id="loseMsg" style={{ display: "none" }}>
        <p>Game over!</p>
      </div>
    </main>
  );
}
