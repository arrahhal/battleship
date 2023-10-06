class Player {
  constructor(name, gameboard) {
    this.name = name;
    this.gameboard = gameboard;
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

  attack(x, y) {
    return this.gameboard.receiveAttack(x, y);
  }

  randomAttack() {
    if (this.shooted.size === this.gameboard.board.length * this.gameboard.board.length) return;
    const target = this.randomTarget(this.gameboard.board);
    this.gameboard.receiveAttack(...target);
    this.shooted.add(`${target[0]}-${target[1]}`);
  }
}

export { Player };
