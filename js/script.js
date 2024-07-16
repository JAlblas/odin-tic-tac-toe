
const GameBoard = (function () {
    const board = Array(9).fill(null);

    const returnBoard = () => board;

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

    const isValidNode = () => {
        return true;
    }

    const printInfo = () => console.log(board);

    return { returnBoard, resetBoard, placeMark, isValidNode, printInfo };
})();

const GameController = (function () {
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

    //const players = [];
    let currentPlayer = 'X';
    const board = GameBoard.returnBoard();

    const checkForWin = () => {
        console.log("CHECKING WIN")
        for (let condition of winConditions) {
            const [a, b, c] = condition;
            if (board[a] !== null && board[b] !== null && board[c] !== null && board[a] === board[b] && board[a] === board[c]) {
                return board[a]; // Return 'X' or 'O'
            }
        }
        return null;
    }

    const checkForDraw = () => {
        if (board.every(cell => cell != null)) {
            alert("DRAW");
            return true;
        }
    }

    const playGame = () => {
        var input = prompt("Which cell to add mark?");
        GameBoard.placeMark(input, currentPlayer);
        currentPlayer = currentPlayer == "X" ? "O" : "X";
    }

    return { checkForWin, checkForDraw, playGame };
})();


const DisplayController = (function () {

    return {};
})();

function createPlayer(name) {
    const score = 0;
    return { name, score };
}



while (!GameController.checkForWin() && !GameController.checkForDraw()) {

    GameController.playGame();
    GameBoard.printInfo();
    /*
    console.log("CALLED?")
    GameBoard.placeMark(0, 'X');
    GameBoard.placeMark(1, 'O');
    GameBoard.placeMark(2, 'X');
    GameBoard.placeMark(3, 'O');
    GameBoard.placeMark(4, 'O');
    GameBoard.placeMark(5, 'O');
    GameBoard.placeMark(6, 'X');
    GameBoard.placeMark(7, 'O');
    GameBoard.placeMark(8, 'X');
    //break;
    //}
    */
}



const winner = GameController.checkForWin();

if (winner) {
    console.log(`Player ${winner} wins!`);
} else {
    console.log('No winner yet.');
}
