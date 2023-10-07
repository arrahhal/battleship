class Player {
  constructor(name, gameboard) {
    this.name = name;
    this.gameboard = gameboard;
    this.shooted = new Set();
  }

  randomPosition(len = 10) {
    return [Math.floor(Math.random() * len), Math.floor(Math.random() * len)];
  }

  isAlreadyHit([v, h]) {
    return this.shooted.has(`${v}-${h}`);
  }

  randomTarget(board) {
    let target = this.randomPosition(board.length);
    while (this.isAlreadyHit(target)) target = this.randomPosition(board.length);

    return target;
  }

  attack(y, x) {
    return this.gameboard.receiveAttack(y, x);
  }

  randomAttack() {
    if (this.shooted.size === this.gameboard.board.length * this.gameboard.board.length) return;
    const target = this.randomTarget(this.gameboard.board);
    this.gameboard.receiveAttack(...target);
    this.shooted.add(`${target[1]}-${target[0]}`);
  }
}

export { Player };
