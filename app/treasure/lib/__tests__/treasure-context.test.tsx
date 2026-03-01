import React, { useState } from "react";
import "@testing-library/jest-dom";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { TreasureGameProvider, useTreasureGame } from "../treasure-context";
import type { RuleId, SubmitResult } from "../types";
import { generateRound } from "../treasure-game-logic";
import { saveTreasureResult } from "../treasure-progress";

jest.mock("../treasure-game-logic", () => {
  const actual = jest.requireActual("../treasure-game-logic");
  return {
    ...actual,
    generateRound: jest.fn(),
  };
});

jest.mock("../treasure-progress", () => ({
  saveTreasureResult: jest.fn(),
}));

function Harness() {
  const game = useTreasureGame();
  const [lastSubmit, setLastSubmit] = useState<SubmitResult | null>(null);

  return (
    <div>
      <div data-testid="number">{game.state.currentNumber}</div>
      <div data-testid="level">{game.state.level}</div>
      <div data-testid="score">{game.state.score}</div>
      <div data-testid="lives">{game.state.lives}</div>
      <div data-testid="status">{game.state.status}</div>
      <div data-testid="selected">{game.state.selectedRules.join(",")}</div>
      <button onClick={() => game.toggleRule(2)}>toggle-2</button>
      <button onClick={() => game.toggleRule(3)}>toggle-3</button>
      <button onClick={() => game.toggleRule(4)}>toggle-4</button>
      <button onClick={() => game.toggleRule(5)}>toggle-5</button>
      <button onClick={() => game.toggleRule(6)}>toggle-6</button>
      <button onClick={() => setLastSubmit(game.submitAnswer())}>submit</button>
      <button onClick={() => game.nextRound()}>next</button>
      <div data-testid="submit-correct">
        {lastSubmit ? String(lastSubmit.isCorrect) : "none"}
      </div>
      <div data-testid="submit-incorrect">
        {lastSubmit ? lastSubmit.incorrectRules.join(",") : ""}
      </div>
    </div>
  );
}

function mockRound(
  currentNumber: number,
  correctRules: RuleId[],
  ruleOptions: RuleId[] = [2, 3, 4, 5, 6, 7]
) {
  return { currentNumber, correctRules, ruleOptions };
}

describe("TreasureGameProvider", () => {
  const mockGenerateRound = generateRound as jest.MockedFunction<
    typeof generateRound
  >;
  const mockSaveTreasureResult = saveTreasureResult as jest.MockedFunction<
    typeof saveTreasureResult
  >;

  beforeEach(() => {
    mockGenerateRound.mockReset();
    mockSaveTreasureResult.mockReset();
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  test("hydrates initial round from generateRound", async () => {
    mockGenerateRound.mockReturnValue(mockRound(12, [2, 3, 4, 6]));

    render(
      <TreasureGameProvider>
        <Harness />
      </TreasureGameProvider>
    );

    await waitFor(() => {
      expect(screen.getByTestId("number")).toHaveTextContent("12");
    });
    expect(screen.getByTestId("status")).toHaveTextContent("playing");
  });

  test("correct submit awards full score, keeps lives, and clears selection", async () => {
    const user = userEvent.setup();
    mockGenerateRound.mockReturnValue(mockRound(12, [2, 3, 4, 6]));

    render(
      <TreasureGameProvider>
        <Harness />
      </TreasureGameProvider>
    );

    await waitFor(() => {
      expect(screen.getByTestId("number")).toHaveTextContent("12");
    });

    await user.click(screen.getByRole("button", { name: "toggle-2" }));
    await user.click(screen.getByRole("button", { name: "toggle-3" }));
    await user.click(screen.getByRole("button", { name: "toggle-4" }));
    await user.click(screen.getByRole("button", { name: "toggle-6" }));
    await user.click(screen.getByRole("button", { name: "submit" }));

    expect(screen.getByTestId("submit-correct")).toHaveTextContent("true");
    expect(screen.getByTestId("score")).toHaveTextContent("50");
    expect(screen.getByTestId("lives")).toHaveTextContent("3");
    expect(screen.getByTestId("selected")).toHaveTextContent("");
  });

  test("partial submit awards partial score and decrements one life", async () => {
    const user = userEvent.setup();
    mockGenerateRound.mockReturnValue(mockRound(12, [2, 3, 4, 6]));

    render(
      <TreasureGameProvider>
        <Harness />
      </TreasureGameProvider>
    );

    await waitFor(() => {
      expect(screen.getByTestId("number")).toHaveTextContent("12");
    });

    await user.click(screen.getByRole("button", { name: "toggle-2" }));
    await user.click(screen.getByRole("button", { name: "toggle-5" }));
    await user.click(screen.getByRole("button", { name: "submit" }));

    expect(screen.getByTestId("submit-correct")).toHaveTextContent("false");
    expect(screen.getByTestId("submit-incorrect")).toHaveTextContent("5");
    expect(screen.getByTestId("score")).toHaveTextContent("25");
    expect(screen.getByTestId("lives")).toHaveTextContent("2");
  });

  test("nextRound increments level and loads a new round", async () => {
    const user = userEvent.setup();
    mockGenerateRound
      .mockImplementationOnce(() => mockRound(12, [2, 3, 4, 6]))
      .mockImplementationOnce(() => mockRound(18, [2, 3, 6, 9]));

    render(
      <TreasureGameProvider>
        <Harness />
      </TreasureGameProvider>
    );

    await waitFor(() => {
      expect(screen.getByTestId("number")).toHaveTextContent("12");
    });
    const initialLevel = Number(screen.getByTestId("level").textContent);

    await user.click(screen.getByRole("button", { name: "next" }));

    expect(screen.getByTestId("number")).toHaveTextContent("18");
    expect(screen.getByTestId("level")).toHaveTextContent(initialLevel + 1);
    expect(screen.getByTestId("selected")).toHaveTextContent("");
  });

  test("saves the highest number reached when game ends", async () => {
    const user = userEvent.setup();
    mockGenerateRound
      .mockImplementationOnce(() => mockRound(12, [2, 3, 4, 6]))   // initial
      .mockImplementationOnce(() => mockRound(99, [3, 9]))          // higher
      .mockImplementationOnce(() => mockRound(18, [2, 3, 6, 9]));   // lower

    render(
      <TreasureGameProvider>
        <Harness />
      </TreasureGameProvider>
    );

    await waitFor(() => {
      expect(screen.getByTestId("number")).toHaveTextContent("12");
    });

    await user.click(screen.getByRole("button", { name: "next" }));
    expect(screen.getByTestId("number")).toHaveTextContent("99");

    await user.click(screen.getByRole("button", { name: "next" }));
    expect(screen.getByTestId("number")).toHaveTextContent("18");

    // Submit wrong answers three times at number 18 to lose all lives.
    for (let i = 0; i < 3; i++) {
      await user.click(screen.getByRole("button", { name: "toggle-5" }));
      await user.click(screen.getByRole("button", { name: "submit" }));
    }

    expect(screen.getByTestId("status")).toHaveTextContent("lost");
    expect(mockSaveTreasureResult).toHaveBeenCalledWith({
      status: "lost",
      curr_score: 0,
      total_lives: 0,
      largest_number: 99,
    });
  });
});
