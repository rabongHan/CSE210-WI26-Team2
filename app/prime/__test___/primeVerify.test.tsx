import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import Page from '../page';
import { userClickCorrectAnswer, userClickWrongAnswer } from './testUtils';

describe('PrimeVerification', () => {
  it("passes if user correctly guesses if the number is prime or composite", async () => {
    render(<Page />);
    const user = userEvent.setup();

    // Start the game to populate the number
    await user.click(screen.getByText('Start'));

    const numSpan = document.getElementById('num');
    expect(numSpan).toBeInTheDocument();

    await userClickCorrectAnswer(user);
    const feedback = await screen.findByText("Correct!");
    // Correct answer also shows Continue button now
    const continueButton = await screen.findByText('Continue');
    expect(feedback).toBeInTheDocument();
    expect(continueButton).toBeInTheDocument();
  });

  it("passes if user incorrectly guesses if the number is prime or composite", async () => {
    render(<Page />);
    const user = userEvent.setup();

    // Start the game to populate the number
    await user.click(screen.getByText('Start'));

    const numSpan = document.getElementById('num');
    expect(numSpan).toBeInTheDocument();

    await userClickWrongAnswer(user);
    const feedback = await screen.findByText("Incorrect!");
    await user.click(screen.getByText('Continue'));
    expect(feedback).toBeInTheDocument();
  });
});