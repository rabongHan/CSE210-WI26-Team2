import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import TreasureGamePage from "@/app/treasure/game/page";

// since page.tsx uses useRouter, we need to mock next/navigation 
// to prevent test fail
jest.mock("next/navigation", () => ({
    useRouter: () => ({
        push: jest.fn(),
        replace: jest.fn(),
        prefetch: jest.fn(),
        back: jest.fn(),
        forward: jest.fn(),
        refresh: jest.fn(),
    }),
}));

describe("TreasureGame page", () => {
    it("renders the header and game state (score, level)", () => {
        render(<TreasureGamePage />);
        expect(screen.getByText("Treasure Game")).toBeInTheDocument();
        expect(screen.getByText(/Score/)).toBeInTheDocument();
        expect(screen.getByText(/Level/)).toBeInTheDocument();
        // heart tested in hearts.test.tsx
    });

    it("renders the current number", () => {
        render(<TreasureGamePage />);
        // The number is dynamic, so check for the number-box class
        expect(document.querySelector(".number-box")).toBeInTheDocument();
    });

    it("renders rule option boxes", () => {
        render(<TreasureGamePage />);
        // There should be multiple rule option boxes
        const ruleOptionBoxes = document.querySelectorAll(".grid .primary-box");
        expect(ruleOptionBoxes.length).toEqual(6);
        // 6 rule options
    });

    it("renders Submit and Back buttons", () => {
        render(<TreasureGamePage />);
        expect(screen.getByText("Submit")).toBeInTheDocument();
        expect(screen.getByText("Back")).toBeInTheDocument();
    });

    it("adds border to rule option box after selecting", async () => {
        render(<TreasureGamePage />);
        const ruleBoxes = document.querySelectorAll(".grid .primary-box");
        const firstBox = ruleBoxes[0];
        expect(firstBox).toHaveClass("border-transparent"); // Initially transparent

        await userEvent.click(firstBox);

        expect(firstBox).not.toHaveClass("border-transparent");
        expect(firstBox).toHaveClass("border-4");
    });
});
