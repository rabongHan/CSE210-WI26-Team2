// Save the game information in local storage after every round

export function saveEndGame(wonGame: boolean) {
    // whether or not the player won the prime testing game
    localStorage.setItem('primeWon', btoa(wonGame.toString()));
}