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

describe('ButtonStateCheck', () => {
  it("passes if Yes/No buttons are enabled after clicking Start", async () => {
    render(<Page />);
    const user = userEvent.setup();

    // Click Start
    await user.click(screen.getByText('Start'));

    // Verify buttons are enabled
    const yesBtn = document.getElementById('yesButton') as HTMLButtonElement;
    const noBtn = document.getElementById('noButton') as HTMLButtonElement;
    
    await waitFor(() => {
      expect(yesBtn.disabled).toBe(false);
      expect(noBtn.disabled).toBe(false);
    });
  });

  it("passes if Yes/No buttons are disabled after an incorrect guess", async () => {
    render(<Page />);
    const user = userEvent.setup();

    // Start the game
    await user.click(screen.getByText('Start'));
    
    // Get the number and make an incorrect guess
    await userClickWrongAnswer(user);

    // Verify buttons are disabled during feedback period
    const yesBtn = document.getElementById('yesButton') as HTMLButtonElement;
    const noBtn = document.getElementById('noButton') as HTMLButtonElement;
    
    await waitFor(() => {
      expect(yesBtn.disabled).toBe(true);
      expect(noBtn.disabled).toBe(true);
    });
  });

  it("passes if Yes/No buttons are disabled after a correct guess", async () => {
    render(<Page />);
    const user = userEvent.setup();

    // Start the game
    await user.click(screen.getByText('Start'));
    
    // Get the number and make a correct guess
    await userClickCorrectAnswer(user);

    // Verify buttons are disabled (also shows Continue button now)
    const yesBtn = document.getElementById('yesButton') as HTMLButtonElement;
    const noBtn = document.getElementById('noButton') as HTMLButtonElement;
    
    await waitFor(() => {
      expect(yesBtn.disabled).toBe(true);
      expect(noBtn.disabled).toBe(true);
    });
  });

  it("passes if buttons have the same disabled state throughout the game", async () => {
    render(<Page />);
    const user = userEvent.setup();

    // Start the game
    await user.click(screen.getByText('Start'));
    
    const yesBtn = document.getElementById('yesButton') as HTMLButtonElement;
    const noBtn = document.getElementById('noButton') as HTMLButtonElement;

    // Verify initial state: both enabled
    expect(yesBtn.disabled).toBe(noBtn.disabled);
    expect(yesBtn.disabled).toBe(false);

    // Make an incorrect guess
    await userClickWrongAnswer(user);

    // After incorrect guess, both should be disabled
    await waitFor(() => {
      expect(yesBtn.disabled).toBe(noBtn.disabled);
      expect(yesBtn.disabled).toBe(true);
    });
  });

  it("passes if buttons are disabled when game ends after a loss", async () => {
    render(<Page />);
    const user = userEvent.setup();

    // Start the game
    await user.click(screen.getByText('Start'));
    
    // Make 5 incorrect guesses to lose the game
    for (let i = 0; i < 5; i++) {
      await userClickWrongAnswer(user);
      // Click Continue after every guess; final click enters game-over screen
      const continueBtn = await screen.findByText('Continue');
      await user.click(continueBtn);
    }

    // Verify game over message is displayed
    await screen.findByText('Game over!');

    // In end-game screen, answer buttons are not rendered
    expect(document.getElementById('yesButton')).toBeNull();
    expect(document.getElementById('noButton')).toBeNull();
  });

  it("passes if buttons are disabled when game ends after a win", async () => {
    render(<Page />);
    const user = userEvent.setup();

    // Start the game
    await user.click(screen.getByText('Start'));
    
    // Win the game by 20 correct guesses
    for (let i = 0; i < 20; i++) {
      await userClickCorrectAnswer(user);
      // Click Continue after every guess; final click enters win screen
      const continueBtn = await screen.findByText('Continue');
      await user.click(continueBtn);
    }

    // Verify win message is displayed
    await screen.findByText('You win!');

    // In end-game screen, answer buttons are not rendered
    expect(document.getElementById('yesButton')).toBeNull();
    expect(document.getElementById('noButton')).toBeNull();
  });

  it("passes if buttons are re-enabled after clicking Play Again", async () => {
    render(<Page />);
    const user = userEvent.setup();

    // Start the game and lose
    await user.click(screen.getByText('Start'));
    for (let i = 0; i < 5; i++) {
      await userClickWrongAnswer(user);
      // Click Continue after every guess; final click enters game-over screen
      const continueBtn = await screen.findByText('Continue');
      await user.click(continueBtn);
    }

    // Click Play Again
    const playAgainButtons = screen.getAllByText('Play again');
    await user.click(playAgainButtons[0]);

    // Verify buttons are re-enabled after game restarts
    await waitFor(() => {
      const yesBtn = document.getElementById('yesButton') as HTMLButtonElement;
      const noBtn = document.getElementById('noButton') as HTMLButtonElement;
      expect(yesBtn).toBeInTheDocument();
      expect(noBtn).toBeInTheDocument();
      expect(yesBtn.disabled).toBe(false);
      expect(noBtn.disabled).toBe(false);
    });
  });
});
