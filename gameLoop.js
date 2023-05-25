import Player from "./player.js";

export default function battleShip(DOM) {
    const humanPlayer = new Player("Player 1");
    const botPlayer = new Player("Player 2");

    const botBoard = botPlayer.gameBoard.randomPlaceShips();

    // To be added later - place each ship from DOM and call allShipsPlaced()
    // on gameboard to determine when the game starts
    const humanBoard = humanPlayer.gameBoard.randomPlaceShips();

    DOM.placeShips(humanBoard, "human");
    DOM.placeShips(botBoard, "bot");

    DOM.updateGrid(humanPlayer);

    while (
        !humanPlayer.gameBoard.isGameOver() ||
        !botPlayer.gameBoard.isGameOver()
    ) {
        // Human attack
        const coords = DOM.getUserInput();
        humanPlayer.attack(botPlayer, coords);

        // Bot attack
        botPlayer.attack(humanPlayer);
    }

    if (humanPlayer.gameBoard.isGameOver()) {
        DOM.displayWin(humanPlayer.name);
    } else {
        DOM.displayWin(botPlayer.name);
    }
}
