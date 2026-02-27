
// Prime number divisibility rules (X is divisibile by 2 if Y). only 2-9.
export type RuleId = 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;
// Game status to determine if the user is still playing, has won, or has lost.
export type GameStatus = "playing" | "won" | "lost";

// UI reads from this to render number, boxes, and level/score/lives
export type GameState = {
    
    currentNumber: number; // currently displayed number

    ruleOptions: RuleId[]; // all displayed rules/boxes to choose from

    selectedRules: RuleId[]; // rules/boxes currently selected by the user

    // Move on to next level after feedback.
    level: number;

    // used to display score that user got from answering correctly
    // partial points   -> score += 150
    // incorrect points -> score += 0 
    // correct points   -> score += 300
    score: number; // 
    
    // used to display number of lives from 0-3. 
    // incorrect/partial incorrect decrements 1
    // when lives = 0 redirect to final page.
    lives: number; // 

    // explicit game status so UI can render playing/win/lose states cleanly
    status: GameStatus;
};

// After the user clicks the submit button
export type SubmitResult = {
    isCorrect: boolean; // to check if the answer is correct or not
    correctRules: RuleId[]; // to display the correct rules after submission
    incorrectRules: RuleId[]; // to display the incorrect rules after submission
    
};

// API that UI can call to interact with game logic
export type TreasureGameAPI = {
    // display current state from backend
    state: GameState;
    // user selects a box option
    toggleRule: (ruleId: RuleId) => void;
    
    // user submits answer
    submitAnswer: () => SubmitResult;
    
    // move to next round
    nextRound: () => void;

    // OPTIONAL: reset game to initial state
    resetGame?: () => void;

    feedback: {
        show: boolean;
        result: SubmitResult | null;
        selectedRules: RuleId[];
    }
};
