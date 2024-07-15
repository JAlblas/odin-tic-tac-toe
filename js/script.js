const GameController = (function () {
    const currentPlayer = 'X';
    let isGameOver = false;

    const playes = [];

    const checkForWin = () => {
        console.log("WIN");
    }
    return {};
})();

const GameBoard = (function () {
    const board = Array(9).fill(null);
    const winConditions = [
        [0, 1, 2], // Top row
        [3, 4, 5], // Middle row
        [6, 7, 8], // Bottom row
        [0, 3, 6], // Left column
        [1, 4, 7], // Middle column
        [2, 5, 8], // Right column
        [0, 4, 8], // Top-left to bottom-right diagonal
        [2, 4, 6]  // Top-right to bottom-left diagonal
    ];

    const resetBoard = () => {
        Array(9).fill(null);
    }

    const placeMark = (position, mark) => {
        if (board[position] === null) {
            board[position] = mark;
            return true;
        }
        return false;
    }

    const printInfo = () => console.log(board);

    return { board, resetBoard, placeMark, printInfo };
})();

const DisplayController = (function () {
    return {};
})();

function createPlayer(name) {
    //const discordName = "@" + name;
    const score = 0;
    return { name };
}

GameBoard.printInfo();
GameBoard.resetBoard();
GameBoard.printInfo();