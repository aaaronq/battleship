import Player from "./player";
import DOM from "./DOM";

export default function battleShip() {
    const humanPlayer = new Player("Player 1");
    const botPlayer = new Player("Player 2");

    botPlayer.gameBoard.randomPlaceShips();

    // To be added later - place each ship from DOM and call allShipsPlaced()
    // on gameboard to determine when the game starts
    humanPlayer.gameBoard.randomPlaceShips();

    while (!humanPlayer.gameBoard.isOver() || !botPlayer.gameBoard.isOver()) {
        // Human attack
        const coords = DOM.getUserInput();
        humanPlayer.attack(botPlayer, coords);

        // Bot attack
        botPlayer.attack(humanPlayer);
    }

    if (humanPlayer.gameBoard.isOver()) {
        DOM.displayWin(humanPlayer.name);
    } else {
        DOM.displayWin(botPlayer.name);
    }
}
