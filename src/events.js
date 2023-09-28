import { DOM } from './DOM';
import { Game } from './Game';
import { selectors } from './helpers/selectors';

function initListeners() {

  let opponentGameboard;
  let playerGameboard;
  let playerBoard;
  let opponentBoard;

  function refreshPlayerBoard() {
    DOM.updatePlayerTable(playerBoard);
  }

  function refreshOpponentBoard() {
    DOM.updateOpponentTable(opponentBoard);
  }

  document.addEventListener('DOMContentLoaded', () => {
    Game.init();
    opponentGameboard = Game.getOpponentGameboard();
    playerGameboard = Game.getPlayerGameboard();
    playerBoard = Game.getPlayerBoard();
    opponentBoard = Game.getOpponentBoard();
    opponentGameboard.placeShipsRandomly();
    playerGameboard.placeShipsRandomly();
    refreshPlayerBoard();
    refreshOpponentBoard();
  })
}

export default initListeners;
