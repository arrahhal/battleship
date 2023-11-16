import { Gameboard } from './factories/Gameboard';
import { Player } from './factories/Player';
import { TurnManager } from './helpers/TurnManager';
import { BotPlayer } from './helpers/bot';

export const Game = (() => {
  let player;
  let opponent;
  let playerGameboard;
  let opponentGameboard;

  const init = () => {
    playerGameboard = Gameboard();
    opponentGameboard = Gameboard();
    player = new Player('you', opponentGameboard);
    opponent = new BotPlayer('opponent', playerGameboard);
    TurnManager.init(player, opponent, playerGameboard, opponentGameboard);
  };

  const isOver = () => {
    return (
      isStarted() &&
      (playerGameboard.areAllShipsSunk() || opponentGameboard.areAllShipsSunk())
    );
  };

  const winner = () => {
    if (playerGameboard.areAllShipsSunk()) return opponent;
    if (opponentGameboard.areAllShipsSunk()) return player;
    return null;
  };

  const isStarted = () => {
    return (
      playerGameboard.hasReceivedAttack() ||
      opponentGameboard.hasReceivedAttack()
    );
  };

  const isReadyToStart = () => {
    return (
      playerGameboard.isFull() && opponentGameboard.isFull() && !isStarted()
    );
  };

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
  };
})();
