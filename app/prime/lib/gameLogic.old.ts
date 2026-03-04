import { generateBalancedNumbers, isPrime } from "./numberGenerator";
import { primeMnemonic, compositeMnemonic, factorizationMessage } from "./factorCheck";

let maxGuesses = 25;
let numList;
let currNumInd;
let timerInterval;
let timeLeft;

export let currNum;
export let bossHealth;
export let userHealth;
export let maxUserHealth = 5;
export let maxBossHealth = 20;

export function startGame() {
  numList = generateBalancedNumbers(100, 300, maxGuesses, {});
  currNumInd = 0; // the index into the num list
  currNum = numList.numbers[currNumInd];
  document.getElementById("num").textContent = currNum;
  userHealth = maxUserHealth;
  updateHealthBar("userHealthBar", "userHealthText", userHealth, maxUserHealth);
  bossHealth = maxBossHealth;
  updateHealthBar("bossHealthBar", "bossHealthText", bossHealth, maxBossHealth);
  document.getElementById("welcomeBox").style.display = "none";
  document.getElementById("startButtonWrap").style.display = "none";
  hideContinueButton();
  clearFeedback();
  enableAnswerButtons();
  startTimer();
  showGameContent();
  hidePlayerWin();
  hideGameOver();
}

export function clickYes() {
  let nIsPrime = isPrime(currNum);
  let correct = nIsPrime;
  if (correct) {
    playerPasses(currNum, nIsPrime);
  }
  else {
    playerFails(currNum, nIsPrime);
  }
}
export function clickNo() {
  let nIsPrime = isPrime(currNum);
  let correct = !nIsPrime;
  if (correct) {
    playerPasses(currNum, nIsPrime);
  }
  else {
    playerFails(currNum, nIsPrime);
  }
}

// Functions for when the player guesses correctly or incorrectly.
// These include the code for moving to the next number or ending the game.
let playerPasses = function(currNum, nIsPrime) {
  bossHealth -= 1;
  updateHealthBar("bossHealthBar", "bossHealthText", bossHealth, maxBossHealth);
  if (bossHealth === 0) {
    stopTimer();
    playerWin();
  }
  else {
    giveFeedback(currNum, nIsPrime, true);
    nextNumber();
  }
}

let playerFails = function(currNum, nIsPrime) {
  userHealth -= 1;
  updateHealthBar("userHealthBar", "userHealthText", userHealth, maxUserHealth);
  if (userHealth === 0) {
    gameOver();
  }
  else {
    giveFeedback(currNum, nIsPrime, false);
    stopTimer();
    disableAnswerButtons();
    showContinueButton();
  }
}

let giveFeedback = function(n, nIsPrime, correct) {
  document.getElementById("correct").textContent = correct ? "Correct!" : "Incorrect!";
  document.getElementById("correct").style.color = correct ? "green" : "red";
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

let showGameContent = function() {
  document.getElementById("gameContent").style.display = "block";
}
let hideGameContent = function() {
  document.getElementById("gameContent").style.display = "none";
}
let playerWin = function() {
  stopTimer();
  disableAnswerButtons();
  showPlayerWin();
  hideGameContent();
}
let gameOver = function() {
  stopTimer();
  disableAnswerButtons();
  showGameOver();
  hideGameContent();
}
let showPlayerWin = function() {
  document.getElementById("winMsg").style.display = "block";
}
let showGameOver = function() {
  document.getElementById("loseMsg").style.display = "block";
}
let hidePlayerWin = function() {
  document.getElementById("winMsg").style.display = "none";
}
let hideGameOver = function() {
  document.getElementById("loseMsg").style.display = "none";
}
let nextNumber = function() {
  if (currNumInd < maxGuesses - 1) {
    currNumInd += 1;
  }
  currNum = numList.numbers[currNumInd];
  document.getElementById("num").textContent = currNum;
  startTimer();
}

let startTimer = function() {
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

let resetTimer = function() {
  timeLeft = 10;
  const el = document.getElementById('timer');
  if (el) el.textContent = String(timeLeft);
}

let stopTimer = function() {
  if (typeof timerInterval !== 'undefined') {
    clearInterval(timerInterval);
  }
}

let updateHealthBar = function(barId, textId, currentHealth, maxHealth) {
  const percentage = (currentHealth / maxHealth) * 100;
  const bar = document.getElementById(barId);
  if (bar) {
    bar.style.width = percentage + "%";
  }
  const text = document.getElementById(textId);
  if (text) {
    text.textContent = currentHealth + "/" + maxHealth;
  }
}

let showContinueButton = function() {
  const btn = document.getElementById("continueButton");
  if (btn) btn.style.display = "block";
}

let hideContinueButton = function() {
  const btn = document.getElementById("continueButton");
  if (btn) btn.style.display = "none";
}

let clearFeedback = function() {
  document.getElementById("correct").textContent = "";
  document.getElementById("feedback").textContent = "";
  document.getElementById("feedback").style.display = "none";
  document.getElementById("divisibilityFeedback").textContent = "";
  document.getElementById("divisibilityFeedback").style.display = "none";
}

let disableAnswerButtons = function() {
  const yesBtn = document.getElementById("yesButton") as HTMLButtonElement;
  const noBtn = document.getElementById("noButton") as HTMLButtonElement;
  if (yesBtn) yesBtn.disabled = true;
  if (noBtn) noBtn.disabled = true;
}

let enableAnswerButtons = function() {
  const yesBtn = document.getElementById("yesButton") as HTMLButtonElement;
  const noBtn = document.getElementById("noButton") as HTMLButtonElement;
  if (yesBtn) yesBtn.disabled = false;
  if (noBtn) noBtn.disabled = false;
}

export function continueGame() {
  hideContinueButton();
  enableAnswerButtons();
  nextNumber();
}