import GameBoard from "./gameBoard.js";

export default function Player(name) {
    const gameBoard = GameBoard();

    function getBotCoords(pastHits) {
        // Check if coords already hit
        function checkIfHit(coords) {
            if (pastHits[coords]) return true;
            return false;
        }

        // Get list of successful hits
        const hits = Object.keys(pastHits).filter(
            (hit) => pastHits[hit] === "hit"
        );

        if (hits.length === 0) return gameBoard.getRandomCoords();

        // Check adjacent squares to those hits     BROKEN
        let coords = null;

        hits.forEach((hit) => {
            const [x, y] = hit.split(",");
            for (let i = -1; i < 2; i++) {
                for (let j = -1; j < 2; j++) {
                    const newCoords = [+x + j, +y + i];
                    if (
                        !(
                            checkIfHit(newCoords) ||
                            gameBoard.checkInvalid(newCoords)
                        )
                    ) {
                        coords = newCoords;
                        return;
                    }
                }
            }
        });

        if (coords) {
            return coords;
        }

        return gameBoard.getRandomCoords();
    }

    function attack(opponent, coords) {
        if (coords !== undefined && !Array.isArray(coords)) return false;
        let attackCoords = coords;
        // Handle bots input
        if (!attackCoords) {
            attackCoords = getBotCoords(opponent.gameBoard.hits);
        }
        return opponent.gameBoard.receiveAttack(attackCoords);
    }
    return {
        name,
        gameBoard,
        attack
    };
}
