export default function DOM() {
    function getUserInput() {
        console.log("getuserinput");
    }
    function displayWin(winnerName) {
        console.log(`${winnerName} won the game!`);
    }

    return {
        getUserInput,
        displayWin
    };
}
