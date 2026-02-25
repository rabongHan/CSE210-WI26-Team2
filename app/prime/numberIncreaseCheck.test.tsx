import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import Page from './page';
import { isPrime } from './lib/numberGenerator';

describe('NumberIncreaseCheck', () => {
    it ("passes if the number increases monotonically throughout the game", async () => {
        render(<Page />);
        const user = userEvent.setup();

        // Start the game
        await user.click(screen.getByText('Start'));
        // Get the number
        let currentNum = parseInt(document.getElementById('num').textContent!);
        let prevNum;

        for (let i = 0; i < 19; i++) {
            if (isPrime(currentNum)) {
                await user.click(screen.getByText('Yes'));
            }
            else {
                await user.click(screen.getByText('No'));
            }
            prevNum = currentNum;
            currentNum = parseInt(document.getElementById('num').textContent!);
            if (currentNum <= prevNum) {
                throw new Error("Number did not increase monotonically");
            }
        }
    });
});