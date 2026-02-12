import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import Page from './page';

describe('FeedbackCheck', () => {
  it ("passes if feedback is displayed", async () => {
    render(<Page />);
    const user = userEvent.setup();

    // Start the game and click "Yes"
    await user.click(screen.getByText('Start'));
    await user.click(screen.getByText('Yes'));
    const feedback = await screen.findByText(/it's/i); // short for (Yes|No) it's (prime|composite)
    expect(feedback).toBeInTheDocument();

    // Click "No"
    await user.click(screen.getByText('No'));
    const feedback2 = await screen.findByText(/it's/i); // short for (Yes|No) it's (prime|composite)
    expect(feedback2).toBeInTheDocument();
  });

  // to do: add one that tests the explanation of why the number is prime or composite, once I add that
});