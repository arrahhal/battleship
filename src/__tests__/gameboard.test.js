import { Gameboard } from '../factories/Gameboard';

describe.only('Gameboard module tests', () => {
  let gameboard;
  const length = 4;
  const [x, y] = [0, 0];
  const direction = 'h';

  beforeEach(() => {
  gameboard = Gameboard();
  gameboard.placeShip(x, y, length, direction);
  })

  test("should have ship's tiles not empty", () => {
    Array.from({ length: length }).forEach((_, i) => {
      expect(gameboard.board[x][y + i][0]).not.toBe('empty');
    });
  });

  test("should have all not-ship's tiles empty", () => {
    Array.from({ length: gameboard.board.length }).forEach((_, i) => {
      Array.from({ length: gameboard.board.length }).forEach((_, j) => {
        if (direction === 'v' && i >= x && i < x + length) return;
        if (direction === 'h' && j >= y && i < y + length) return;

        expect(gameboard.board[i][j][0]).toBe('empty');
      });
    });
  });

  test('should have correct ship tile indexes if horizontal', () => {
    Array.from({ length: length }).forEach((_, i) => {
      if (direction === 'v') return;
      expect(gameboard.board[x][y + i][1]).toBe(i);
    });
  });

  test('should have correct ship tile indexes if vertical', () => {
    Array.from({ length: 4 }).forEach((_, i) => {
      if (direction === 'h') return;
      expect(gameboard.board[x + i][y][1]).toBe(i);
    });
  });

  test('should not place on top of another one', () => {
    gameboard.placeShip(x, y, 3, direction);
    Array.from({ length: gameboard.board.length }).forEach((_, i) => {
      Array.from({ length: gameboard.board.length }).forEach((_, j) => {
        if (direction === 'v' && i >= x && i < x + length) return;
        if (direction === 'h' && j >= y && j < y + length) return;

        expect(gameboard.board[i][j][0]).toBe('empty');
      });
    });
  });
});
