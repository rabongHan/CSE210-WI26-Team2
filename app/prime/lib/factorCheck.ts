import { isPrime } from "./numberGenerator";

// compositeness check code

let smallestPrimeFactor = function(n) {
  for (let i = 2; i < n; i++) {
    if (n % i === 0) {
      return i;
    }
  }
  return null;
}

export function primeMnemonic(n: number) : string {
    let primesLessThanSqrt = [];
    for (let i = 2; i**2 <= n; i++) {
        if (isPrime(i))
            primesLessThanSqrt.push(i);
    }
    return n + " is not divisible by " + primesLessThanSqrt.reduce((a, b) => a + ", " + b);
}

export function compositeMnemonic(n: number) : string {
    let factor = smallestPrimeFactor(n);
    switch (factor) {
        case 2:
            return n + " ends in " + n % 10 + "!";
        case 3:
            return n + "'s digits sum to " + n.toString().split("").reduce((a, b) => a + parseInt(b), 0) + "!";
        case 5:
            return n + " ends in 0 or 5!";
        case 7:
            return Math.floor(n / 10) + " - 2*" + (n % 10) + " = " + (Math.floor(n / 10) - 2*(n % 10)) + "!";
        case 11:
            let digits = n.toString().split("");
            let oddSum = digits.filter((_, i) => i % 2 === 0).reduce((a, b) => a + parseInt(b), 0);
            let evenSum = digits.filter((_, i) => i % 2 === 1).reduce((a, b) => a + parseInt(b), 0);
            return Math.abs(oddSum - evenSum) + ", the sum of odd digits minus the sum of even digits, is a multiple of 11!";
        default:
            // just move onto the next test
    }
    if (isSquare(n)) {
        return n + " is a perfect square!";
    }
    // default message
    return n + " is divisible by " + factor + "!";
}

let isSquare = function(n) {
    let root = Math.floor(Math.sqrt(n) + 1/2); // in case the square root is something like 4.99999999999999, we want to round it up to 5
    return root * root === n;
}

let factorize = function(n) {
    let factors = [];
    for (let i = 2; i <= n; i++) {
        while (n % i === 0) { // the factor might be repeated
            factors.push(i);
            n = n / i;
        }
        if (n === 1)
            break;
    }
    return factors;
}

let factorizationString = function(n) {
    let factors = factorize(n);
    let factorStr = factors.reduce((a, b) => a + "*" + b);
    return factorStr;
}

export function factorizationMessage(n: number) : string {
    if (isPrime(n)) {
        return n + " is prime";
    }
    else {
        return n + " = " + factorizationString(n);
    }
}