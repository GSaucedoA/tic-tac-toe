const Player = (name, mark) => {
  return { name, mark };
};
const board = (function () {
  const domBoard = [...document.querySelectorAll('[data-pos]')];
  const player1 = Player('Player 1', 'X');
  const player2 = Player('Player 2', 'O');

  let currentPlayer = player1;

  function reset() {
    domBoard.forEach(function (span) {
      span.textContent = '';
      span.addEventListener('click', click);
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
    if (isGameEnded()) {
      showWinner();
      return;
    }
    if (isATie()) {
      showTie();
      return;
    }
    switchCurrentPlayer();
  }

  function showWinner() {
    console.log('Winner ' + currentPlayer.name);
  }
  function showTie() {
    console.log('Tie game');
  }

  function isGameEnded() {
    return isPlayerVictory(player1) || isPlayerVictory(player2);
  }
  function isATie() {
    let isArrayFull = true;
    for (let i = 0; i < domBoard.length - 1; i++) {
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
    for (let i = 0; i < arr.length - 1; i++) {
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

  return { reset, isGameEnded, showWinner };
})();

const game = (function () {
  const start = () => {
    board.reset();
  };
  return { start };
})();

game.start();
