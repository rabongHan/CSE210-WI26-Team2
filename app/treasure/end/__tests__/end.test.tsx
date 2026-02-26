import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import TreasureEndPage from "@/app/treasure/end/page";

const pushMock = jest.fn();
const getMock = jest.fn();

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
    useSearchParams: () => ({
        get: getMock,
    }),
}));

describe("TreasureEndPage", () => {
    beforeEach(() => {
        pushMock.mockReset();
        getMock.mockReset();
    });

    it("renders win content from search params", () => {
        getMock.mockImplementation((key: string) => {
            if (key === "status") return "won";
            if (key === "score") return "500";
            if (key === "level") return "12";
            return null;
        });

        render(<TreasureEndPage />);

        expect(screen.getByText("You Win!")).toBeInTheDocument();
        expect(screen.getByText("Score: 500")).toBeInTheDocument();
        expect(screen.getByText("Level Reached: 12")).toBeInTheDocument();
    });

    it("renders lose content from search params", () => {
        getMock.mockImplementation((key: string) => {
            if (key === "status") return "lost";
            if (key === "score") return "250";
            if (key === "level") return "6";
            return null;
        });

        render(<TreasureEndPage />);

        expect(screen.getByText("Game Over")).toBeInTheDocument();
        expect(screen.getByText("Score: 250")).toBeInTheDocument();
        expect(screen.getByText("Level Reached: 6")).toBeInTheDocument();
    });

    it("defaults score/level to 0 if missing", () => {
        getMock.mockImplementation((key: string) => {
            if (key === "status") return "lost";
            return null;
        });

        render(<TreasureEndPage />);

        expect(screen.getByText("Score: 0")).toBeInTheDocument();
        expect(screen.getByText("Level Reached: 0")).toBeInTheDocument();
    });

    it("navigates on Retry and Return to Home", async () => {
        const user = userEvent.setup();
        getMock.mockImplementation((key: string) => {
            if (key === "status") return "won";
            if (key === "score") return "500";
            if (key === "level") return "10";
            return null;
        });

        render(<TreasureEndPage />);

        await user.click(screen.getByRole("button", { name: "Retry" }));
        expect(pushMock).toHaveBeenCalledWith("/treasure/guideline");

        await user.click(screen.getByRole("button", { name: "Return to Home" }));
        expect(pushMock).toHaveBeenCalledWith("/");
    });
});

