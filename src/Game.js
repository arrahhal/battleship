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

  return {
    init,
    getPlayerBoard: () => playerGameboard.board,
    getOpponentBoard: () => opponentGameboard.board,
    getPlayerGameboard: () => playerGameboard,
    getOpponentGameboard: () => opponentGameboard,
  }
})();
