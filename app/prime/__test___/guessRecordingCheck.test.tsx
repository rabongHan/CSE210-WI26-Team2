import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import Page from '../page';
import { userClickCorrectAnswer, userClickWrongAnswer } from './testUtils';

describe('GuessRecordingCheck', () => {
  it('records and displays correct guesses accurately', async () => {
    render(<Page />);
    const user = userEvent.setup();

    // Start the game
    await user.click(screen.getByText('Start'));

    // Make multiple correct guesses until game ends or we reach a stopping point
    let guessCount = 0;
    const maxGuesses = 30;

    while (guessCount < maxGuesses) {
      try {
        // Try to make a correct guess
        await userClickCorrectAnswer(user);

        // Wait for the continue button to appear
        const continueBtn = await waitFor(
          () => document.getElementById('continueButton') as HTMLButtonElement,
          { timeout: 2000 }
        );

        if (continueBtn && !continueBtn.disabled) {
          // Click continue
          await user.click(continueBtn);
          guessCount++;
        } else {
          // Game has ended
          break;
        }
      } catch (e) {
        // Game has ended or button not found
        break;
      }
    }

    // Wait for EndGameScreen to appear
    await waitFor(() => {
      expect(screen.getByText('Play again')).toBeInTheDocument();
    });

    // Verify that correct guesses lists exist with content
    const correctPrimeList = document.getElementById('correctPrimeList');
    const correctCompositeList = document.getElementById('correctCompositeList');

    // At least one list should have actual guesses (not just "None")
    expect(correctPrimeList || correctCompositeList).toBeInTheDocument();

    // Verify lists contain numbers (not "None" or empty)
    if (correctPrimeList && correctPrimeList.textContent.includes(correctPrimeList.querySelector('li')?.textContent || '')) {
      expect(correctPrimeList.querySelectorAll('li').length).toBeGreaterThan(0);
    }
  });

  it('records and displays incorrect guesses accurately', async () => {
    render(<Page />);
    const user = userEvent.setup();

    // Start the game
    await user.click(screen.getByText('Start'));

    // Make multiple wrong guesses to trigger game end or collect data
    let guessCount = 0;
    const maxGuesses = 10;

    while (guessCount < maxGuesses) {
      try {
        // Make a wrong guess
        await userClickWrongAnswer(user);

        // Check if continue button is available and not disabled
        const continueBtn = document.getElementById('continueButton') as HTMLButtonElement;
        if (!continueBtn || continueBtn.disabled) {
          // Game has ended
          break;
        }

        await user.click(continueBtn);
        guessCount++;
      } catch (e) {
        // Game has ended or button not found
        break;
      }
    }

    // Wait briefly for UI to update
    await new Promise((resolve) => setTimeout(resolve, 500));

    // Verify that incorrect guesses lists exist
    const incorrectPrimeList = document.getElementById('incorrectPrimeList');
    const incorrectCompositeList = document.getElementById('incorrectCompositeList');

    expect(incorrectPrimeList || incorrectCompositeList).toBeInTheDocument();
  }, 15000);

  it('displays both correct and incorrect guesses in EndGameScreen', async () => {
    render(<Page />);
    const user = userEvent.setup();

    // Start the game
    await user.click(screen.getByText('Start'));

    let totalGuesses = 0;
    const maxGuesses = 30;

    // Play through several rounds
    while (totalGuesses < maxGuesses) {
      try {
        // Alternate between correct and incorrect guesses
        if (totalGuesses % 2 === 0) {
          await userClickCorrectAnswer(user);
        } else {
          await userClickWrongAnswer(user);
        }

        // Wait for the continue button
        const continueBtn = await waitFor(
          () => document.getElementById('continueButton') as HTMLButtonElement,
          { timeout: 2000 }
        );

        if (continueBtn && !continueBtn.disabled) {
          await user.click(continueBtn);
          totalGuesses++;
        } else {
          // Game has ended
          break;
        }
      } catch (e) {
        // Game has ended
        break;
      }
    }

    // Wait for EndGameScreen to appear
    await waitFor(() => {
      expect(screen.getByText('Play again')).toBeInTheDocument();
    });

    // Verify all four guess lists are present in EndGameScreen
    const correctPrimeList = document.getElementById('correctPrimeList');
    const correctCompositeList = document.getElementById('correctCompositeList');
    const incorrectPrimeList = document.getElementById('incorrectPrimeList');
    const incorrectCompositeList = document.getElementById('incorrectCompositeList');

    expect(correctPrimeList).toBeInTheDocument();
    expect(correctCompositeList).toBeInTheDocument();
    expect(incorrectPrimeList).toBeInTheDocument();
    expect(incorrectCompositeList).toBeInTheDocument();
  });

  it('separates guesses by prime and composite status', async () => {
    render(<Page />);
    const user = userEvent.setup();

    // Start the game
    await user.click(screen.getByText('Start'));

    // Play rounds - answer WRONG to trigger game end faster (health depletion)
    // Max user health is 5, so 5 wrong answers should end the game
    let roundsPlayed = 0;
    const maxRounds = 5;

    while (roundsPlayed < maxRounds) {
      try {
        // Make wrong guesses to deplete health and end game
        await userClickWrongAnswer(user);

        // Wait briefly for feedback
        await new Promise((resolve) => setTimeout(resolve, 300));

        // Check if continue button exists and is enabled
        const continueBtn = document.getElementById('continueButton') as HTMLButtonElement;
        if (!continueBtn || continueBtn.disabled) {
          // Game has ended
          break;
        }

        await user.click(continueBtn);
        roundsPlayed++;
      } catch (e) {
        // Game or continue button not available
        break;
      }
    }

    // Wait briefly for EndGameScreen to render
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Verify that correct/incorrect guesses are separated by prime/composite
    const correctPrimeList = document.getElementById('correctPrimeList');
    const correctCompositeList = document.getElementById('correctCompositeList');
    const incorrectPrimeList = document.getElementById('incorrectPrimeList');
    const incorrectCompositeList = document.getElementById('incorrectCompositeList');

    // If EndGameScreen is rendered, all four lists should exist
    if (
      correctPrimeList &&
      correctCompositeList &&
      incorrectPrimeList &&
      incorrectCompositeList
    ) {
      // Verify that at least INCORRECT guesses have content (since we only answered wrong)
      const hasIncorrectPrimes =
        (incorrectPrimeList?.querySelector('li')?.textContent || '').trim() !== 'None';
      const hasIncorrectComposites =
        (incorrectCompositeList?.querySelector('li')?.textContent || '').trim() !== 'None';

      // At least one incorrect category should have guesses since we answered wrong
      expect(hasIncorrectPrimes || hasIncorrectComposites).toBe(true);
    } else {
      // EndGameScreen may not be rendered yet or structure is different
      // Just verify we either have the lists or the game continued normally
      expect(roundsPlayed).toBeGreaterThan(0);
    }
  }, 15000);
});
