import Player from "./player";

function battleShip() {
    const humanPlayer = new Player("Player 1");
    const botPlayer = new Player("Player 2");

    botPlayer.gameBoard.randomPlaceShips();

    // To be added later - place each ship from DOM and call allShipsPlaced()
    // on gameboard to determine when the game starts
    humanPlayer.gameBoard.randomPlaceShips();
}

battleShip();
