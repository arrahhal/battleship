class Player {
  constructor(name) {
    this.name = name;
    this.shooted = new Set();
  }

  randomPosition(len = 10) {
    return [Math.floor(Math.random() * len), Math.floor(Math.random() * len)];
  }

  isAlreadyHit([h, v]) {
    return this.shooted.has(`${h}-${v}`);
  }

  randomTarget(board) {
    let target = this.randomPosition(board.length);
    while (this.isAlreadyHit(target)) target = this.randomPosition(board.length);

    return target;
  }

  attack(gameboard, x, y) {
    return gameboard.receiveAttack(x, y);
  }

  randomAttack(gameboard) {
    if (this.shooted.size === gameboard.board.length * gameboard.board.length) return;
    const target = this.randomTarget(gameboard.board);
    gameboard.receiveAttack(...target);
    this.shooted.add(`${target[0]}-${target[1]}`);
  }
}

export { Player };
