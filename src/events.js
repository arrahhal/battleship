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
    if (Game.isOver()) {
      refreshOpponentBoard();
      DOM.logGameOver(Game.winner());
      return;
    }
  }

  function handleOpponentTurn() {
    opponent.randomAttack(playerGameboard);
    if (Game.isOver()) {
      refreshPlayerBoard();
      DOM.logGameOver(Game.winner());
    }
  }

  function intilizeGame() {
    Game.init();
    intilizeVars();
    opponentGameboard.placeShipsRandomly();
    playerGameboard.placeShipsRandomly();
    refreshBoards();
    DOM.logStart();
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
    DOM.highlightPlace(x, y, playerGameboard.nextShipLength(), playerGameboard.nextShipDirection());
  }

  function handlePlaceShip(e) {
    if (playerGameboard.isFull()) return;
    const clickedCell = e.target;
    const x = Number(clickedCell.dataset.x);
    const y = Number(clickedCell.dataset.y);
    playerGameboard.placeNextShip(x, y);
    refreshPlayerBoard();
  }

  document.addEventListener('DOMContentLoaded', intilizeGame);

  selectors.tableOpponentPlaceholder.addEventListener('click', handleOpponentBoardClick)

  selectors.btnReset.addEventListener('click', intilizeGame);

  selectors.btnRandomize.addEventListener('click', handleRandomizeClick);

  selectors.tablePlayerPlaceholder.addEventListener('mouseover', handleHighlightShip);

  selectors.tablePlayerPlaceholder.addEventListener('mouseleave', DOM.clearHighlights);

  selectors.tablePlayerPlaceholder.addEventListener('click', handlePlaceShip)
}

export default initListeners;
