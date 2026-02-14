import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import Page from './page';
import { isPrime } from './lib/numberGenerator';

describe('PrimeVerification', () => {
  it("passes if user correctly guesses if the number is prime or composite", async () => {
    render(<Page />);
    const user = userEvent.setup();

    // Start the game to populate the number
    await user.click(screen.getByText('Start'));

    const numSpan = document.getElementById('num');
    expect(numSpan).toBeInTheDocument();
    const shown = parseInt(numSpan.textContent);

    await user.click(screen.getByText(isPrime(shown) ? 'Yes' : 'No'));
    const feedback = await screen.findByText("Correct!");
    expect(feedback).toBeInTheDocument();
  });

  it("passes if user incorrectly guesses if the number is prime or composite", async () => {
    render(<Page />);
    const user = userEvent.setup();

    // Start the game to populate the number
    await user.click(screen.getByText('Start'));

    const numSpan = document.getElementById('num');
    expect(numSpan).toBeInTheDocument();
    const shown = parseInt(numSpan.textContent);

    await user.click(screen.getByText(isPrime(shown) ? 'No' : 'Yes'));
    const feedback = await screen.findByText("Incorrect!");
    expect(feedback).toBeInTheDocument();
  });
});