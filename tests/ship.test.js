import Ship from "../ship";

let testShip;

beforeEach(() => {
    testShip = Ship(4);
});

it("Creates obj with length", () => {
    expect(testShip.length).toBe(4);
});

it("Increases number of hits", () => {
    expect(testShip.hit()).toBe(1);
});

it("Knows if the ship isn't sunk", () => {
    expect(testShip.isSunk()).toBe(false);
});

it("Knows if the ship is sunk", () => {
    testShip.hit();
    testShip.hit();
    testShip.hit();
    testShip.hit();
    expect(testShip.isSunk()).toBe(true);
});
