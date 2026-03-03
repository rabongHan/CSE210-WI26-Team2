// Save the game information in local storage after every round

export function saveEndGame(wonGame: boolean) {
    // whether or not the player won the prime testing game
    localStorage.setItem('primeWon', btoa(wonGame.toString()));
}

export function saveGameData(gameData) {
    // save the game data in local storage, encoding it as a string
    localStorage.setItem('primeGameData', btoa(JSON.stringify(gameData)));
}

export function loadEndGame() {
    // load whether or not the player won the prime testing game from local storage, decoding it from a string
    const data = localStorage.getItem('primeWon');
    if (data) {
        return JSON.parse(atob(data));
    }
    return null;
}

export function loadGameData() {
    // load the game data from local storage, decoding it from a string
    const data = localStorage.getItem('primeGameData');
    if (data) {
        return JSON.parse(atob(data));
    }
    return null;
}