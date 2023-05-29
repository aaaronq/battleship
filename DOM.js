const DOM = (function DOM() {
    function getUserInput() {
        console.log("getuserinput");
    }
    function displayMessage(message) {
        document.getElementById("displayMessage").innerText = message;
    }

    function generateGrid() {
        const grid = document.createElement("div");
        grid.classList.add("grid");
        for (let i = 0; i < 10; i++) {
            for (let j = 0; j < 10; j++) {
                const square = document.createElement("div");
                square.classList.add("square");
                square.dataset.coords = `${j},${i}`;
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
            const square = grid.querySelector(`[data-coords="${x},${y}"`);
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
        const hits = player.gameBoard.hits;
        const hitKeys = Object.keys(hits);
        console.log(hitKeys);
        hitKeys.forEach((hit) => {
            const square = grid.querySelector(`[data-coords="${hit}"]`);
            if (hits[hit] === "hit") {
                square.classList.add("hit");
            } else {
                square.classList.add("miss");
            }
        });
    }

    // Async function to get a single coordinate input from user
    function getClick() {
        console.log("called");
        return new Promise((resolve) => {
            const squares = botGrid.childNodes;

            const getCoords = (square) => resolve(square.dataset.coords);

            const getCoordsHandler = (square) => {
                return () => {
                    getCoords(square);
                    cleanup();
                };
            };

            function cleanup() {
                squares.forEach((square) => {
                    square.removeEventListener(
                        "click",
                        getCoordsHandler(square)
                    );
                    square.classList.remove("hoverable");
                });
            }

            squares.forEach((square) => {
                square.classList.add("hoverable");
                square.addEventListener("click", getCoordsHandler(square));
            });
        });
    }

    // getClick().then((coords) => console.log(coords));

    // Direction handling
    let direction = "vertical";

    const directionBtn = document.getElementById("changeDirection");
    directionBtn.addEventListener("click", () => {
        if (direction === "vertical") {
            direction = "horizontal";
            directionBtn.innerText = "Direction = horizontal";
        } else {
            direction = "vertical";
            directionBtn.innerText = "Direction = vertical";
        }
    });

    const getDirection = () => direction;

    // Place a single ship
    function placeShip(size) {
        return new Promise((resolve) => {
            const squares = humanGrid.childNodes;

            function highlightShip(square) {
                // Get the adjacent squares
                const toBeHighlight = [square];
                const [x, y] = square.dataset.coords.split(",");
                if (direction === "vertical") {
                    for (let i = 1; i < size; i++) {
                        const newY = +y + i;
                        if (newY < 10) {
                            const adjacent = humanGrid.querySelector(
                                `[data-coords="${x},${newY}"]`
                            );
                            toBeHighlight.push(adjacent);
                        }
                    }
                } else {
                    for (let i = 1; i < size; i++) {
                        const newX = +x + i;
                        if (newX < 10) {
                            const adjacent = humanGrid.querySelector(
                                `[data-coords="${newX},${y}"]`
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

            function createMouseHandler(square) {
                return () => {
                    highlightShip(square);
                };
            }

            const getCoords = (square) => {
                const coords = square.dataset.coords.split(",");
                if (direction === "vertical" && +coords[1] + size - 1 < 10) {
                    resolve(coords);
                    cleanup();
                }
                if (direction === "horizontal" && +coords[0] + size - 1 < 10) {
                    resolve(coords);
                    cleanup();
                }
            };

            const createClickHandler = (square) => () => {
                getCoords(square);
            };

            function cleanup() {
                squares.forEach((square) => {
                    square.removeEventListener("click", square.clickHandler);
                    square.removeEventListener(
                        "mouseover",
                        square.mouseOverHandler
                    );
                    square.removeEventListener(
                        "mouseout",
                        square.mouseOutHandler
                    );
                    square.classList.remove("placingValid");
                });
            }

            squares.forEach((square) => {
                square.mouseOverHandler = createMouseHandler(square);
                square.mouseOutHandler = createMouseHandler(square);
                square.clickHandler = createClickHandler(square);

                square.addEventListener("mouseover", square.mouseOverHandler);
                square.addEventListener("mouseout", square.mouseOutHandler);
                square.addEventListener("click", square.clickHandler);
            });
        });
    }

    return {
        getClick,
        getUserInput,
        updateGrid,
        displayMessage,
        placeShips,
        getDirection,
        placeShip
    };
})();

export default DOM;
