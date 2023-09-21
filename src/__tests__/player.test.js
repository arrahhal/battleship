import { Player } from '../factories/Player'

describe('Player', () => {
  let player;
  const gameboard = {};

  beforeEach(() => {
    player = Player('foo');
    gameboard.receiveAttack = jest.fn()
    gameboard.board = Array(10).fill(Array(10).fill(null))
  })

  test('attack a specific position', () => {
    const x = 4;
    const y = 7;
    player.attack(gameboard, x, y);
    expect(gameboard.receiveAttack).toHaveBeenCalledWith(x, y);
  })

  test('attack a random position', () => {
    for (let i = 0 ; i < 100; i++){
      player.randomAttack(gameboard);
    };
    expect(gameboard.receiveAttack).toHaveBeenCalledTimes(100);
  })

})
