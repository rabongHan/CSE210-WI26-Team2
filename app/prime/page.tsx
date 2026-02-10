"use client";

import { Target } from "lucide-react";
import { useEffect, useState } from "react";
import { generateBalancedNumbers } from "./lib/numberGenerator.ts";

export default function Page() {
  const [now, setNow] = useState("");

  useEffect(() => setNow(new Date().toISOString()), []);

  function StartGame() {
    document.getElementById("gameContent").style.display = "block";
  }

  var numList = generateBalancedNumbers(100, 300, 20, {});

    // to do: export all this to another module
    var currNumInd = 0; // the index into the num list
    var currNum = numList.numbers[currNumInd];
    var feedbackMessage = "";
    var isPrime = function(num) {
      if (num < 2) {
        return false;
      }
      if (num % 2 === 0) {
        return false;
      }
      for (var i = 3; i**2 <= num; i += 2) {
        if (num % i === 0) {
          return false;
        }
      }
      return true;
    }
    var clickYes = function() {
      if (isPrime(currNum)) {
        displayCorrectPrime(currNum);
      }
      else {
        displayIncorrectPrime(currNum);
      }
      nextNumber();
    }
    var clickNo = function() {
      if (isPrime(currNum)) {
        displayIncorrectComposite(currNum);
      }
      else {
        displayCorrectComposite(currNum);
      }
      nextNumber();
    }
    var displayCorrectPrime = function(n) {
      console.log("Yes, it's prime");
      feedbackMessage = "Yes, it's prime";
      document.getElementById("feedback").textContent = feedbackMessage;
      console.log(n);
    }
    var displayIncorrectPrime = function(n) {
      console.log("No, it's composite")
      feedbackMessage = "No, it's composite";
      document.getElementById("feedback").textContent = feedbackMessage;
      console.log(n)
    }
    var displayCorrectComposite = function(n) {
      console.log("Yes, it's composite")
      feedbackMessage = "Yes, it's composite";
      document.getElementById("feedback").textContent = feedbackMessage;
      console.log(n)
    }
    var displayIncorrectComposite = function(n) {
      console.log("No, it's prime")
      feedbackMessage = "No, it's prime";
      document.getElementById("feedback").textContent = feedbackMessage;
      console.log(n)
    }
    var nextNumber = function() {
      if (currNumInd < 19) {
        currNumInd += 1;
      }
      currNum = numList.numbers[currNumInd];
      document.getElementById("num").textContent = currNum;
    }
    // ...

  return (
    <main style={{ fontFamily: "system-ui", padding: 24 }}>
      <div className="welcome">Welcome to the prime testing minigame!</div>
      <button onClick={StartGame}>Start</button>
      <div id="gameContent" style={{ display: "none" }}>
        <p>Is <span id="num">{currNum}</span> prime?</p>
        <button onClick={clickYes}>Yes</button>
        <button onClick={clickNo}>No</button>
        <p>{feedbackMessage}</p>
        <p id="feedback">Feedback will appear here.</p>
      </div>
    </main>
  );
}
