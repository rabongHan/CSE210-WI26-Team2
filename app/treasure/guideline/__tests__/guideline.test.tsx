// DOM (Document Object Model): a programming interface for web documents 
// that represents the page structure as a tree of objects.
// Each element, attribute, and piece of text in the HTML document is 
// represented as a node in this tree.

// (1) render: renders a react compnent into a virtual DOM for testing
// (2) screen: provides access to the rendered DOM elements for querying
import { render, screen } from '@testing-library/react';
import TreasureGuidelinesPage from '@/app/treasure/guideline/page';
// For Node versions before 25.x, you have to import the jest-dom manually
// For Node versions 25.x and later, Jest includes these matchers by default, 
// so this import is not necessary.
import '@testing-library/jest-dom'; 

describe('TreasureGuidelinesPage', () => {
    // Test1
    it('renders the header', () => {
        render(<TreasureGuidelinesPage />);

        expect(screen.getByText('Treasure Game')).toBeInTheDocument();
        expect(screen.getByText(/Guidelines/)).toBeInTheDocument();
        // /Guidelines/ is a regex that matches any text containing "Guidelines"
    });

    // Test2
    it('renders all rule boxes', () => {
        render(<TreasureGuidelinesPage />);

        // There should be 8 rules shown (divisible by 2,3,4,5,6,7,8,9)
        expect(screen.getAllByText(/Divisible by/)).toHaveLength(8)
    });

    // Test3
    it('renders navigation buttons', () => {
        render(<TreasureGuidelinesPage />);

        expect(screen.getByText('Next')).toBeInTheDocument();
        expect(screen.getByText('Back')).toBeInTheDocument();
    });

    /* Test4
     * (1) .closest('a') is DOM method that, when called on an element,
     *     returns the nearest ancestor element (in this case, <a> tag)
     * (2) toHaveAttribute('href', '/treasure/how-to-play') checks if 
     *     the found <a> tag has the correct href attribute 
     *     pointing to the previous page.
    */
    it('Back button links to the previous page', () => {
        render(<TreasureGuidelinesPage />);
        const backButtonLink = screen.getByText('Back').closest('a');
        expect(backButtonLink).toHaveAttribute('href', '/treasure/how-to-play');
    });

    // Test5
    it('redirects to treasure main site when Treasure Game is clicked', () => {
        render(<TreasureGuidelinesPage />);
        const headerLink = screen.getByText('Treasure Game').closest('a');
        expect(headerLink).toHaveAttribute('href', '/treasure');
    });

});