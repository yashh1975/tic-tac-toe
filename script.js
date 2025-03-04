const cells = document.querySelectorAll('.cell');
const resetBtn = document.getElementById('reset-btn');
const newGameBtn = document.getElementById('new-game-btn');
const winnerMessage = document.getElementById('winner');

let currentPlayer = 'X';
let gameBoard = ['', '', '', '', '', '', '', '', ''];
let isGameActive = true;


const checkWinner = () => {
  const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (const combination of winningCombinations) {
    const [a, b, c] = combination;
    if (gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) {
      isGameActive = false;
      return gameBoard[a];
    }
  }

 
  if (!gameBoard.includes('')) {
    isGameActive = false;
    return 'Draw';
  }

  return null;
};


const handleCellClick = (index) => {
  if (gameBoard[index] || !isGameActive) return;

  gameBoard[index] = currentPlayer;
  cells[index].textContent = currentPlayer;

  const winner = checkWinner();
  if (winner) {
    if (winner === 'Draw') {
      winnerMessage.textContent = 'It\'s a draw!';
    } else {
      winnerMessage.textContent = `${winner} wins!`;
    }
    winnerMessage.style.display = 'block'; 
  } else {
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
  }
};


const resetGame = () => {
  gameBoard = ['', '', '', '', '', '', '', '', ''];
  isGameActive = true;
  winnerMessage.textContent = '';
  winnerMessage.style.display = 'none'; 
  currentPlayer = 'X';
  cells.forEach(cell => {
    cell.textContent = '';
  });
};


const newGame = () => {
  resetGame();
  winnerMessage.style.display = 'none'; 
};


cells.forEach(cell => {
  cell.addEventListener('click', () => handleCellClick(cell.dataset.index));
});


resetBtn.addEventListener('click', resetGame);


newGameBtn.addEventListener('click', newGame);
