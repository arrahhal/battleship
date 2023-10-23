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

  function intilizeVars() {
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
    if (Game.isOver()) return;
    if (!Game.isReadyToStart() && !Game.isStarted()) return;

    const clickedCell = e.target;
    if (clickedCell.localName !== 'td') return;

    const x = Number(clickedCell.dataset.x);
    const y = Number(clickedCell.dataset.y);

    if (player.attack(y, x)) {
      handlePlayerTurn();
      handleOpponentTurn();
      refreshBoards();
      handleLog(opponentBoard[y][x]);
    }
  }

  function handlePlayerTurn() {
    if (Game.isOver()) {
      refreshOpponentBoard();
      handleLog();
      return;
    }
  }

  function handleOpponentTurn() {
    opponent.randomAttack();
    if (Game.isOver()) {
      refreshPlayerBoard();
      DOM.logGameOver(Game.winner());
    }
  }

  function intilizeGame() {
    Game.init();
    intilizeVars();
    opponentGameboard.placeShipsRandomly();
    refreshBoards();
    handleLog();
  }

  function handleRandomizeClick() {
    if (Game.isStarted()) return;
    playerGameboard.resetBoard();
    playerGameboard.placeShipsRandomly();
    refreshPlayerBoard();
  }

  function handleHighlightShip(e) {
    if (playerGameboard.isFull()) return;
    const hoveredCell = e.target;
    const x = Number(hoveredCell.dataset.x);
    const y = Number(hoveredCell.dataset.y);
    DOM.highlightPlaces(y, x, playerGameboard.nextShipLength(), playerGameboard.nextShipDirection());
  }

  function handlePlaceShip(e) {
    if (playerGameboard.isFull()) return;
    const clickedCell = e.target;
    const x = Number(clickedCell.dataset.x);
    const y = Number(clickedCell.dataset.y);
    playerGameboard.placeNextShip(y, x);
    refreshPlayerBoard();
    handleLog();
  }

  function handleLog(target = null) {
    if (!Game.isReadyToStart()) {
      DOM.logPlace(playerGameboard.remindShipsCount());
    }

    if (Game.isReadyToStart()) {
      DOM.logStart();
    }

    if (Game.isStarted() && target) {
      DOM.logAttackResult(target);
    }

    if (Game.isOver()) {
      DOM.logGameOver(Game.winner());
    }
  }

  function handleRotateClick() {
    playerGameboard.toggleDirection();
  }

  document.addEventListener('DOMContentLoaded', intilizeGame);

  selectors.tableOpponentPlaceholder.addEventListener('click', handleOpponentBoardClick)

  selectors.btnReset.addEventListener('click', intilizeGame);

  selectors.btnRandomize.addEventListener('click', handleRandomizeClick);

  selectors.tablePlayerPlaceholder.addEventListener('mouseover', handleHighlightShip);

  selectors.tablePlayerPlaceholder.addEventListener('mouseleave', DOM.removeHighlights);

  selectors.tablePlayerPlaceholder.addEventListener('click', handlePlaceShip)

  selectors.btnRotate.addEventListener('click', handleRotateClick);
}

export default initListeners;
