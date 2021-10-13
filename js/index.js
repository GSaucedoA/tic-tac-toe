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
    switchCurrentPlayer();
  }

  function showWinner() {
    console.log('Winner ' + currentPlayer.name);
  }

  function isGameEnded() {
    return isPlayerVictory(player1) || isPlayerVictory(player2);
  }

  function isPlayerVictory(player) {
    const pos0 = domBoard[0].textContent;
    const pos1 = domBoard[1].textContent;
    const pos2 = domBoard[2].textContent;
    const pos3 = domBoard[3].textContent;
    const pos4 = domBoard[4].textContent;
    const pos5 = domBoard[5].textContent;
    const pos6 = domBoard[6].textContent;
    const pos7 = domBoard[7].textContent;
    const pos8 = domBoard[8].textContent;
    if (player.mark == pos0 && player.mark == pos1 && player.mark == pos2) {
      return true;
    }
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
