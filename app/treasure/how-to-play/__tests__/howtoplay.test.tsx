import { render, screen, within } from "@testing-library/react";
import TreasureHowToPlay from "@/app/treasure/how-to-play/page";

describe("TreasureHowToPlay page", () => {
    // Renders main element and applies background1.png
    test("renders main layout and ensures main contains background1.png", () => {
        const { container } = render(<TreasureHowToPlay />);
        const main = container.querySelector("main");
        expect(main).toBeInTheDocument();
        expect(main?.className).toMatch(/bg-\[url\('.*background1\.png'\)\]/);
    });

    // Looks in rendered dom content and ensures a link to /treasure
    test("shows heading and subtitle with correct link", () => {
        render(<TreasureHowToPlay />);
        const headingLink = screen.getByRole("link", { name: /treasure game/i });
        expect(headingLink).toHaveAttribute("href", "/treasure");
        expect(screen.getByText(/how to play/i)).toBeInTheDocument();
    });

    // Ensures the dom content contains the 5 how to play steps 
    // and numbers corresponding for each
    test("lists five steps in order with expected text", () => {
        render(<TreasureHowToPlay />);
        const steps = [
        "Find all applicable divisibility rules for a number.",
        "If you get any wrong, you lose a life.",
        "You will get a total of 3 lives.",
        "You can get partial points for getting some correct answers.",
        "Score 350 points to open the chest!",
        ];
        steps.forEach((text, idx) => {
        const row = screen.getByText(text);
        expect(row).toBeInTheDocument();
        // check if matching number prefix is in each row
        expect(within(row.parentElement!).getByText(`${idx + 1}.`)).toBeInTheDocument();
        });
    });

    // Ensures all the current navigation buttons direct us to the correct link
    test("renders navigation buttons with correct target links", () => {
        render(<TreasureHowToPlay />);
        // next button should take you to guidelines page
        expect(screen.getByRole("button", { name: /next/i }).closest("a"))
        .toHaveAttribute("href", "/treasure/guideline");
        // next button should take you to treasure page
        expect(screen.getByRole("button", { name: /back/i }).closest("a"))
        .toHaveAttribute("href", "/treasure");
    });
});
