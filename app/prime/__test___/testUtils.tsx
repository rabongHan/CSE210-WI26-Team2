import { screen } from '@testing-library/react';
import { isPrime } from '../lib/numberGenerator';

export function userClickCorrectAnswer(user) {
  const numSpan = document.getElementById('num');
  const shown = parseInt(numSpan.textContent);
  const correctAnswer = isPrime(shown) ? 'Yes' : 'No';
  return user.click(screen.getByText(correctAnswer));
}

export function userClickWrongAnswer(user) {
  const numSpan = document.getElementById('num');
  const shown = parseInt(numSpan.textContent);
  const wrongAnswer = isPrime(shown) ? 'No' : 'Yes';
  return user.click(screen.getByText(wrongAnswer));
}

