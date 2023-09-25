import { Ship } from './Ship'

const Gameboard = () => {

  const boardSize = 10;
  const board = Array.from({ length: boardSize }, _ =>
    Array.from({ length: boardSize }, _ => ({
      occupant: null,
      isHit: false,
      shipIndex: 0
    })));

  const isReserved = (x, y, length, direction) => {
    for (let i = 0; i < length; i++) {
      if (direction === 'v' && board[x + i][y].occupant
        || direction === 'h' && board[x][y + i].occupant) {
        return true;
      }
    }
    return false;
  }

  const placeShip = (x, y, length, direction) => {
    const ship = Ship(length);

    if (direction === 'v') {
      if (
        x < 0 ||
        x > boardSize - length ||
        y < 0 ||
        y >= boardSize) return;

      if (isReserved(x, y, length, direction)) return;

      for (let i = 0; i < length; i++) {
        board[x + i][y].occupant = ship;
        board[x + i][y].shipIndex = i;
      }
    }
    else if (direction === 'h') {
      if (
        x < 0 ||
        x >= boardSize ||
        y < 0 ||
        y > boardSize - length) return;

      if (isReserved(x, y, length, direction)) return;

      for (let i = 0; i < length; i++) {
        board[x][y + i].occupant = ship;
        board[x][y + i].shipIndex = i;
      }
    }

    return true;
  }

  const receiveAttack = (x, y) => {
    const target = board[x][y];
    if (target.isHit === true) return;
    if (target.occupant) {
      target.occupant.hit(target.shipIndex)
    }
    target.isHit = true;
  }

  const placeShipsRandomly = (sizes = [5, 4, 3, 3, 2]) => {
    sizes.forEach((size, i) => {
      while (true) {
        const dirs = ['h', 'v'];
        const x = Math.floor(Math.random() * 10);
        const y = Math.floor(Math.random() * 10);

        if (placeShip(x, y, size, dirs[i % 2])) break;
      }
    })
  }
  return {
    placeShip,
    board,
    receiveAttack,
    placeShipsRandomly
  }
}

export { Gameboard }
