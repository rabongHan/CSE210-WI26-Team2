import React from "react";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import {
  BubbleGameProvider,
  useBubbleGame,
  INITIAL_LIVES,
} from "../lib/bubble-context";
import { isCorrectAnswer, getNextFactor } from "../lib/bubble-game-logic";

function findAnswer(factor: number, wantCorrect: boolean): number | undefined {
  for (let n = 2; n <= 200; n++) {
    if (isCorrectAnswer(n, factor) === wantCorrect) return n;
  }
  return undefined;
}

/**
 * Simulates both the game screen and end screen in a single tree so we can
 * test state transitions without needing router navigation.
 */
function TransitionHarness() {
  const { lives, status, bubbles, factor, handleBubbleClick, resetGame } =
    useBubbleGame();

  const correctNum = findAnswer(factor, true);
  const wrongNum = findAnswer(factor, false);

  if (status === "won" || status === "lost") {
    return (
      <div>
        <div data-testid="end-screen">
          <h1 data-testid="end-title">
            {status === "won" ? "You Win!" : "Game Over"}
          </h1>
          <div data-testid="end-status">{status}</div>
          <div data-testid="end-lives">{lives}</div>
          <div data-testid="end-factor">{factor}</div>
          <button onClick={() => resetGame()}>play-again</button>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div data-testid="game-screen">
        <div data-testid="lives">{lives}</div>
        <div data-testid="status">{status}</div>
        <div data-testid="factor">{factor}</div>
        <div data-testid="bubble-count">{bubbles.length}</div>
        {wrongNum !== undefined && (
          <button onClick={() => handleBubbleClick(wrongNum)}>
            click-wrong
          </button>
        )}
        {correctNum !== undefined && (
          <button onClick={() => handleBubbleClick(correctNum)}>
            click-correct
          </button>
        )}
      </div>
    </div>
  );
}

function renderWithProvider() {
  const user = userEvent.setup();
  render(
    <BubbleGameProvider>
      <TransitionHarness />
    </BubbleGameProvider>
  );
  return user;
}

// --- End screen state tests ---

test("end screen shows 'Game Over' after losing all lives", async () => {
  const user = renderWithProvider();

  for (let i = 0; i < INITIAL_LIVES; i++) {
    await user.click(screen.getByRole("button", { name: "click-wrong" }));
  }

  expect(screen.getByTestId("end-screen")).toBeInTheDocument();
  expect(screen.getByTestId("end-title")).toHaveTextContent("Game Over");
  expect(screen.getByTestId("end-status")).toHaveTextContent("lost");
});

test("end screen shows lives as 0 after game over", async () => {
  const user = renderWithProvider();

  for (let i = 0; i < INITIAL_LIVES; i++) {
    await user.click(screen.getByRole("button", { name: "click-wrong" }));
  }

  expect(screen.getByTestId("end-lives")).toHaveTextContent("0");
});

test("end screen shows 'You Win!' after fully factoring the number", async () => {
  const user = renderWithProvider();

  let safety = 0;
  while (screen.queryByTestId("game-screen") && safety < 50) {
    await user.click(screen.getByRole("button", { name: "click-correct" }));
    safety++;
  }

  expect(screen.getByTestId("end-screen")).toBeInTheDocument();
  expect(screen.getByTestId("end-title")).toHaveTextContent("You Win!");
  expect(screen.getByTestId("end-status")).toHaveTextContent("won");
});

test("end screen shows factor as 1 after winning", async () => {
  const user = renderWithProvider();

  let safety = 0;
  while (screen.queryByTestId("game-screen") && safety < 50) {
    await user.click(screen.getByRole("button", { name: "click-correct" }));
    safety++;
  }

  expect(screen.getByTestId("end-factor")).toHaveTextContent("1");
});

// --- Transition: end → play again ---

test("play again after game over resets to playing state", async () => {
  const user = renderWithProvider();

  for (let i = 0; i < INITIAL_LIVES; i++) {
    await user.click(screen.getByRole("button", { name: "click-wrong" }));
  }

  expect(screen.getByTestId("end-screen")).toBeInTheDocument();

  await user.click(screen.getByRole("button", { name: "play-again" }));

  expect(screen.getByTestId("game-screen")).toBeInTheDocument();
  expect(screen.getByTestId("status")).toHaveTextContent("playing");
  expect(screen.getByTestId("lives")).toHaveTextContent(String(INITIAL_LIVES));
});

test("play again after winning resets to playing state", async () => {
  const user = renderWithProvider();

  let safety = 0;
  while (screen.queryByTestId("game-screen") && safety < 50) {
    await user.click(screen.getByRole("button", { name: "click-correct" }));
    safety++;
  }

  expect(screen.getByTestId("end-screen")).toBeInTheDocument();

  await user.click(screen.getByRole("button", { name: "play-again" }));

  expect(screen.getByTestId("game-screen")).toBeInTheDocument();
  expect(screen.getByTestId("status")).toHaveTextContent("playing");
  expect(screen.getByTestId("lives")).toHaveTextContent(String(INITIAL_LIVES));
});

test("play again generates a new factor and fresh bubbles", async () => {
  const user = renderWithProvider();

  for (let i = 0; i < INITIAL_LIVES; i++) {
    await user.click(screen.getByRole("button", { name: "click-wrong" }));
  }

  await user.click(screen.getByRole("button", { name: "play-again" }));

  const factor = Number(screen.getByTestId("factor").textContent);
  const bubbleCount = Number(screen.getByTestId("bubble-count").textContent);

  expect(factor).toBeGreaterThan(1);
  expect(bubbleCount).toBeGreaterThan(0);
});

// --- Full round-trip transitions ---

test("full cycle: play → lose → play again → play → win", async () => {
  const user = renderWithProvider();

  // Lose the first game
  for (let i = 0; i < INITIAL_LIVES; i++) {
    await user.click(screen.getByRole("button", { name: "click-wrong" }));
  }
  expect(screen.getByTestId("end-status")).toHaveTextContent("lost");

  // Hit play again
  await user.click(screen.getByRole("button", { name: "play-again" }));
  expect(screen.getByTestId("game-screen")).toBeInTheDocument();

  // Win the second game
  let safety = 0;
  while (screen.queryByTestId("game-screen") && safety < 50) {
    await user.click(screen.getByRole("button", { name: "click-correct" }));
    safety++;
  }

  expect(screen.getByTestId("end-status")).toHaveTextContent("won");
  expect(screen.getByTestId("end-title")).toHaveTextContent("You Win!");
});

test("lives stay full during a winning run", async () => {
  const user = renderWithProvider();

  let safety = 0;
  while (screen.queryByTestId("game-screen") && safety < 50) {
    expect(screen.getByTestId("lives")).toHaveTextContent(
      String(INITIAL_LIVES)
    );
    await user.click(screen.getByRole("button", { name: "click-correct" }));
    safety++;
  }

  expect(screen.getByTestId("end-lives")).toHaveTextContent(
    String(INITIAL_LIVES)
  );
});
