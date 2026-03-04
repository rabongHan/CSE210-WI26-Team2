import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import EndGameScreen from '../../components/EndGameScreen';
import { createIncorrectGuess, splitIncorrectGuesses } from '../gameLogic';

describe('Incorrect guess tracking and summary display', () => {
  it('stores incorrect guesses and splits them into prime/composite groups', () => {
    const guesses = [
      createIncorrectGuess(113, true),
      createIncorrectGuess(121, false),
      createIncorrectGuess(127, true),
      createIncorrectGuess(133, false),
    ];

    const { primeGuesses, compositeGuesses } = splitIncorrectGuesses(guesses);

    expect(primeGuesses.map(g => g.num)).toEqual([113, 127]);
    expect(compositeGuesses.map(g => g.num)).toEqual([121, 133]);
    expect(compositeGuesses[0].compositeRule).toBeGreaterThan(0);
    expect(compositeGuesses[1].compositeRule).toBeGreaterThan(0);
  });

  it('displays incorrect prime and composite guesses in separate lists at end game', () => {
    const incorrectGuesses = [
      createIncorrectGuess(113, true),
      createIncorrectGuess(121, false),
    ];

    render(
      <EndGameScreen
        message="Game over!"
        color="red"
        onPlayAgain={() => {}}
        incorrectGuesses={incorrectGuesses}
        correctGuesses={[]}
      />
    );

    expect(screen.getByText('Incorrect Prime Guesses')).toBeInTheDocument();
    expect(screen.getByText('Incorrect Composite Guesses')).toBeInTheDocument();

    expect(screen.getByText('113 is prime')).toBeInTheDocument();

    const compositeLine = screen.getByText((content) => content.includes('121:'));
    expect(compositeLine).toBeInTheDocument();
    expect(compositeLine.textContent).toContain('rule');
  });
});
