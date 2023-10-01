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
      if (direction === 'v' && board[y + i][x].occupant
        || direction === 'h' && board[y][x + i].occupant) {
        return true;
      }
    }
    return false;
  }

  const isValidPlace = (x, y, len, dir) => {
    if (dir === 'v') {
      if (
        x < 0 ||
        x > boardSize ||
        y < 0 ||
        y + len >= boardSize) return false;

      for (let i = -1; i < len + 1; i++) {
        if ((y + i >= 0) && (y + i < boardSize)) {
          if (isReserved(x, y + i, 1, 'v')) return false;
          if ((x + 1 < boardSize) && isReserved(x + 1, y + i, 1, 'v')) return false;
          if ((x - 1 >= 0) && isReserved(x - 1, y + i, 1, 'v')) return false;
        }
      }
    }
    else if (dir === 'h') {
      if (
        x < 0 ||
        x + len >= boardSize ||
        y < 0 ||
        y > boardSize) return false;

      for (let i = -1; i < len + 1; i++) {
        if ((x + i >= 0) && (x + i < boardSize)) {
          if (isReserved(x + i, y, 1, 'h')) return false;
          if ((y + 1 < boardSize) && isReserved(x + i, y + 1, 1, 'h')) return false;
          if ((y - 1 >= 0) && isReserved(x + i, y - 1, 1, 'h')) return false;
        }
      }
    }
    return true;
  }

  const placeShip = (x, y, length, direction) => {
    if (!isValidPlace(x, y, length, direction)) return;
    const ship = Ship(length);
    if (direction === 'v') {
      for (let i = 0; i < length; i++) {
        board[y + i][x].occupant = ship;
        board[y + i][x].shipIndex = i;
      }
    }
    else if (direction === 'h') {
      for (let i = 0; i < length; i++) {
        board[y][x + i].occupant = ship;
        board[y][x + i].shipIndex = i;
      }
    }
    return true;
  }

  const receiveAttack = (x, y) => {
    const target = board[y][x];
    if (target.isHit === true) return false;
    if (target.occupant) {
      target.occupant.hit(target.shipIndex)
    }
    target.isHit = true;
    return true;
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

  const areAllShipsSunk = () => {
    for (let r = 0; r < board.length; r++) {
      for (let c = 0; c < board[r].length; c++) {
        if (board[r][c].occupant) {
          if (!board[r][c].occupant.isSunk()) {
            return false;
          }
        }
      }
    }
    return true;
  }

  return {
    placeShip,
    board,
    receiveAttack,
    placeShipsRandomly,
    areAllShipsSunk,
  }
}

export { Gameboard }
