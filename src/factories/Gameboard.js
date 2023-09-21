import { Ship } from './Ship'

const Gameboard = () => {

  const boardSize = 10;
  const board = Array.from({ length: boardSize }, _ =>
    // [['empty' or ship, isHit: true | false, null if empty or index of ship]]
    Array.from({ length: boardSize }, _ => ['empty', false, null])
  )


  const isReserved = (x, y, length, direction) => {
    for (let i = 0; i < length; i++) {
      if (direction === 'v' && board[x + i][y][0] !== 'empty'
        || direction === 'h' && board[x][y + i][0] !== 'empty') {
        return true;
      }
    }
    return false;
  }

  const placeShip = (x, y, length, direction) => {
    const ship = Ship(length);

    if (isReserved(x, y, length, direction)) return;

    if (direction === 'v') {
      if (
        x < 0 ||
        x > boardSize - length ||
        y < 0 ||
        y >= boardSize) return;

      for (let i = 0; i < length; i++) {
        board[x + i][y] = [ship,false, i]
      }
    }
    else if (direction === 'h') {
      if (
        x < 0 ||
        x >= boardSize ||
        y < 0 ||
        y > boardSize - length) return;

      for (let i = 0; i < length; i++) {
        board[x][y + i] = [ship,false, i]
      }
    }
  }

  const receiveAttack = (x, y) => {
    const targetCell = board[x][y];
    const isHit = targetCell[1];
    const target = targetCell[0]

    if (isHit === true) return;

    if (target === 'empty') {
      targetCell[1] = true;
      return ;
    }

    const shipIndex = targetCell[2];

    target.hit(shipIndex)
    targetCell[1] = true;
  }

  return {
    placeShip,
    board,
    receiveAttack,
  }
}

export { Gameboard };
