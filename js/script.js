
const GameBoard = (function () {
    const board = Array(9).fill(null);

    const returnBoard = () => board;

    const resetBoard = () => {
        for (let i = 0; i < board.length; i++) {
            board[i] = null;
        }

        DisplayController.resetSquares();
    }

    const placeMark = (position, mark) => {
        if (board[position] === null) {
            board[position] = mark;
            return true;
        }
        return false;
    }

    const isValidNode = (index) => {
        return board[index] === null;
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

    let players = [];
    let currentPlayerIndex = 0;

    const board = GameBoard.returnBoard();

    const checkForWin = () => {
        console.log("CHECKING WIN")
        for (let condition of winConditions) {
            const [a, b, c] = condition;
            if (board[a] !== null && board[b] !== null && board[c] !== null && board[a] === board[b] && board[a] === board[c]) {
                return true // Return 'X' or 'O'
            }
        }
        return false;
    }

    const checkForDraw = () => {
        if (board.every(cell => cell != null)) {
            alert("DRAW");
            return true;
        } else {
            return false;
        }
    }

    const startGame = (player1, player2) => {
        // Reset board
        GameBoard.resetBoard();

        currentPlayerIndex = 0;

        // Create players
        players = [createPlayer(0, player1, "X"), createPlayer(1, player2, "O")];

        DisplayController.updatePlayerUI();
    }

    const changePlayer = () => {
        currentPlayerIndex = currentPlayerIndex == 0 ? 1 : 0;
        console.log(currentPlayerIndex)
        const currentPlayer = players[currentPlayerIndex];
        console.log(currentPlayer);
        DisplayController.updatePlayerUI(currentPlayer);
    }

    const playRound = (index, squareElement) => {

        let isWin = false;
        let isDraw = false;

        if (GameBoard.isValidNode(index)) {

            console.log(players);
            console.log(currentPlayerIndex);
            GameBoard.placeMark(index, players[currentPlayerIndex].mark);
            DisplayController.updateSquare(squareElement, players[currentPlayerIndex].mark);

            GameBoard.printInfo();

            isWin = checkForWin();


            if (!isWin) {
                isDraw = checkForDraw();
                if (!isDraw) {
                    changePlayer();
                }

            }
        } else {
            console.log("INVALID");
        }

        if (isWin) {
            console.log(`Player ${players[currentPlayerIndex].name} wins!`);
        } else {
            console.log('No winner yet.');
        }

    }

    return { checkForWin, checkForDraw, startGame, playRound };
})();


const DisplayController = (function () {
    const playerHeader = document.querySelector('.player');

    const updatePlayerUI = (currentPlayer) => {
        console.log(currentPlayer);
        playerHeader.textContent = `Player: ${currentPlayer.name}`;
    }

    const updateSquare = (squareElement, mark) => {
        squareElement.innerText = mark;
    }

    const resetSquares = () => {

        const squares = document.querySelectorAll('.square');
        squares.forEach(square => {

            square.innerHTML = "";
        });
    }

    return { updatePlayerUI, updateSquare, resetSquares };
})();

function createPlayer(id, name, mark) {
    return { id, name, mark };
}

const squares = document.querySelectorAll('.square');
squares.forEach(square => {

    square.addEventListener("click", () => {
        const index = square.dataset.index;
        GameController.playRound(index, square);

    })
});

document.querySelector('#new-game-button').addEventListener('click', function () {
    console.log("GI")
    document.querySelector('#side-menu').style.width = '250px';
});

document.querySelector('.close-button').addEventListener('click', function () {
    document.getElementById('side-menu').style.width = '0';
});

document.getElementById('player-form').addEventListener('submit', function (event) {
    event.preventDefault();
    const player1 = document.getElementById('player1').value;
    const player2 = document.getElementById('player2').value;


    alert(`Starting game between ${player1} and ${player2}`);
    document.getElementById('side-menu').style.width = '0';

    // Add player names
    GameController.startGame(player1, player2);
});

GameController.startGame("Player 1", "Player 2");