import { BotPlayer } from '../helpers/bot';
import { Gameboard } from '../factories/Gameboard';

describe('attackNearby', () => {
  test('Attack near tiles after a hit', () => {
    const gb = Gameboard();
    const bot = new BotPlayer('bot', gb);
    gb.placeShip(1, 1, 4, 'h');
    bot.shootTarget(1, 1);

    bot.attackNearby();
    bot.attackNearby();
    bot.attackNearby();

    expect(gb.board[1][2].isHit).toBeTruthy();
    expect(gb.board[1][3].isHit).toBeTruthy();
    expect(gb.board[1][4].isHit).toBeTruthy();
  });

  test('only attack possible ship places', () => {
    const gb = Gameboard();
    const bot = new BotPlayer('bot', gb);
    gb.placeShip(0, 9, 3, 'v');
    bot.shootTarget(0, 9);
    bot.attackNearby();
    bot.attackNearby();
    expect(
      gb.board[1][9].isHit && (gb.board[0][8].isHit || gb.board[2][9].isHit)
    ).toBeTruthy();
  });

  test('change attack direction after mishit', () => {
    const gb = Gameboard();
    const bot = new BotPlayer('bot', gb);
    gb.placeShip(2, 2, 4, 'h');
    bot.hitStack = [[4, 4]];
    for (let i = 0; i < 4; i++) {
      bot.attackNearby();
    }
    const neighbors = [
      [4, 5],
      [4, 3],
      [5, 4],
      [3, 4],
    ];
    neighbors.forEach((n) => {
      expect(gb.board[n[0]][n[1]].isHit).toBeTruthy();
    });
  });

  test('attack opposite direction if overflow', () => {
    const gb = Gameboard();
    const bot = new BotPlayer('opponent', gb);
    gb.placeShip(1, 7, 3, 'h');
    bot.shootTarget(1, 8);
    bot.attackNearby();
    bot.attackNearby();
    expect(gb.board[1][7].isHit).toBeTruthy();
  });

  test('ivnoke smartRandomAttack if hitStack is empty', () => {
    const gb = Gameboard();
    const bot = new BotPlayer('bot', gb);
    const len = 4;

    gb.placeShip(2, 3, len, 'h');

    bot.hitStack = [];
    bot.smartRandomAttack = jest.fn();

    bot.attackNearby();

    expect(bot.smartRandomAttack).toBeCalledTimes(1);
  });

  test('reverse attacking direction if missed after two hits or more', () => {
    const gb = Gameboard();
    const bot = new BotPlayer('bot', gb);
    const len = 4;

    gb.placeShip(2, 3, len, 'h');

    bot.directionsIndex = 0;
    bot.hitStack = [];
    for (let i = 4; i < len + 3; i++) {
      bot.shootTarget(2, i);
    }

    bot.attackNearby(); // one tile after ship
    bot.attackNearby(); // change direction and attack first tile

    expect(gb.board[2][7].isHit).toBeTruthy();
    expect(gb.board[2][3].isHit).toBeTruthy();
  });
});
