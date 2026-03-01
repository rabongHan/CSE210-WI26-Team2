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

describe('ContinueButtonCheck', () => {
  it("passes if Continue button is displayed after an incorrect guess", async () => {
    render(<Page />);
    const user = userEvent.setup();

    // Start the game
    await user.click(screen.getByText('Start'));
    
    // Get the number and make an incorrect guess
    await userClickWrongAnswer(user);

    // Verify Continue button is displayed
    const continueButton = document.getElementById('continueButton');
    await waitFor(() => {
      expect(continueButton.style.display).toBe('block');
    });
  });

  it("passes if Continue button is hidden after clicking it", async () => {
    render(<Page />);
    const user = userEvent.setup();

    // Start the game
    await user.click(screen.getByText('Start'));
    
    // Get the number and make an incorrect guess
    await userClickWrongAnswer(user);

    // Wait for Continue button to appear
    await screen.findByText('Continue');
    
    // Click Continue
    await user.click(screen.getByText('Continue'));

    // Verify Continue button is hidden
    const continueButton = document.getElementById('continueButton');
    expect(continueButton.style.display).toBe('none');
  });

  it("passes if the game advances to the next number after clicking Continue", async () => {
    render(<Page />);
    const user = userEvent.setup();

    // Start the game
    await user.click(screen.getByText('Start'));
    
    // Get the first number and make an incorrect guess
    const firstNum = parseInt(document.getElementById('num').textContent);
    await userClickWrongAnswer(user);

    // Wait for Continue button and click it
    await screen.findByText('Continue');
    await user.click(screen.getByText('Continue'));

    // Verify that a new number is displayed
    await waitFor(() => {
      const newNum = parseInt(document.getElementById('num').textContent);
      expect(newNum).not.toBe(firstNum);
    });
  });

  it("passes if the game can continue normally after clicking Continue", async () => {
    render(<Page />);
    const user = userEvent.setup();

    // Start the game
    await user.click(screen.getByText('Start'));
    
    // First round - incorrect guess
    await userClickWrongAnswer(user);

    // Click Continue
    await screen.findByText('Continue');
    await user.click(screen.getByText('Continue'));

    // Second round - make another guess
    await userClickCorrectAnswer(user);

    // Verify feedback appears for the second guess
    const feedback = await screen.findByText('Correct!');
    expect(feedback).toBeInTheDocument();
  });

  it("passes if Continue button works properly for multiple incorrect guesses", async () => {
    render(<Page />);
    const user = userEvent.setup();

    // Start the game
    await user.click(screen.getByText('Start'));
    
    // First incorrect guess
    await userClickWrongAnswer(user);
    await screen.findByText('Continue');
    await user.click(screen.getByText('Continue'));

    // Second incorrect guess
    await userClickWrongAnswer(user);
    await screen.findByText('Continue');
    await user.click(screen.getByText('Continue'));

    // Verify health decreased (now should be 3/5)
    const userHealthText = await screen.findByText('3/5');
    expect(userHealthText).toBeInTheDocument();
  });

  it("passes if Continue button is shown after a correct guess", async () => {
    render(<Page />);
    const user = userEvent.setup();

    // Start the game
    await user.click(screen.getByText('Start'));
    
    // Get the number and make a correct guess
    await userClickCorrectAnswer(user);

    // Verify Continue button IS displayed (since correct answer also shows Continue)
    const continueButton = document.getElementById('continueButton');
    await waitFor(() => {
      expect(continueButton.style.display).toBe('block');
    });
  });

  it("passes if the timer resets to 10 seconds after clicking Continue", async () => {
    render(<Page />);
    const user = userEvent.setup();

    // Start the game
    await user.click(screen.getByText('Start'));
    
    // Get the number and make an incorrect guess immediately
    await userClickWrongAnswer(user);

    // Wait for Continue button and click it
    await screen.findByText('Continue');
    await user.click(screen.getByText('Continue'));

    // Verify timer is reset to 10
    await waitFor(() => {
      const timerText = document.getElementById('timer').textContent;
      expect(timerText).toBe('10');
    });
  });
});
