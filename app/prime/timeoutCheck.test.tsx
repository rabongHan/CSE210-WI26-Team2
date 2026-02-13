import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import Page from './page';

jest.setTimeout(20000); // test takes 11 seconds to run, so set timeout to 20 seconds to be safe

describe('TimeoutCheck', () => {
  it ("passes if the game advances to the next number and decrements the player's health if they don't guess for 10 seconds", async () => {
    render(<Page />);
    const user = userEvent.setup();

    // Start the game
    await user.click(screen.getByText('Start'));
    // Get the number
    const initialNum = document.getElementById('num').textContent;
    const initialHealth = parseInt(document.getElementById('userHealth').textContent);
    // wait for 11 seconds
    await new Promise((r) => setTimeout(r, 11000));
    const newNum = document.getElementById('num').textContent;
    const newHealth = parseInt(document.getElementById('userHealth').textContent);
    expect(newNum).not.toBe(initialNum);
    expect(newHealth === initialHealth - 1).toBeTruthy();
  });
});