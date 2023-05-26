import Player from "./player.js";
import DOM from "./DOM.js";

export default function battleShip() {
    const humanPlayer = new Player("Player 1");
    const botPlayer = new Player("Player 2");

    // const botBoard = botPlayer.gameBoard.randomPlaceShips();

    // To be added later - place each ship from DOM and call allShipsPlaced()
    // on gameboard to determine when the game starts

    const humanBoard = (async () => {
        let board;
        const carrierCords = await DOM.placeShip(5);
        board = humanPlayer.gameBoard.placeShip(5, DOM.getDirection(), carrierCords);
        DOM.placeShips(board, "human");

        const battleshipCords = await DOM.placeShip(4);
        board = humanPlayer.gameBoard.placeShip(4, DOM.getDirection(), battleshipCords);
        DOM.placeShips(board, "human");

        const destroyerCords = await DOM.placeShip(3);
        board = humanPlayer.gameBoard.placeShip(3, DOM.getDirection(), destroyerCords);
        DOM.placeShips(board, "human");

        const submarineCords = await DOM.placeShip(3);
        board = humanPlayer.gameBoard.placeShip(3, DOM.getDirection(), submarineCords);
        DOM.placeShips(board, "human");

        const patrolBoatCoords = await DOM.placeShip(2);
        board = humanPlayer.gameBoard.placeShip(2, DOM.getDirection(), patrolBoatCoords);
        return board;
    })();

    humanBoard.then((board) => {
        DOM.placeShips(board, "human");
        game();
    });

    // DOM.placeShips(botBoard, "bot");

    // DOM.updateGrid(humanPlayer);
    function game() {
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
}
