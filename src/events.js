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

  document.addEventListener('DOMContentLoaded', () => {
    Game.init();
    initVariables();
    opponentGameboard.placeShipsRandomly();
    playerGameboard.placeShipsRandomly();
    refreshBoards();
    DOM.logStart();
  })

  selectors.tableOpponentPlaceholder.addEventListener('click', (e) => {
    if (Game.isGameOver()) return;
    if (e.target.localName != 'td') return;
    if (player.attack(opponentGameboard, Number(e.target.dataset.x), Number(e.target.dataset.y))) {
      if (Game.isGameOver()) {
        refreshOpponentBoard();
        DOM.logGameOver(Game.winner());
        return;
      }
      opponent.randomAttack(playerGameboard);
      if (Game.isGameOver()) {
        refreshPlayerBoard();
        DOM.logGameOver(Game.winner());
        return;
      }
      refreshBoards();
    }
  })
}

export default initListeners;
