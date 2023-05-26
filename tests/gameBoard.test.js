import GameBoard from "../gameBoard";

let testBoard;

beforeEach(() => {
    testBoard = GameBoard();
});

it("Places a ship vertically", () => {
    const board = testBoard.placeShip(4, "vertical", [0, 0]);
    expect(board[[0, 0]]).toBeTruthy();
    expect(board[[0, 1]]).toBeTruthy();
    expect(board[[0, 2]]).toBeTruthy();
    expect(board[[0, 3]]).toBeTruthy();
});

it("Doesn't allow a ship to be placed in same coords", () => {
    testBoard.placeShip(4, "vertical", [0, 0]);
    const result = testBoard.placeShip(4, "horizontal", [0, 0]);
    expect(result).toBe(false);
});

it("Doesn't allow a ship to be placed in same coords", () => {
    testBoard.placeShip(4, "vertical", [4, 2]);
    const result = testBoard.placeShip(4, "horizontal", [2, 4]);
    expect(result).toBe(false);
});

it("Places a ship horizontally", () => {
    testBoard.placeShip(4, "vertical", [4, 2]);
    const board = testBoard.placeShip(4, "horizontal", [2, 6]);
    expect(board[[2, 6]].length).toBe(4);
});

it("Can't place a ship out of bounds", () => {
    const negative = testBoard.placeShip(2, "vertical", [-1, -1]);
    expect(negative).toBe(false);

    const tooHigh = testBoard.placeShip(2, "vertical", [10, 10]);
    expect(tooHigh).toBe(false);
});

it("Can receive an attack", () => {
    testBoard.placeShip(4, "vertical", [0, 0]);
    expect(testBoard.receiveAttack([0, 0])).toBe(1);
});

it("Can't receive multiple attacks on same coord", () => {
    testBoard.placeShip(4, "vertical", [0, 0]);
    expect(testBoard.receiveAttack([0, 0])).toBe(1);
    expect(testBoard.receiveAttack([0, 0])).toBe(false);
});

it("Can receive multiple attacks on different coords", () => {
    testBoard.placeShip(4, "vertical", [0, 0]);
    expect(testBoard.receiveAttack([0, 0])).toBe(1);
    expect(testBoard.receiveAttack([0, 1])).toBe(2);
    expect(testBoard.receiveAttack([0, 2])).toBe(3);
    expect(testBoard.receiveAttack([0, 3])).toBe(4);
});

it("Can register a miss", () => {
    testBoard.placeShip(4, "vertical", [0, 0]);
    expect(testBoard.receiveAttack([8, 5])).toBe("miss");
});

it("Can tell is game is not over", () => {
    testBoard.placeShip(4, "vertical", [0, 0]);
    testBoard.placeShip(3, "horizontal", [2, 6]);
    expect(testBoard.isGameOver()).toBe(false);
});

it("Can tell is game is over", () => {
    testBoard.placeShip(4, "vertical", [0, 0]);
    //sink it
    testBoard.receiveAttack([0, 0]);
    testBoard.receiveAttack([0, 1]);
    testBoard.receiveAttack([0, 2]);
    testBoard.receiveAttack([0, 3]);
    testBoard.placeShip(3, "horizontal", [2, 6]);
    //sink it
    testBoard.receiveAttack([2, 6]);
    testBoard.receiveAttack([3, 6]);
    testBoard.receiveAttack([4, 6]);
    //Expect game over
    expect(testBoard.isGameOver()).toBe(true);
});


it("Won't attack out of bounds coords", () => {
    testBoard.randomPlaceShips();
    expect(testBoard.receiveAttack([10, 0])).toBe(false);
    expect(testBoard.receiveAttack([0, 10])).toBe(false);
    expect(testBoard.receiveAttack([-1, 0])).toBe(false);
    expect(testBoard.receiveAttack([0, -1])).toBe(false);
});

it("Can randomly place ships & knows when all ships have been placed", () => {
    testBoard.randomPlaceShips();
    expect(testBoard.allShipsPlaced()).toBe(true);
});
