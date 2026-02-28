"use client";

import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import type { GameState, RuleId, SubmitResult, TreasureGameAPI } from "@/app/treasure/lib/types";
import {
    generateRound,
    isSelectionCorrect,
    toggleRuleOptionsSelection,
} from "@/app/treasure/lib/treasure-game-logic";

const STARTING_LEVEL = 0;
const STARTING_LIVES = 3;
const CORRECT_SCORE = 50;
const PARTIAL_SCORE = 25;
const WINNING_SCORE = 500;

// initialize object with state and correctrules
type InternalTreasureState = {
    state: GameState;
    correctRules: RuleId[];
};

// creates react context object for game API
const TreasureGameContext = createContext<TreasureGameAPI | null>(null);

// use game logic function generateRound.
function createInitialGame(): InternalTreasureState {
    return {
        state: {
            // initialize with deterministic numbers before updating with randomization
            currentNumber: 0, 
            ruleOptions: [2, 3, 4, 5, 6, 7], // displays 6 possible rule options for that number.
            selectedRules: [],
            level: STARTING_LEVEL, // start at level 1
            score: 0,
            lives: STARTING_LIVES, // start with 3 lives
            status: "playing", 
        },
        correctRules: [], // answer key (checks with selected rule options)
    };
}

type TreasureGameFeedback = {
    show: boolean;
    result: SubmitResult | null;
    selectedRules: RuleId[];
    scoreDelta: number;
    previousScore: number;
};

// component function that accepts children (UI it wraps), owns shared game state, returns context
export function TreasureGameProvider({ children }: { children: ReactNode }) {

    // initializes context with initialization and allows updates through setGame
    const [game, setGame] = useState<InternalTreasureState>(() => createInitialGame());
    
    const [feedback, setFeedback] = useState<TreasureGameFeedback>({ show: false, result: null, selectedRules: [], scoreDelta: 0, previousScore: 0 });
    
    // runs once after components mount
    useEffect(() => {
        // generate random number, its correct rules, and multiple choices.
        const round = generateRound(STARTING_LEVEL);
        setGame((prev) => ({
            ...prev,
            correctRules: round.correctRules,
            state: {
            ...prev.state,
            currentNumber: round.currentNumber,
            ruleOptions: round.ruleOptions,
            selectedRules: [],
            },
        }));
    }, []);

    // Receives which rule box user clicked (2 to 9)
    function toggleRule(ruleId: RuleId) {
        // use previous game state to update to new
        setGame((prev) => {
            // if game won or lost keep it as previous state
            if (prev.state.status !== "playing") {
                return prev;
            }

            // if already selected, create array WITHOUT clicked rule 
            // if not selected, create array WITH clicked rule
            const selectedRules = toggleRuleOptionsSelection(prev.state.selectedRules, ruleId);

            // returns new immutable updated state
            return {
                ...prev,
                state: {
                    // update previous state with new selectedRules state
                    ...prev.state,
                    selectedRules,
                },
            };
        });
    }

    // when you submit answer, get true or false.
    function submitAnswer(): SubmitResult {
        // updated based on what user selects
        const selectedRules = game.state.selectedRules;
        const correctRules = game.correctRules;
        const isCorrect = isSelectionCorrect(selectedRules, correctRules);
        const incorrectRules = selectedRules.filter((rule) => !correctRules.includes(rule));
        const selectedCorrectCount = selectedRules.filter((r) => correctRules.includes(r)).length;
        const scoreDelta = isCorrect
            ? CORRECT_SCORE
            : selectedCorrectCount > 0
                ? PARTIAL_SCORE
                : 0;

        setFeedback({ 
            show: true, 
            result: { isCorrect, correctRules, incorrectRules },
            selectedRules: [...selectedRules],
            scoreDelta,
            previousScore: game.state.score,
        });

        setGame((prev) => {
            // if game won or lost keep it as previous state

            if (prev.state.status !== "playing") {
                return prev;
            }

            // recomputes correctness from latest state
            const wasCorrect = isSelectionCorrect(prev.state.selectedRules, prev.correctRules);

            // deduplicates selected rules
            const selectedCorrectCount = prev.state.selectedRules.filter((rule) =>
                prev.correctRules.includes(rule)
            ).length;

            // determines score change (partial points, full points, no points)
            const scoreDelta = wasCorrect
                ? CORRECT_SCORE
                : selectedCorrectCount > 0
                    ? PARTIAL_SCORE
                    : 0;

            // lose a life if not fully correct. If correct keep at 0
            const livesDelta = wasCorrect ? 0 : -1;
            // Updates the score with state
            const newScore = prev.state.score + scoreDelta;
            // Updates the life with state
            const lives = Math.max(0, prev.state.lives + livesDelta);

            // if lives less than 0, then set game status as lost.
            const status = lives <= 0 
                ? "lost" 
                : newScore >= WINNING_SCORE
                    ? "won"
                    :prev.state.status;

            // return new immutable state with updates score/lives/status
            return {
                ...prev,
                state: {
                    ...prev.state,
                    score: newScore,
                    lives,
                    status,
                    selectedRules: [], // show empty selection again
                },
            };
        });

        // Returns submit result for UI with correctness and rule detials.
        return {
            isCorrect,
            correctRules,
            incorrectRules,
        };
    }

    // Moves game state forward based on current state
    function nextRound() {
        setFeedback({ show: false, result: null, selectedRules: [], scoreDelta: 0, previousScore: 0 });
        setGame((prev) => {
            if (prev.state.status !== "playing") {
                return prev;
            }

            // lose when lives = 0
            if (prev.state.lives <= 0) {
                return {
                    ...prev,
                    state: {
                        ...prev.state,
                        status: "lost",
                    },
                };
            }

            // create new random round with new number, options, answer key.
            const nextLevel = prev.state.level + 1;
            const round = generateRound(nextLevel);

            // update next game state in the next level.
            return {
                correctRules: round.correctRules,
                state: {
                    ...prev.state,
                    currentNumber: round.currentNumber,
                    ruleOptions: round.ruleOptions,
                    selectedRules: [],
                    level: nextLevel,
                },
            };
        });
    }

    // 
    const api: TreasureGameAPI = {
        state: game.state,
        toggleRule,
        submitAnswer,
        nextRound,
        feedback,
    };

    // return provider value
    return (
        <TreasureGameContext.Provider value={api}>
            {children}
        </TreasureGameContext.Provider>
    );

}

// prevent silent bugs from using hook outside provider
export function useTreasureGame() {
    // gets current context value
    const context = useContext(TreasureGameContext);

    // if value missing, component isn't wrapped in TreasureGameProvider
    if (!context) {
        throw new Error("useTreasureGame must be used within a TreasureGameProvider");
    }
    return context;
}

