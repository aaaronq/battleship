import GameBoard from "./gameBoard.js";

export default function Player(name) {
    const gameBoard = GameBoard();

    function getBotCoords(pastHits) {
        // More complex implementation possible later
        let coords = gameBoard.getRandomCoords();

        // Check if already hit
        while (pastHits[coords]) {
            coords = gameBoard.getRandomCoords();
        }

        return coords;
    }

    function attack(opponent, coords) {
        if (coords !== undefined && !Array.isArray(coords)) return;
        let attackCoords = coords;
        // Handle bots input
        if (attackCoords === undefined) {
            attackCoords = getBotCoords(opponent.gameBoard.hits);
        }
        opponent.gameBoard.receiveAttack(attackCoords);
    }
    return {
        name,
        gameBoard,
        attack
    };
}
