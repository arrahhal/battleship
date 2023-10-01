import { DOM } from './DOM';
import { Game } from './Game';
import { selectors } from './helpers/selectors';

function initListeners() {

  let opponentGameboard;
  let playerGameboard;
  let playerBoard;
  let opponentBoard;
  let opponent;
  let player;

  function initVariables() {
    opponentGameboard = Game.getOpponentGameboard();
    playerGameboard = Game.getPlayerGameboard();
    playerBoard = Game.getPlayerBoard();
    opponentBoard = Game.getOpponentBoard();
    player = Game.player();
    opponent = Game.opponent();
  }

  function refreshPlayerBoard() {
    DOM.updatePlayerTable(playerBoard);
  }

  function refreshOpponentBoard() {
    DOM.updateOpponentTable(opponentBoard);
  }

  function refreshBoards() {
    refreshOpponentBoard();
    refreshPlayerBoard();
  }

  function handleOpponentBoardClick(e) {
    if (Game.isGameOver()) return;

    const clickedCell = e.target;
    if (clickedCell.localName !== 'td') return;

    const x = Number(clickedCell.dataset.x);
    const y = Number(clickedCell.dataset.y);

    if (player.attack(opponentGameboard, x, y)) {
      handlePlayerTurn();
      handleOpponentTurn();
      refreshBoards();
    }
  }

  function handlePlayerTurn() {
    if (Game.isGameOver()) {
      refreshOpponentBoard();
      DOM.logGameOver(Game.winner());
      return;
    }
  }

  function handleOpponentTurn() {
    opponent.randomAttack(playerGameboard);
    if (Game.isGameOver()) {
      refreshPlayerBoard();
      DOM.logGameOver(Game.winner());
    }
  }

  document.addEventListener('DOMContentLoaded', () => {
    Game.init();
    initVariables();
    opponentGameboard.placeShipsRandomly();
    playerGameboard.placeShipsRandomly();
    refreshBoards();
    DOM.logStart();
  })

  selectors.tableOpponentPlaceholder.addEventListener('click', handleOpponentBoardClick)
}

export default initListeners;
