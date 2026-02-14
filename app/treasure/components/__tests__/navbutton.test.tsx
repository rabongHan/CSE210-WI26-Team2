import { render, screen } from '@testing-library/react';
import { NavButton } from '../../components/treasure-buttons';
import '@testing-library/jest-dom';

describe('NavButton Component', () => {
    // test1: Does button show correct text
    it('renders with text', () => {
        render(<NavButton href="/test">Click Me</NavButton>);

        // assert click me is shown if i name navbutton as click me
        expect(screen.getByText('Click Me')).toBeInTheDocument();
    });

    // test2: Does the button direct you to the correct link?
    it('has correct href', () => {
        render(<NavButton href="/treasure/start">Start</NavButton>);
        const link = screen.getByRole('link');

        // assert button takes you to specified link
        expect(link).toHaveAttribute('href', '/treasure/start');
    });
});