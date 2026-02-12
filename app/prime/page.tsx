"use client";

import { Target } from "lucide-react";
import { useEffect, useState } from "react";
import { generateBalancedNumbers, isPrime } from "./lib/numberGenerator";

var maxGuesses = 25;
var numList;
var currNumInd;
var currNum;
var userHealth;
var bossHealth;

function startGame() {
  numList = generateBalancedNumbers(100, 300, maxGuesses, {});
  currNumInd = 0; // the index into the num list
  currNum = numList.numbers[currNumInd];
  document.getElementById("num").textContent = currNum;
  userHealth = 5;
  document.getElementById("userHealth").textContent = userHealth;
  bossHealth = 20;
  document.getElementById("bossHealth").textContent = bossHealth;
  showGameContent();
  hidePlayerWin();
  hideGameOver();
  console.log(userHealth);
}

var clickYes = function() {
  console.log(userHealth);
  if (isPrime(currNum)) {
    giveFeedback(currNum, true, true);
  }
  else {
    giveFeedback(currNum, false, false);
  }
}
var clickNo = function() {
  if (isPrime(currNum)) {
    giveFeedback(currNum, true, false);
  }
  else {
    giveFeedback(currNum, false, true);
  }
}
var giveFeedback = function(n, nIsPrime, correct) {
  var message = "";
  message += (correct ? "Yes" : "No");
  message += ", it's ";
  message += (nIsPrime ? "prime" : "composite");
  document.getElementById("feedback").textContent = message;
  if (correct) {
    bossHealth -= 1;
    document.getElementById("bossHealth").textContent = bossHealth;
  }
  else {
    userHealth -= 1;
    document.getElementById("userHealth").textContent = userHealth;
  }
  // to do: write a message saying what the number is divisible by
  var divisibilityMessage = "";
  console.log(numList.testCount);
  if (bossHealth === 0) {
    playerWin();
  }
  if (userHealth === 0) {
    gameOver();
  }
  nextNumber();
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
        <p id="feedback">Feedback will appear here.</p>
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
