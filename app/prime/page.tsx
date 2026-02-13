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
  startTimer();
  showGameContent();
  hidePlayerWin();
  hideGameOver();
  console.log(userHealth);
}

var clickYes = function() {
  console.log(userHealth);
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
    <main style={{ fontFamily: "system-ui", padding: 24 }}>
      <div className="welcome">Welcome to the prime testing minigame!</div>
      <button onClick={startGame}>Start</button>
      <div id="gameContent" style={{ display: "none" }}>
        <p>Is <span id="num">{currNum}</span> prime?</p>
        <button onClick={clickYes}>Yes</button>
        <button onClick={clickNo}>No</button>
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
