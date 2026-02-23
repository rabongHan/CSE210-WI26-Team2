import React from "react";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import {
  BubbleGameProvider,
  useBubbleGame,
  INITIAL_LIVES,
} from "./bubble-context";
import {isCorrectAnswer} from "./bubble-game-logic";

// Helper: finds a number that isCorrectAnswer returns true/false for.
// Searches 1–200 so it works no matter what logic the teammate implements.
function findAnswer(factor: number, wantCorrect: boolean): number | undefined {
  // Start at 2 to skip trivial factor 1 (which doesn't change game state)
  for (let n = 2; n <= 200; n++) {
    if (isCorrectAnswer(n, factor) === wantCorrect) return n;
  }
  return undefined;
}

// Dynamically finds a correct and wrong answer based on the current factor.
function Harness() {
  const { lives, status, bubbles, factor, round, handleBubbleClick, resetGame } =
    useBubbleGame();

  const correctNum = findAnswer(factor, true);
  const wrongNum = findAnswer(factor, false);

  return (
    <div>
      <div data-testid="lives">{lives}</div>
      <div data-testid="status">{status}</div>
      <div data-testid="factor">{factor}</div>
      <div data-testid="bubble-count">{bubbles.length}</div>
      <div data-testid="round">{round}</div>
      {wrongNum !== undefined && (
        <button onClick={() => handleBubbleClick(wrongNum)}>click-wrong</button>
      )}
      {correctNum !== undefined && (
        <button onClick={() => handleBubbleClick(correctNum)}>click-correct</button>
      )}
      <button onClick={() => resetGame()}>reset</button>
    </div>
  );
}

// Successful path 

test("num_hearts starts at 3 when bubble game is started", () => {
  render(
    <BubbleGameProvider>
      <Harness />
    </BubbleGameProvider>
  );

  expect(screen.getByTestId("lives")).toHaveTextContent(String(INITIAL_LIVES));
  expect(INITIAL_LIVES).toBe(3);
});

test("game status is 'playing' on start", () => {
  render(
    <BubbleGameProvider>
      <Harness />
    </BubbleGameProvider>
  );

  expect(screen.getByTestId("status")).toHaveTextContent("playing");
});

test("correct click does NOT decrement lives", async () => {
  const user = userEvent.setup();

  render(
    <BubbleGameProvider>
      <Harness />
    </BubbleGameProvider>
  );

  expect(screen.getByTestId("lives")).toHaveTextContent("3");

  await user.click(screen.getByRole("button", { name: "click-correct" }));

  // Lives should remain at 3 after a correct answer
  expect(screen.getByTestId("lives")).toHaveTextContent("3");
});

test("correct click advances the factor (changes game state)", async () => {
  const user = userEvent.setup();

  render(
    <BubbleGameProvider>
      <Harness />
    </BubbleGameProvider>
  );

  const factorBefore = screen.getByTestId("factor").textContent;

  await user.click(screen.getByRole("button", { name: "click-correct" }));

  // After a correct click, the factor should update
  expect(screen.getByTestId("factor")).not.toHaveTextContent(factorBefore!);
});

// Unsuccessful paths 

test("num_hearts decrements by 1 after one wrong answer", async () => {
  const user = userEvent.setup();

  render(
    <BubbleGameProvider>
      <Harness />
    </BubbleGameProvider>
  );

  expect(screen.getByTestId("lives")).toHaveTextContent("3");

  await user.click(screen.getByRole("button", { name: "click-wrong" }));

  expect(screen.getByTestId("lives")).toHaveTextContent("2");
});

test("num_hearts decrements for every wrong answer", async () => {
  const user = userEvent.setup();

  render(
    <BubbleGameProvider>
      <Harness />
    </BubbleGameProvider>
  );

  // Starts at 3
  expect(screen.getByTestId("lives")).toHaveTextContent("3");

  // First wrong answer → 2
  await user.click(screen.getByRole("button", { name: "click-wrong" }));
  expect(screen.getByTestId("lives")).toHaveTextContent("2");

  // Second wrong answer → 1
  await user.click(screen.getByRole("button", { name: "click-wrong" }));
  expect(screen.getByTestId("lives")).toHaveTextContent("1");

  // Third wrong answer → 0
  await user.click(screen.getByRole("button", { name: "click-wrong" }));
  expect(screen.getByTestId("lives")).toHaveTextContent("0");
});

// Edge cases 

test("game status becomes 'lost' when lives reaches 0", async () => {
  const user = userEvent.setup();

  render(
    <BubbleGameProvider>
      <Harness />
    </BubbleGameProvider>
  );

  // Click wrong 3 times to lose all lives
  await user.click(screen.getByRole("button", { name: "click-wrong" }));
  await user.click(screen.getByRole("button", { name: "click-wrong" }));
  await user.click(screen.getByRole("button", { name: "click-wrong" }));

  expect(screen.getByTestId("lives")).toHaveTextContent("0");
  expect(screen.getByTestId("status")).toHaveTextContent("lost");
});

test("clicks are ignored after game over (lives stays at 0)", async () => {
  const user = userEvent.setup();

  render(
    <BubbleGameProvider>
      <Harness />
    </BubbleGameProvider>
  );

  // Lose all 3 lives
  await user.click(screen.getByRole("button", { name: "click-wrong" }));
  await user.click(screen.getByRole("button", { name: "click-wrong" }));
  await user.click(screen.getByRole("button", { name: "click-wrong" }));

  expect(screen.getByTestId("status")).toHaveTextContent("lost");

  // Extra click should NOT decrement below 0
  await user.click(screen.getByRole("button", { name: "click-wrong" }));

  expect(screen.getByTestId("lives")).toHaveTextContent("0");
  expect(screen.getByTestId("status")).toHaveTextContent("lost");
});

test("resetGame restores lives back to 3", async () => {
  const user = userEvent.setup();

  render(
    <BubbleGameProvider>
      <Harness />
    </BubbleGameProvider>
  );

  // Lose a life
  await user.click(screen.getByRole("button", { name: "click-wrong" }));
  expect(screen.getByTestId("lives")).toHaveTextContent("2");

  // Reset
  await user.click(screen.getByRole("button", { name: "reset" }));

  expect(screen.getByTestId("lives")).toHaveTextContent("3");
  expect(screen.getByTestId("status")).toHaveTextContent("playing");
});

test("player reaches won state after factorizing all numbers", async () => {
    const user = userEvent.setup();
    render(
      <BubbleGameProvider>
        <Harness />
      </BubbleGameProvider>
    );

    while (screen.queryByRole("button", { name: "click-correct" })) {
      await user.click(
        screen.getByRole("button", { name: "click-correct" })
      );
    }

    expect(screen.getByTestId("status")).toHaveTextContent("won");
});