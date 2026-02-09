import { render, screen } from '@testing-library/react';
import TreasureGuidelinesPage from '@/app/treasure/guideline/page';
import '@testing-library/jest-dom';

describe('TreasureGuidelinesPage', () => {
    // test1
    it('renders the header', () => {
        render(<TreasureGuidelinesPage />);

        expect(screen.getByText('Treasure Game')).toBeInTheDocument();
        expect(screen.getByText(/Guidelines/)).toBeInTheDocument();
    });

    // test2
    it('renders all rule boxes', () => {
        render(<TreasureGuidelinesPage />);
        // There should be 8 rules shown (divisible by 2,3,4,5,6,7,8,9)
        expect(screen.getAllByText(/Divisible by/)).toHaveLength(8)
    });

    // test3
    it('renders navigation buttons', () => {
        render(<TreasureGuidelinesPage />);

        expect(screen.getByText('Next')).toBeInTheDocument();
        expect(screen.getByText('Back')).toBeInTheDocument();
    });
});