const Player = (name, mark) => {
  return { name, mark };
};
const board = (function () {
  const domBoard = [...document.querySelectorAll('[data-pos]')];
  const player1 = Player('Player 1', 'X');
  const player2 = Player('Player 2', 'O');

  let currentPlayer = player1;

  const winnerParragraph = document.getElementById('winner');

  const resetButton = document.getElementById('reset');
  resetButton.addEventListener('click', function () {
    reset();
    this.classList.add('display--none');
    winnerParragraph.classList.add('display--none');
  });

  function setPlayer1Name(name) {
    player1.name = name;
  }
  function setPlayer2Name(name) {
    player2.name = name;
  }

  function reset() {
    domBoard.forEach(function (span) {
      span.textContent = '';
      span.classList.remove('board__item--clicked');
      span.addEventListener('click', click);
    });
  }

  function removeListeners() {
    domBoard.forEach(function (span) {
      span.classList.add('board__item--clicked');
      span.removeEventListener('click', click);
    });
  }

  const switchCurrentPlayer = function () {
    if (currentPlayer.mark != player1.mark) {
      currentPlayer = player1;
      return;
    }
    currentPlayer = player2;
  };

  function click(e) {
    e.target.textContent = currentPlayer.mark;
    e.target.classList.add('board__item--clicked');
    e.target.removeEventListener('click', click);
    if (isPlayerVictory()) {
      showWinner();
      removeListeners();
      resetButton.classList.remove('display--none');
      return;
    }
    if (isATie()) {
      showTie();
      removeListeners();
      resetButton.classList.remove('display--none');
      return;
    }
    switchCurrentPlayer();
  }

  function showWinner() {
    winnerParragraph.classList.remove('display--none');
    winnerParragraph.textContent =
      'Congratulations for winning ' + currentPlayer.name;
  }
  function showTie() {
    winnerParragraph.classList.remove('display--none');
    winnerParragraph.textContent =
      "There is no winner this time, it's Tie game";
  }

  function isATie() {
    let isArrayFull = true;
    console.log(domBoard.length);
    for (let i = 0; i < domBoard.length; i++) {
      if (domBoard[i].textContent == '') {
        isArrayFull = false;
        break;
      }
    }
    return isArrayFull;
  }

  function isPlayerVictory() {
    const arr = [
      [
        domBoard[0].textContent,
        domBoard[1].textContent,
        domBoard[2].textContent,
      ],
      [
        domBoard[3].textContent,
        domBoard[4].textContent,
        domBoard[5].textContent,
      ],
      [
        domBoard[6].textContent,
        domBoard[7].textContent,
        domBoard[8].textContent,
      ],
    ];
    for (let i = 0; i < arr.length; i++) {
      let j = 0;
      if (
        arr[i][j] == arr[i][j + 1] &&
        arr[i][j] == arr[i][j + 2] &&
        arr[i][j] != ''
      ) {
        return true;
      }
      if (
        arr[j][i] == arr[j + 1][i] &&
        arr[j][i] == arr[j + 2][i] &&
        arr[j][i] != ''
      ) {
        return true;
      }
    }
    if (arr[0][0] == arr[1][1] && arr[0][0] == arr[2][2] && arr[0][0] != '') {
      return true;
    }
    if (arr[0][2] == arr[1][1] && arr[0][2] == arr[2][0] && arr[0][2] != '') {
      return true;
    }
    return false;
  }

  return { reset, showWinner, setPlayer1Name, setPlayer2Name };
})();

const game = (function () {
  const start = () => {
    board.reset();
    document.getElementById('player1').addEventListener('input', function (e) {
      board.setPlayer1Name(e.target.value);
    });
    document.getElementById('player2').addEventListener('input', function (e) {
      board.setPlayer2Name(e.target.value);
    });
  };
  return { start };
})();

game.start();
