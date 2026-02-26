import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import Page from '../page';
import { isPrime } from '../lib/numberGenerator';

function userClickCorrectAnswer(user) {
  const numSpan = document.getElementById('num');
  const shown = parseInt(numSpan.textContent);
  const correctAnswer = isPrime(shown) ? 'Yes' : 'No';
  return user.click(screen.getByText(correctAnswer));
}

function userClickWrongAnswer(user) {
  const numSpan = document.getElementById('num');
  const shown = parseInt(numSpan.textContent);
  const wrongAnswer = isPrime(shown) ? 'No' : 'Yes';
  return user.click(screen.getByText(wrongAnswer));
}

describe('PlayAgainCheck', () => {
  it("passes if feedback is cleared when restarting a new game after winning", async () => {
    render(<Page />);
    const user = userEvent.setup();

    // Start the first game
    await user.click(screen.getByText('Start'));
    
    // Win the game by correct guesses (20 times to reduce boss health to 0)
    for (let i = 0; i < 20; i++) {
      await userClickCorrectAnswer(user);
    }

    // Verify win message is displayed
    const winMessage = await screen.findByText('You win!');
    expect(winMessage).toBeInTheDocument();

    // Click Play Again
    const playAgainButtons = screen.getAllByText('Play again');
    await user.click(playAgainButtons[0]);

    // Verify that feedback elements are cleared
    const correctElement = document.getElementById('correct');
    const feedbackElement = document.getElementById('feedback');
    const divisibilityElement = document.getElementById('divisibilityFeedback');

    expect(correctElement.textContent).toBe("");
    expect(feedbackElement.style.display).toBe("none");
    expect(divisibilityElement.style.display).toBe("none");

    // Verify game content is visible and we can play again
    const gameContent = document.getElementById('gameContent');
    expect(gameContent.style.display).toBe("block");
    
    // Verify the number has been reset
    const numSpan = document.getElementById('num');
    expect(numSpan).toBeInTheDocument();
    expect(numSpan.textContent).not.toBe("");
  });

  it("passes if feedback is cleared when restarting a new game after losing", async () => {
    render(<Page />);
    const user = userEvent.setup();

    // Start the first game
    await user.click(screen.getByText('Start'));
    
    // Lose the game by 5 incorrect guesses
    for (let i = 0; i < 5; i++) {
      await userClickWrongAnswer(user);
      // Click Continue after each incorrect guess
      if (i < 4 && screen.queryByText('Continue')) {
        await user.click(screen.getByText('Continue'));
      }
    }

    // Verify game over message is displayed
    const gameOverMessage = await screen.findByText('Game over!');
    expect(gameOverMessage).toBeInTheDocument();

    // Click Play Again
    const playAgainButtons = screen.getAllByText('Play again');
    await user.click(playAgainButtons[1]);

    // Verify that feedback elements are cleared
    const correctElement = document.getElementById('correct');
    const feedbackElement = document.getElementById('feedback');
    const divisibilityElement = document.getElementById('divisibilityFeedback');

    expect(correctElement.textContent).toBe("");
    expect(feedbackElement.style.display).toBe("none");
    expect(divisibilityElement.style.display).toBe("none");

    // Verify game content is visible and we can play again
    const gameContent = document.getElementById('gameContent');
    expect(gameContent.style.display).toBe("block");
    
    // Verify the number has been reset
    const numSpan = document.getElementById('num');
    expect(numSpan).toBeInTheDocument();
    expect(numSpan.textContent).not.toBe("");
  });
});
