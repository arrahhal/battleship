import { Gameboard } from '../factories/Gameboard'

describe('placeShip', () => {
  let gameboard;
  const length = 4;
  const [x, y] = [0, 0];
  const direction = 'h';

  beforeEach(() => {
    gameboard = Gameboard();
    gameboard.placeShip(y, x, length, direction);
  })

  test("should have ship's tiles not empty", () => {
    Array.from({ length: length }).forEach((_, i) => {
      expect(gameboard.board[x][y + i].occupant).toBeTruthy();
    });
  });

  test("should have all not-ship's tiles empty", () => {
    Array.from({ length: gameboard.board.length }).forEach((_, i) => {
      Array.from({ length: gameboard.board.length }).forEach((_, j) => {
        if (direction === 'v' && i >= x && i < x + length) return;
        if (direction === 'h' && j >= y && i < y + length) return;

        expect(gameboard.board[i][j].occupant).toBeFalsy();
      });
    });
  });

  test('should have correct ship tile indexes if horizontal', () => {
    Array.from({ length: length }).forEach((_, i) => {
      if (direction === 'v') return;
      expect(gameboard.board[x][y + i].shipIndex).toBe(i);
    });
  });

  test('should have correct ship tile indexes if vertical', () => {
    Array.from({ length: 4 }).forEach((_, i) => {
      if (direction === 'h') return;
      expect(gameboard.board[x + i][y].shipIndex).toBe(i);
    });
  });

  test('should not place on top of another one', () => {
    gameboard.placeShip(y, x, 3, direction);
    Array.from({ length: gameboard.board.length }).forEach((_, i) => {
      Array.from({ length: gameboard.board.length }).forEach((_, j) => {
        if (direction === 'v' && i >= x && i < x + length) return;
        if (direction === 'h' && j >= y && j < y + length) return;

        expect(gameboard.board[i][j].occupent).toBeFalsy();
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
    expect(g.board[y][x].isHit).toBeFalsy();
    g.receiveAttack(0, 0);
    expect(g.board[y][x].isHit).toBeTruthy();
  })

  test("should not change tile if already hit", () => {
    const x = 0;
    const y = 0;
    g.receiveAttack(0, 0);
    expect(g.board[y][x].isHit).toBeTruthy();
  })

  test("should call hit function only once", () => {
    const x = 1;
    const y = 0;
    const mockHitFunc = jest.fn()

    g.board[y][x].occupant = {
      hit: mockHitFunc,
    }

    g.receiveAttack(y, x);
    expect(mockHitFunc).toHaveBeenCalledTimes(1);
  })

  test("should call hit with right index", () => {
    const x = 0;
    const y = 1;
    const mockHitFunc = jest.fn()

    g.board[y][x].occupant = {
      hit: mockHitFunc,
    }

    g.receiveAttack(y, x);
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
        if (gameboard.board[rowIndex][colIndex].occupant) filledTiles++;
      })
    })

    expect(filledTiles).toBe(17);
  });
})
