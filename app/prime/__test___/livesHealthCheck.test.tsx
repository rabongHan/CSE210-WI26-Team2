import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import Page from '../page';
import { userClickCorrectAnswer, userClickWrongAnswer } from './testUtils';

describe('LivesHealthCheck', () => {
  it ("passes if the player's health is decremented for each incorrect guess", async () => {
    render(<Page />);
    const user = userEvent.setup();

    // Start the game
    await user.click(screen.getByText('Start'));

    await userClickWrongAnswer(user);
    const userHealth = await screen.findByText(/^4\/5$/); // health should go from 5 to 4
    await user.click(screen.getByText('Continue'));
    expect(userHealth).toBeInTheDocument();
  });

  it ("passes if the boss's health is decremented for each correct guess", async () => {
    render(<Page />);
    const user = userEvent.setup();

    // Start the game
    await user.click(screen.getByText('Start'));

    // if the number is prime, clicking "Yes" should decrement boss health
    await userClickCorrectAnswer(user);
      // Correct answer now also needs Continue
      const continueBtn = await screen.findByText('Continue');
      await user.click(continueBtn);
      const bossHealth = await screen.findByText(/^19\/20$/); // health should go from 20 to 19
    expect(bossHealth).toBeInTheDocument();
  });

  it ("passes if the game ends when the player's health reaches 0", async () => {
    render(<Page />);
    const user = userEvent.setup();

    // Start the game
    await user.click(screen.getByText('Start'));
    for (let i = 0; i < 5; i++) {
        // do five incorrect guesses
        await userClickWrongAnswer(user);
        // Click Continue after every guess; the final click transitions to game over
        const continueBtn = await screen.findByText('Continue');
        await user.click(continueBtn);
    }
    const gameOverMessage = await screen.findByText('Game over!');
  });

  it ("passes if the game ends when the boss's health reaches 0", async () => {
    render(<Page />);
    const user = userEvent.setup();

    // Start the game
    await user.click(screen.getByText('Start'));
    for (let i = 0; i < 20; i++) {
        // do twenty correct guesses
        await userClickCorrectAnswer(user);
        // Click Continue after every guess; the final click transitions to win
        const continueBtn = await screen.findByText('Continue');
        await user.click(continueBtn);
    }
    const gameOverMessage = await screen.findByText('You win!');
  });
});