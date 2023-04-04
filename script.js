let player1Name = '';
let player2Name = '';
let player1Symbol = '';
let player2Symbol = '';
let gameBoard = ['', '', '', '', '', '', '', '', ''];

const startGame = document.querySelector('#start-game');
const resetGame = document.querySelector('#reset-game');
const cells = document.querySelectorAll('.cell');
const winnerTab = document.querySelector('#winner');
const winnerTabTxt = document.querySelector('#winner h2');

cells.forEach(cell => {
    cell.addEventListener('click', () => {
        const cellNumber = parseInt(cell.id.split('-')[1])
        console.log('clicked', cellNumber);
        return placeMark(cellNumber)

    })
})

startGame.addEventListener('click', function () {
    player1Name = document.querySelector('#player1').value;
    player2Name = document.querySelector('#player2').value;
    player1Symbol = document.querySelector('#symbol1').value.toUpperCase();
    player2Symbol = document.querySelector('#symbol2').value.toUpperCase();
    // Checking if the symbol entered is either X or O
    if (player1Symbol !== 'X' && player1Symbol !== 'O') {
        alert('Player 1 symbol must be either X or O');
        return;
    }

    if (player2Symbol !== 'X' && player2Symbol !== 'O') {
        alert('Player 2 symbol must be either X or O');
        return;
    }

    if (player1Symbol === player2Symbol) {
        alert('Player symbols must be different');
        return;
    }
    if (player1Name === player2Name) {
        alert('Player Names must be different');
        return;
    }
    console.log(player1Name, player1Symbol, player2Name, player2Symbol)
    if (player1Symbol.toLowerCase() === 'x') {
        currentPlayer = player1Name;
    } else {
        currentPlayer = player2Name;
    }
})

function resetBoard() {
    console.log('reset pressed')
    gameBoard = ['', '', '', '', '', '', '', '', ''];
    currentPlayer = player1Name;
    let cells = document.querySelectorAll('.cell');
    cells.forEach(cell => cell.innerHTML = '');
    winnerTabTxt.textContent = ``;
    winnerTab.style.visibility = 'hidden';
}
resetGame.addEventListener('click', () => resetBoard());

function checkWinner() {
    // Checking for correct scenarios
    return ((gameBoard[0] === gameBoard[1] && gameBoard[1] === gameBoard[2] && gameBoard[0] !== '') ||
        (gameBoard[3] === gameBoard[4] && gameBoard[4] === gameBoard[5] && gameBoard[3] !== '') ||
        (gameBoard[6] === gameBoard[7] && gameBoard[7] === gameBoard[8] && gameBoard[6] !== '') ||
        (gameBoard[0] === gameBoard[3] && gameBoard[3] === gameBoard[6] && gameBoard[0] !== '') ||
        (gameBoard[1] === gameBoard[4] && gameBoard[4] === gameBoard[7] && gameBoard[1] !== '') ||
        (gameBoard[2] === gameBoard[5] && gameBoard[5] === gameBoard[8] && gameBoard[2] !== '') ||
        (gameBoard[0] === gameBoard[4] && gameBoard[4] === gameBoard[8] && gameBoard[0] !== '') ||
        (gameBoard[2] === gameBoard[4] && gameBoard[4] === gameBoard[6] && gameBoard[2] !== ''))

}
function displayWinner() {
    winnerTabTxt.textContent = `${currentPlayer} Wins the game!!!`;
    winnerTab.style.visibility = 'visible';
}
function checkDrawGame() {
    if (!gameBoard.includes('')) {
        return true;
    } else {
        return false
    }
}

function placeMark(cellIndex) {
    // checking if the cell which was clicked is empty or not
    if (gameBoard[cellIndex - 1] === '') {
        // assigning the symbol to gameboard at the cell position
        if (currentPlayer === player1Name) {
            gameBoard[cellIndex - 1] = player1Symbol;
        } else {
            gameBoard[cellIndex - 1] = player2Symbol;
        }

        let cell = document.querySelector(`#cell-${cellIndex}`)

        if (currentPlayer === player1Name) {
            cell.innerHTML = player1Symbol;
        } else {
            cell.innerHTML = player2Symbol;;
        }
        // Calling the checkWinner() to check which player won the game
        if (checkWinner()) {
            displayWinner()
            // alert(`${currentPlayer} Wins the game!!!`)

        }
        // Calling the function checkDrawGame() if none of the player wins
        else if (checkDrawGame()) {
            winnerTabTxt.textContent = `Its a Draw!!!`;
            winnerTab.style.visibility = 'visible';
        } else {
            // Switching player

            if (currentPlayer === player1Name) {
                currentPlayer = player2Name;
            } else {
                currentPlayer = player1Name;
            }
        }
    }
}