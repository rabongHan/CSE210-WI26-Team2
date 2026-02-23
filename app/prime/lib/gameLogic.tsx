import { generateBalancedNumbers, isPrime } from "./numberGenerator";
import { primeMnemonic, compositeMnemonic, factorizationMessage } from "./factorCheck";

var maxGuesses = 25;
var numList;
var currNumInd;
var timerInterval;
var timeLeft;

export var currNum;
export var bossHealth;
export var userHealth;
export var maxUserHealth = 5;
export var maxBossHealth = 20;

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
  var nIsPrime = isPrime(currNum);
  var correct = nIsPrime;
  if (correct) {
    playerPasses(currNum, nIsPrime);
  }
  else {
    playerFails(currNum, nIsPrime);
  }
}
export function clickNo() {
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

var playerFails = function(currNum, nIsPrime) {
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

var giveFeedback = function(n, nIsPrime, correct) {
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

var updateHealthBar = function(barId, textId, currentHealth, maxHealth) {
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

var showContinueButton = function() {
  const btn = document.getElementById("continueButton");
  if (btn) btn.style.display = "block";
}

var hideContinueButton = function() {
  const btn = document.getElementById("continueButton");
  if (btn) btn.style.display = "none";
}

var clearFeedback = function() {
  document.getElementById("correct").textContent = "";
  document.getElementById("feedback").textContent = "";
  document.getElementById("feedback").style.display = "none";
  document.getElementById("divisibilityFeedback").textContent = "";
  document.getElementById("divisibilityFeedback").style.display = "none";
}

var disableAnswerButtons = function() {
  const yesBtn = document.getElementById("yesButton") as HTMLButtonElement;
  const noBtn = document.getElementById("noButton") as HTMLButtonElement;
  if (yesBtn) yesBtn.disabled = true;
  if (noBtn) noBtn.disabled = true;
}

var enableAnswerButtons = function() {
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