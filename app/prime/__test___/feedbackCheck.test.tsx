import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import Page from '../page';
import { isPrime } from '../lib/numberGenerator';
import { userClickCorrectAnswer, userClickWrongAnswer } from './testUtils';

describe('FeedbackCheck', () => {
  it ("passes if yes/no feedback is displayed", async () => {
    render(<Page />);
    const user = userEvent.setup();

    // Start the game and click "Yes"
    await user.click(screen.getByText('Start'));
    const num1 = parseInt(document.getElementById('num').textContent);
    await user.click(screen.getByText('Yes'));
    let feedback;
    if (isPrime(num1)) {
      feedback = await screen.findByText("Correct!");
      // Now correct answer also shows Continue
      await user.click(screen.getByText('Continue'));
    }
    else {
      feedback = await screen.findByText("Incorrect!");
      await user.click(screen.getByText('Continue'));
    }
    expect(feedback).toBeInTheDocument();

    const num2 = parseInt(document.getElementById('num').textContent);

    // Click "No"
    await user.click(screen.getByText('No'));
    if (isPrime(num2)) {
      feedback = await screen.findByText("Incorrect!");
      await user.click(screen.getByText('Continue'));
    }
    else {
      feedback = await screen.findByText("Correct!");
      await user.click(screen.getByText('Continue'));
    }
    expect(feedback).toBeInTheDocument();
  });

  it ("passes if the number is correctly reported to be prime or composite", async () => {
    render(<Page />);
    const user = userEvent.setup();

    // Start the game and click "Yes"
    await user.click(screen.getByText('Start'));
    const num = parseInt(document.getElementById('num').textContent);
    await user.click(screen.getByText('Yes')); // it doesn't matter which button to click
    let feedback;
    if (isPrime(num)) {
      feedback = await screen.getByText(num + " is prime");
      // Now correct also needs Continue
      await user.click(screen.getByText('Continue'));
    }
    else {
      // This has to be a partial match, because `${num} =` doesn't match everything in the text field.
      feedback = await screen.findByText((content) => content.includes(`${num} =`)); // beginning of a factorization message
      await user.click(screen.getByText('Continue'));
    }
    expect(feedback).toBeInTheDocument();
  });

  it ("passes if a mnemonic appears after a wrong guess", async () => {
    render(<Page />);
    const user = userEvent.setup();

    await user.click(screen.getByText('Start'));
    await userClickWrongAnswer(user);
    // expect the divisibilityFeedback element to be visible
    const feedback = document.getElementById('divisibilityFeedback');
    expect(feedback).toBeVisible();
  });
});