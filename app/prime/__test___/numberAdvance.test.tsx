import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Page from '../page';
import '@testing-library/jest-dom';

describe('NumberAdvancement', () => {
  // Checks that the number displayed changes when the user clicks "Yes"
  it('advances when I click yes', async () => {
    render(<Page />);

    const user = userEvent.setup();

    const startBtn = screen.getByText('Start');
    await user.click(startBtn);

    const numSpan = document.getElementById('num');
    expect(numSpan).toBeInTheDocument();
    const initial = numSpan.textContent;

    const yesBtn = screen.getByText('Yes');
    await user.click(yesBtn);

    // If the answer was incorrect, click Continue
    const continueBtn = document.getElementById('continueButton');
    if (continueBtn && continueBtn.style.display === 'block') {
      await user.click(continueBtn);
    }

    await waitFor(() => {
      expect(document.getElementById('num').textContent).not.toBe(initial);
    });
  });

  // Checks that the number displayed changes when the user clicks "No"
  it('advances when I click no', async () => {
    render(<Page />);

    const user = userEvent.setup();

    const startBtn = screen.getByText('Start');
    await user.click(startBtn);

    const numSpan = document.getElementById('num');
    expect(numSpan).toBeInTheDocument();
    const initial = numSpan.textContent;

    const noBtn = screen.getByText('No');
    await user.click(noBtn);

    // If the answer was incorrect, click Continue
    const continueBtn = document.getElementById('continueButton');
    if (continueBtn && continueBtn.style.display === 'block') {
      await user.click(continueBtn);
    }

    await waitFor(() => {
      expect(document.getElementById('num').textContent).not.toBe(initial);
    });
  });
});