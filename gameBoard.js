import Ship from "./ship.js";

export default function GameBoard() {
    const board = [];
    const hits = [];
    const ships = [];

    function getRandomCoords() {
        const x = Math.floor(Math.random() * 10);
        const y = Math.floor(Math.random() * 10);
        return [x, y];
    }

    function getPossibleMoves(length, direction, x, y) {
        const possibleMoves = [];
        if (direction === "vertical") {
            for (let i = 0; i < length; i++) {
                possibleMoves.push([x, y + i]);
            }
        }
        if (direction === "horizontal") {
            for (let i = 0; i < length; i++) {
                possibleMoves.push([x + i, y]);
            }
        }
        return possibleMoves;
    }

    function checkInvalid(coords) {
        const [x, y] = coords;
        if (x > 9 || x < 0 || y > 9 || y < 0) {
            return true;
        }
        return false;
    }

    function areValidMoves(possibleMoves) {
        for (const move of possibleMoves) {
            if (board[move] || checkInvalid(move)) {
                return false;
            }
        }
        return true;
    }

    function placeShip(length, direction, [x, y]) {
        const possibleMoves = getPossibleMoves(length, direction, x, y);
        if (!areValidMoves(possibleMoves)) return false;
        const ship = Ship(length);
        ships.push(ship);
        for (const move of possibleMoves) {
            board[move] = ship;
        }
        return board;
    }

    function randomPlaceShip(length) {
        const direction = (() => {
            if (Math.floor(Math.random() * 2)) return "horizontal";
            return "vertical";
        })();

        // Randomly generate coords until valid space then place
        let coords = getRandomCoords();
        while (placeShip(length, direction, coords) === false) {
            coords = getRandomCoords();
        }
    }

    function randomPlaceShips() {
        randomPlaceShip(5);
        randomPlaceShip(4);
        randomPlaceShip(3);
        randomPlaceShip(3);
        randomPlaceShip(2);
        return board;
    }

    function receiveAttack(coords) {
        if (hits[coords] || checkInvalid(coords)) return false;
        if (board[coords]) {
            hits[coords] = "hit";
            return board[coords].hit();
        }
        hits[coords] = "miss";
        return "miss";
    }

    function isGameOver() {
        return ships.every((ship) => ship.isSunk());
    }

    function allShipsPlaced() {
        return ships.length === 5;
    }

    return {
        hits,
        getRandomCoords,
        placeShip,
        receiveAttack,
        randomPlaceShips,
        allShipsPlaced,
        isGameOver
    };
}
