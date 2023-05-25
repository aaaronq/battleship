const DOM = (function DOM() {
    function getUserInput() {
        console.log("getuserinput");
    }
    function displayWin(winnerName) {
        console.log(`${winnerName} won the game!`);
    }

    function generateGrid() {
        const grid = document.createElement("div");
        grid.classList.add("grid");
        for (let i = 0; i < 10; i++) {
            for (let j = 0; j < 10; j++) {
                const square = document.createElement("div");
                square.classList.add("square");
                square.dataset.coords = `[${i}, ${j}]`;
                grid.appendChild(square);
            }
        }
        return grid;
    }

    const grids = document.querySelector(".grid-container");
    const humanGrid = generateGrid();
    humanGrid.id = "humanGrid";
    const botGrid = generateGrid();
    botGrid.id = "botGrid";
    grids.appendChild(humanGrid);
    grids.appendChild(botGrid);

    function placeShips(board, player) {
        let grid;
        player === "human" ? (grid = humanGrid) : (grid = botGrid);
        const shipcoords = Object.keys(board);
        shipcoords.forEach((ship) => {
            const [x, y] = ship.split(",");
            const square = grid.querySelector(`[data-coords="[${x}, ${y}]"]`);
            square.classList.add("ship");
        });
    }

    function updateGrid(player) {
        console.log("foo");
        let grid;
        if (player.name === "Player 1") {
            grid = humanGrid;
        } else {
            grid = botGrid;
        }
        let hits = player.gameBoard.hits;
        hits.forEach((hit) => {
            const square = grid.querySelector(`[data-coords=${hit}]`);
        });
    }

    // Async function to get a single coordinate input from user
    function getClick() {
        return new Promise((resolve) => {
            const squares = humanGrid.childNodes;
            console.log(squares);

            const getCoords = (square) => resolve(square.dataset.coords);

            function cleanup() {
                squares.forEach((square) => {
                    square.removeEventListener("click", getCoords);
                    square.classList.remove("hoverable");
                });
            }

            squares.forEach((square) => {
                square.classList.add("hoverable");
                square.addEventListener("click", () => {
                    cleanup();
                    getCoords(square);
                });
            });
        });
    }

    // getClick().then((coords) => console.log(coords));

    function placeShip(size, direction) {
        return new Promise((resolve) => {
            const squares = humanGrid.childNodes;

            const getCoords = (square) => resolve(square.dataset.coords);

            function highlightShip(square) {
                // Get the adjacent squares
                const toBeHighlight = [square];
                console.log(square.dataset.coords); // BUG - CURRENTLY RETURNS [0, 0] STRING - NEED TO REMOVE BRACKETS OR ELSE X AND Y ARENT RETURNED PROPERLY
                const [x, y] = square.dataset.coords.split(",");
                if (direction === "vertical") {
                    for (let i = 1; i < size; i++) {
                        const newY = y + i;
                        console.log(newY);
                        if (newY < 10) {
                            const adjacent = humanGrid.querySelector(
                                `[data-coords="[${x}, ${newY}]"]`
                            );
                            toBeHighlight.push(adjacent);
                        }
                    }
                } else {
                    for (let i = 1; i < size; i++) {
                        const newX = x + i;
                        if (newX < 10) {
                            const adjacent = humanGrid.querySelector(
                                `[data-coords="[${x}, ${newX}]"]`
                            );
                            toBeHighlight.push(adjacent);
                        }
                    }
                }
                // Highlight squares
                toBeHighlight.forEach((highlight) => {
                    if (toBeHighlight.length === size) {
                        highlight.classList.toggle("placingValid");
                    } else {
                        highlight.classList.toggle("placingInvalid");
                    }
                });
            }

            function cleanup() {
                squares.forEach((square) => {
                    square.removeEventListener("click", getCoords);
                    square.removeEventListener(
                        "mouseover",
                        highlightShip(square)
                    );
                    square.removeEventListener(
                        "mouseout",
                        highlightShip(square)
                    );
                });
            }

            squares.forEach((square) => {
                square.addEventListener("mouseover", highlightShip(square));
                square.addEventListener("mouseout", highlightShip(square));
                square.addEventListener("click", () => {
                    cleanup();
                    getCoords(square);
                });
            });
        });
    }

    placeShip(5, "vertical");

    return {
        getClick,
        getUserInput,
        updateGrid,
        displayWin,
        placeShips
    };
})();

export default DOM;
