import Player from "./player.js";
import DOM from "./DOM.js";

export default function battleShip() {
    const humanPlayer = new Player("Player 1");
    const botPlayer = new Player("Player 2");

    (function placeShips() {
        botPlayer.gameBoard.randomPlaceShips();

        const humanBoard = (async () => {
            let board;

            const carrierCords = await DOM.placeShip(5);
            board = humanPlayer.gameBoard.placeShip(
                5,
                DOM.getDirection(),
                carrierCords
            );
            DOM.placeShips(board, "human");

            const battleshipCords = await DOM.placeShip(4);
            board = humanPlayer.gameBoard.placeShip(
                4,
                DOM.getDirection(),
                battleshipCords
            );
            DOM.placeShips(board, "human");

            const destroyerCords = await DOM.placeShip(3);
            board = humanPlayer.gameBoard.placeShip(
                3,
                DOM.getDirection(),
                destroyerCords
            );
            DOM.placeShips(board, "human");

            const submarineCords = await DOM.placeShip(3);
            board = humanPlayer.gameBoard.placeShip(
                3,
                DOM.getDirection(),
                submarineCords
            );
            DOM.placeShips(board, "human");

            const patrolBoatCoords = await DOM.placeShip(2);
            board = humanPlayer.gameBoard.placeShip(
                2,
                DOM.getDirection(),
                patrolBoatCoords
            );
            return board;
        })();

        humanBoard.then((board) => {
            DOM.placeShips(board, "human");
            game();
        });
    })();

    async function game() {
        DOM.displayMessage("Game begins");
        console.log("game begins");
        while (
            !(
                humanPlayer.gameBoard.isGameOver() ||
                botPlayer.gameBoard.isGameOver()
            )
        ) {
            // Human attack
            while (true) {
                const coords = await DOM.getClick();
                const success = humanPlayer.attack(
                    botPlayer,
                    coords.split(",")
                );
                console.log(success);
                if (success) {
                    DOM.updateGrid(botPlayer);
                    break;
                }
            }

            // Bot attack
            while (true) {
                if (botPlayer.attack(humanPlayer)) {
                    DOM.updateGrid(humanPlayer);
                    break;
                }
            }
        }

        // Display Winner
        if (humanPlayer.gameBoard.isGameOver()) {
            console.log(humanPlayer.gameBoard.isGameOver());
            DOM.displayMessage(`${botPlayer.name} won the game!`);
        } else {
            DOM.displayMessage(`${humanPlayer.name} won the game!`);
        }
    }
}
