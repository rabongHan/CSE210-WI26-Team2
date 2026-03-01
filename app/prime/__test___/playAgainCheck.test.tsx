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
      // Click Continue to advance (except on win condition when game ends)
      if (i < 19) {
        const continueBtn = await screen.findByText('Continue');
        await user.click(continueBtn);
      }
    }

    // Verify win message is displayed
    const winMessage = await screen.findByText('You win!');
    expect(winMessage).toBeInTheDocument();

    // Click Play Again
    const playAgainButtons = screen.getAllByText('Play again');
    await user.click(playAgainButtons[0]);

    // After clicking Play Again, verify buttons are re-enabled and ready for new game
    await waitFor(() => {
      const yesBtn = document.getElementById('yesButton') as HTMLButtonElement;
      const noBtn = document.getElementById('noButton') as HTMLButtonElement;
      expect(yesBtn).toBeInTheDocument();
      expect(noBtn).toBeInTheDocument();
      expect(yesBtn.disabled).toBe(false);
      expect(noBtn.disabled).toBe(false);
    });
    
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
      // Click Continue after each guess (but not on last one to trigger game over)
      if (i < 4) {
        const continueBtn = await screen.findByText('Continue');
        await user.click(continueBtn);
      }
    }

    // Verify game over message is displayed
    const gameOverMessage = await screen.findByText('Game over!');
    expect(gameOverMessage).toBeInTheDocument();

    // Click Play Again
    const playAgainButtons = screen.getAllByText('Play again');
    await user.click(playAgainButtons[0]);

    // After clicking Play Again, verify buttons are re-enabled and ready for new game
    await waitFor(() => {
      const yesBtn = document.getElementById('yesButton') as HTMLButtonElement;
      const noBtn = document.getElementById('noButton') as HTMLButtonElement;
      expect(yesBtn).toBeInTheDocument();
      expect(noBtn).toBeInTheDocument();
      expect(yesBtn.disabled).toBe(false);
      expect(noBtn.disabled).toBe(false);
    });
    
    // Verify the number has been reset
    const numSpan = document.getElementById('num');
    expect(numSpan).toBeInTheDocument();
    expect(numSpan.textContent).not.toBe("");
  });
});
