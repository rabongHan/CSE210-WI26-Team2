"use client";

import { Target } from "lucide-react";
import { useEffect, useState } from "react";

export default function Page() {
  const [now, setNow] = useState("");

  useEffect(() => setNow(new Date().toISOString()), []);

  function StartGame() {
    console.log("This is supposed to cause text to show but I don't know how to hide the text in the first place");
  }

    // to do: export all this to another module
    var currNum = 101;
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
      console.log(n);
    }
    var displayIncorrectPrime = function(n) {
      console.log("No, it's composite")
      feedbackMessage = "No, it's composite";
      console.log(n)
    }
    var displayCorrectComposite = function(n) {
      console.log("Yes, it's composite")
      feedbackMessage = "Yes, it's composite";
      console.log(n)
    }
    var displayIncorrectComposite = function(n) {
      console.log("No, it's prime")
      feedbackMessage = "No, it's prime";
      console.log(n)
    }
    var nextNumber = function() {
      currNum += 1;
      document.getElementById("num").textContent = currNum;
      // clear feedback message once we've added that to the page itself
      // ...
    }
    // ...


  return (
    <main style={{ fontFamily: "system-ui", padding: 24 }}>
      <div className="welcome">Welcome to the prime testing minigame!</div>
      <button onClick={StartGame}>Start</button>
      <div>
        <p>Welcome to the prime testing game!</p>
        <p>Is <span id="num">{currNum}</span> prime?</p>
        <button onClick={clickYes}>Yes</button>
        <button onClick={clickNo}>No</button>
        <p>{feedbackMessage}</p>
      </div>
    </main>
  );
}
