import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import Page from '../page';

jest.setTimeout(20000); // test takes 11 seconds to run, so set timeout to 20 seconds to be safe

describe('TimeoutCheck', () => {
  it ("passes if the game advances to the next number and decrements the player's health if they don't guess for 10 seconds", async () => {
    render(<Page />);
    const user = userEvent.setup();

    // Start the game
    await user.click(screen.getByText('Start'));
    // Get the number
    const initialNum = document.getElementById('num').textContent;
    const initialHealthText = document.getElementById('userHealthText').textContent;
    const initialHealth = parseInt(initialHealthText.split('/')[0]); // Extract first number from "5/5"
    // wait for 11 seconds
    await new Promise((r) => setTimeout(r, 11000));
    const newHealthText = document.getElementById('userHealthText').textContent;
    const newHealth = parseInt(newHealthText.split('/')[0]); // Extract first number from "4/5"
    expect(newHealth === initialHealth - 1).toBeTruthy();
    
    // Click Continue to advance to next number
    await user.click(screen.getByText('Continue'));
    
    const newNum = document.getElementById('num').textContent;
    expect(newNum).not.toBe(initialNum);
  });
});