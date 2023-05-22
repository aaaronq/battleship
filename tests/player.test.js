import Player from '../player';

let humanPlayer;
let botPlayer;

beforeEach(() => {
    humanPlayer = new Player("Player 1");
    botPlayer = new Player("Player 2");
});

it("Can send attacks to the bot's gameboard", () => {
    let mockBot = {
        gameBoard: {
            receiveAttack: jest.fn(),
        }
    };
    humanPlayer.attack(mockBot, [0, 0]);
    expect(mockBot.gameBoard.receiveAttack).toBeCalledWith([0, 0]);
});

it("Can send attacks to the human's gameboard", () => {
    let mockPlayer = {
        gameBoard: {
            hits: [],
            receiveAttack: jest.fn(),
        }
    };
    botPlayer.attack(mockPlayer);
    expect(Array.isArray(mockPlayer.gameBoard.receiveAttack.mock.calls[0][0])).toBe(true);
});

it("All Bot attacks are valid", () => {
    let mockPlayer = {
        gameBoard: {
            hits: [],
            receiveAttack: jest.fn(),
        }
    };
    botPlayer.attack(mockPlayer);
    const mockReturnValue = mockPlayer.gameBoard.receiveAttack.mock.calls[0][0];
    expect(Array.isArray(mockReturnValue)).toBe(true);
    expect(mockReturnValue.length).toBe(2);
    expect(mockReturnValue[0]).toBeGreaterThanOrEqual(0);
    expect(mockReturnValue[0]).toBeLessThanOrEqual(9);
    expect(mockReturnValue[1]).toBeGreaterThanOrEqual(1);
    expect(mockReturnValue[1]).toBeLessThanOrEqual(9);
});

it("Bot will not attack positions it already has", () => {

    let hits = [];

    function populateHits() {
        for (let i = 0; i < 9; i++) {
            for (let j = 0; j < 10; j++) {
                hits[[i, j]] = "hit";
            }
        }
    }

    populateHits();

    let mockPlayer = {
        gameBoard: {
            hits: hits,
            receiveAttack: jest.fn(),
        }
    };


    
    // At this stage, bot has hit every row except row except row 9,
    // So we expect it to hit row 9.

    botPlayer.attack(mockPlayer);
    const mockReturnValue = mockPlayer.gameBoard.receiveAttack.mock.calls[0][0];
    console.log(mockReturnValue);
    expect(mockReturnValue[0]).toBe(9);

});



