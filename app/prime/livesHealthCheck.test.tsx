import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import Page from './page';
import { isPrime } from './lib/numberGenerator';

describe('LivesHealthCheck', () => {
  it ("passes if the player's health is decremented for each incorrect guess", async () => {
    render(<Page />);
    const user = userEvent.setup();

    // Start the game
    await user.click(screen.getByText('Start'));
    // Get the number
    const numSpan = document.getElementById('num');
    // convert the number to an integer
    const shown = parseInt(numSpan.textContent);
    if (isPrime(shown)) {
      // if the number is prime, clicking "No" should decrement health
      await user.click(screen.getByText('No'));
      const userHealth = await screen.findByText('4'); // health should go from 5 to 4
      expect(userHealth).toBeInTheDocument();
    } else {
      // if the number is composite, clicking "Yes" should decrement health
      await user.click(screen.getByText('Yes'));
      const userHealth = await screen.findByText('4'); // health should go from 5 to 4
      expect(userHealth).toBeInTheDocument();
    }
  });

  it ("passes if the boss's health is decremented for each correct guess", async () => {
    render(<Page />);
    const user = userEvent.setup();

    // Start the game
    await user.click(screen.getByText('Start'));
    // Get the number
    const numSpan = document.getElementById('num');
    // convert the number to an integer
    const shown = parseInt(numSpan.textContent);
    if (isPrime(shown)) {
      // if the number is prime, clicking "Yes" should decrement boss health
      await user.click(screen.getByText('Yes'));
      const bossHealth = await screen.findByText('19'); // health should go from 20 to 19
      expect(bossHealth).toBeInTheDocument();
    } else {
      // if the number is composite, clicking "No" should decrement boss health
      await user.click(screen.getByText('No'));
      const bossHealth = await screen.findByText('19'); // health should go from 20 to 19
      expect(bossHealth).toBeInTheDocument();
    }
  });

  it ("passes if the game ends when the player's health reaches 0", async () => {
    render(<Page />);
    const user = userEvent.setup();

    // Start the game
    await user.click(screen.getByText('Start'));
    for (let i = 0; i < 5; i++) {
        // Get the number
        const numSpan = document.getElementById('num');
        // convert the number to an integer
        const shown = parseInt(numSpan.textContent);
        // do five incorrect guesses
        if (isPrime(shown)) {
            await user.click(screen.getByText('No'));
        } else {
            await user.click(screen.getByText('Yes'));
        }
    }
    const gameOverMessage = await screen.findByText('Game over!');
  });

  it ("passes if the game ends when the boss's health reaches 0", async () => {
    render(<Page />);
    const user = userEvent.setup();

    // Start the game
    await user.click(screen.getByText('Start'));
    for (let i = 0; i < 20; i++) {
        // Get the number
        const numSpan = document.getElementById('num');
        // convert the number to an integer
        const shown = parseInt(numSpan.textContent);
        // do twenty correct guesses
        if (isPrime(shown)) {
            await user.click(screen.getByText('Yes'));
        } else {
            await user.click(screen.getByText('No'));
        }
    }
    const gameOverMessage = await screen.findByText('You win!');
  });
});