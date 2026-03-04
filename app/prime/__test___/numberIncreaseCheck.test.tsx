import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import Page from '../page';
import { userClickCorrectAnswer, userClickWrongAnswer } from './testUtils';

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
            await userClickCorrectAnswer(user);
            // Click Continue to advance to next number
            const continueBtn = await screen.findByText('Continue');
            await user.click(continueBtn);
            prevNum = currentNum;
            currentNum = parseInt(document.getElementById('num').textContent!);
            expect(currentNum).toBeGreaterThan(prevNum);
        }
    });
});