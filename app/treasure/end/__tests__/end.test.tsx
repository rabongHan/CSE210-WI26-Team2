import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import TreasureEndPage from "@/app/treasure/end/page";

const pushMock = jest.fn();

// Page includes TreasureGameProvider, which uses next/navigation useRouter().
// Mock router APIs because this unit test is not running inside Next App Router.
jest.mock("next/navigation", () => ({
    useRouter: () => ({
        push: pushMock,
        replace: jest.fn(),
        prefetch: jest.fn(),
        back: jest.fn(),
        forward: jest.fn(),
        refresh: jest.fn(),
    }),
}));

describe("TreasureEndPage", () => {
    beforeEach(() => {
        pushMock.mockReset();
        localStorage.clear();
    });

    it("renders win content from localStorage", () => {
        localStorage.setItem(
            "progress.treasure",
            JSON.stringify({
                status: "won",
                curr_score: 500,
                total_lives: 2,
                largest_number: 1237,
                level: 12,
            }),
        );

        render(<TreasureEndPage />);

        expect(screen.getByText("You Win!")).toBeInTheDocument();
        expect(screen.getByText("Score: 500")).toBeInTheDocument();
        expect(screen.getByText("Level Reached: 12")).toBeInTheDocument();
    });

    it("renders lose content from localStorage", () => {
        localStorage.setItem(
            "progress.treasure",
            JSON.stringify({
                status: "lost",
                curr_score: 250,
                total_lives: 0,
                largest_number: 999,
                level: 6,
            }),
        );

        render(<TreasureEndPage />);

        expect(screen.getByText("Game Over")).toBeInTheDocument();
        expect(screen.getByText("Score: 250")).toBeInTheDocument();
        expect(screen.getByText("Level Reached: 6")).toBeInTheDocument();
    });

    it("defaults score/level to 0 if nothing is stored", () => {
        localStorage.removeItem("progress.treasure");

        render(<TreasureEndPage />);

        expect(screen.getByText("Score: 0")).toBeInTheDocument();
        expect(screen.getByText("Level Reached: 0")).toBeInTheDocument();
    });

    it("navigates on Retry, Return to Home, and Start the Next Game", async () => {
        const user = userEvent.setup();
        localStorage.setItem(
            "progress.treasure",
            JSON.stringify({
                status: "won",
                curr_score: 500,
                total_lives: 1,
                largest_number: 1500,
                level: 10,
            }),
        );

        render(<TreasureEndPage />);

        await user.click(screen.getByRole("button", { name: "Retry" }));
        expect(pushMock).toHaveBeenCalledWith("/treasure/guideline");

        await user.click(screen.getByRole("button", { name: "Return to Home" }));
        expect(pushMock).toHaveBeenCalledWith("/");

        await user.click(screen.getByRole("button", { name: "Start the Next Game!" }));
        expect(pushMock).toHaveBeenCalledWith("/bubble/menu");
    });
});
