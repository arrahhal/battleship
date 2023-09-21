const Player = (name) => {

  const shooted = new Set();

  function randomPosition(len = 10) {
    return [Math.floor(Math.random() * len), Math.floor(Math.random() * len)];
  };

  function isAlreadyHit ([h, v]) {
    return shooted.has(`${h}-${v}`)
  };

  function randomTarget(board) {
    let target = randomPosition(board.length);
    while (isAlreadyHit(target)) target = randomPosition(board.lengt);

    return target;
  }

  function attack(gameboard, x, y) {
    gameboard.receiveAttack(x, y);
  }

  function randomAttack(gameboard) {
    if (shooted.size === gameboard.board.length * gameboard.board.length) return;
    const target = randomTarget(gameboard.board);
    gameboard.receiveAttack(...target);
    shooted.add(`${target[0]}-${target[1]}`);
  }

  return {
    name,
    attack,
    randomAttack,
  }
}

export { Player };
