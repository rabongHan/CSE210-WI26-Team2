// Save the game information in local storage after every round

export function saveEndGame(wonGame: boolean) {
    // whether or not the player won the prime testing game
    localStorage.setItem('primeWon', btoa(wonGame.toString()));
}

export function saveGameData(gameData) {
    // save the game data in local storage, encoding it as a string
    localStorage.setItem('primeGameData', btoa(JSON.stringify(gameData)));
}