import { Ship } from './Ship'

const Gameboard = () => {

  const boardSize = 10;
  const shipSizes = [5, 4, 3, 3, 2];
  let nextSizeIndex = 0;
  let shipDirection = 'h';
  let board = Array.from({ length: boardSize }, _ =>
    Array.from({ length: boardSize }, _ => ({
      occupant: null,
      isHit: false,
      shipIndex: 0
    })));

  const isReserved = (y, x, length, direction) => {
    for (let i = 0; i < length; i++) {
      if (direction === 'v' && board[y + i][x].occupant
        || direction === 'h' && board[y][x + i].occupant) {
        return true;
      }
    }
    return false;
  }

  const isValidPlace = (y, x, len, dir) => {
    if (dir === 'v') {
      if (
        x < 0 ||
        x >= boardSize ||
        y < 0 ||
        y + len > boardSize) return false;

      for (let i = -1; i < len + 1; i++) {
        if ((y + i >= 0) && (y + i < boardSize)) {
          if (isReserved(y + i, x, 1, 'v')) return false;
          if ((x + 1 < boardSize) && isReserved(y + i, x + 1, 1, 'v')) return false;
          if ((x - 1 >= 0) && isReserved(y + i, x - 1, 1, 'v')) return false;
        }
      }
    }
    else if (dir === 'h') {
      if (
        x < 0 ||
        x + len > boardSize ||
        y < 0 ||
        y >= boardSize) return false;

      for (let i = -1; i < len + 1; i++) {
        if ((x + i >= 0) && (x + i < boardSize)) {
          if (isReserved(y, x + i, 1, 'h')) return false;
          if ((y + 1 < boardSize) && isReserved(y + 1, x + i, 1, 'h')) return false;
          if ((y - 1 >= 0) && isReserved(y - 1, x + i, 1, 'h')) return false;
        }
      }
    }
    return true;
  }

  const placeShip = (y, x, length, direction) => {
    if (!isValidPlace(y, x, length, direction)) return false;
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

  const receiveAttack = (y, x) => {
    const target = board[y][x];
    if (target.isHit === true) return false;
    if (target.occupant) {
      target.occupant.hit(target.shipIndex)
    }
    target.isHit = true;
    return true;
  }

  const toggleDirection = () => {
    if (shipDirection === 'h')
      shipDirection = 'v';
    else
      shipDirection = 'h';
  }

  const placeShipsRandomly = () => {
    shipSizes.forEach((size, i) => {
      while (true) {
        const dirs = ['h', 'v'];
        const x = Math.floor(Math.random() * 10);
        const y = Math.floor(Math.random() * 10);

        if (placeShip(y, x, size, dirs[i % 2])) break;
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

  const resetBoard = () => {
    board.forEach((row, r) => {
      row.forEach((_, c) => {
        board[r][c].occupant = null;
        board[r][c].isHit = false;
        board[r][c].shipIndex = 0;
      })
    })
  }

  const hasReceivedAttack = () => {
    for (let i = 0; i < board.length; i++) {
      for (let j = 0; j < board[0].length; j++) {
        if (board[i][j]['isHit']) return true;
      }
    }
    return false;
  }

  const placeNextShip = (y, x) => {
    if (nextSizeIndex >= maxShipsCount) nextSizeIndex = 0;
    if (placeShip(y, x, shipSizes[nextSizeIndex], shipDirection)) {
      nextSizeIndex++;
    }
  }

  const shipsCount = () => {
    let count = 0;
    for (let i = 0; i < board.length; i++) {
      for (let j = 0; j < board[0].length; j++) {
        if (board[i][j].occupant && board[i][j].shipIndex === 0)
          count++;
      }
    }
    return count;
  }

  const maxShipsCount = () => shipSizes.length;

  const isFull = () => shipsCount() === maxShipsCount();

  const remindShipsCount = () => shipSizes.length - shipsCount();

  return {
    placeShip,
    board,
    receiveAttack,
    placeShipsRandomly,
    areAllShipsSunk,
    hasReceivedAttack,
    resetBoard,
    toggleDirection,
    placeNextShip,
    isFull,
    remindShipsCount,
    nextShipLength: () => shipSizes[nextSizeIndex],
    nextShipDirection: () => shipDirection,
  }
}

export { Gameboard }
