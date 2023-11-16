import { Player } from '../factories/Player';

describe('Player', () => {
  let player;
  const gameboard = {};

  beforeEach(() => {
    player = new Player('foo', gameboard);
    gameboard.receiveAttack = jest.fn();
    gameboard.board = Array(10).fill(Array(10).fill(null));
  });

  test('attack a specific position', () => {
    const x = 4;
    const y = 7;
    player.attack(y, x);
    expect(gameboard.receiveAttack).toHaveBeenCalledWith(y, x);
  });

  test('attack a random position', () => {
    for (let i = 0; i < 100; i++) {
      player.randomAttack();
    }
    expect(gameboard.receiveAttack).toHaveBeenCalledTimes(100);
  });
});
