import { Gameboard } from '../factories/Gameboard'

describe('placeShip function tests', () => {
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
      expect(gameboard.board[x][y + i][2]).toBe(i);
    });
  });

  test('should have correct ship tile indexes if vertical', () => {
    Array.from({ length: 4 }).forEach((_, i) => {
      if (direction === 'h') return;
      expect(gameboard.board[x + i][y][2]).toBe(i);
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

describe('receiveAttack', () => {
  let g;

  beforeEach(() => {
    g = Gameboard();
    g.placeShip(0, 0, 4, 'v');
  })

  test("should hit the correct tile and change its status", () => {
    const x = 0;
    const y = 0;
    expect(g.board[x][y][1]).toBeFalsy();
    g.receiveAttack(0, 0);
    expect(g.board[x][y][1]).toBeTruthy();
  })

  test("should not change tile if already hit", () => {
    const x = 0;
    const y = 0;
    g.receiveAttack(0, 0);
    expect(g.board[x][y][1]).toBeTruthy();
  })

  test("should call hit function only once", () => {
    const x = 1;
    const y = 0;
    const mockHitFunc = jest.fn((index) => index)

    g.board[x][y][0] = {
      hit: mockHitFunc,
    }

    g.receiveAttack(x, y);
    expect(mockHitFunc).toHaveBeenCalledTimes(1);
  })

  test("should call hit with right index", () => {
    const x = 1;
    const y = 0;
    const mockHitFunc = jest.fn((index) => index)

    g.board[x][y][0] = {
      hit: mockHitFunc,
    }

    g.receiveAttack(x, y);
    expect(mockHitFunc).toHaveBeenCalledWith(1);
  })
})

describe('placeShipsRandomly', () => {
  let gameboard;

  beforeEach(() => {
    gameboard = Gameboard();
    gameboard.placeShipsRandomly();
  })

  test("should find 17 tile not empty if sizes not specified", () => {
    let filledTiles = 0;
    gameboard.board.forEach((row, rowIndex) => {
      row.forEach((_, colIndex) => {
        if (gameboard.board[rowIndex][colIndex][0] !== 'empty') filledTiles++;
      })
    })

    expect(filledTiles).toBe(17);
  });
})
