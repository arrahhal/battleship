import { Gameboard } from './factories/Gameboard'
import { Player } from './factories/Player'
import { TurnManager } from './helpers/TurnManager'

export const Game = (() => {
  let player;
  let opponent;
  let playerGameboard;
  let opponentGameboard;

  const init = () => {
    player = Player('you');
    opponent = Player('opponent');
    playerGameboard = Gameboard();
    opponentGameboard = Gameboard();
    TurnManager.init(player, opponent, playerGameboard, opponentGameboard);
  }

  const isOver = () => {
    return isStarted() && (playerGameboard.areAllShipsSunk() || opponentGameboard.areAllShipsSunk());
  }

  const winner = () => {
    if (playerGameboard.areAllShipsSunk()) return opponent;
    if (opponentGameboard.areAllShipsSunk()) return player;
    return null;
  }

  const isStarted = () => {
    return playerGameboard.hasReceivedAttack() || opponentGameboard.hasReceivedAttack();
  }

  const isReadyToStart = () => {
    return playerGameboard.isFull() && opponentGameboard.isFull() && !isStarted();
  }

  return {
    init,
    isOver,
    winner,
    isStarted,
    isReadyToStart,
    getPlayerBoard: () => playerGameboard.board,
    getOpponentBoard: () => opponentGameboard.board,
    getPlayerGameboard: () => playerGameboard,
    getOpponentGameboard: () => opponentGameboard,
    player: () => player,
    opponent: () => opponent,
  }
})();
