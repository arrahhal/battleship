import { Player } from '../factories/Player';

class BotPlayer extends Player {
  constructor(name, gameboard) {
    super(name, gameboard);
    this.ships = [];
    this.hitStack = [];
    this.directions = [
      [0, 1],
      [1, 0],
      [0, -1],
      [-1, 0],
    ];
    this.directionsIndex = 0;
  }

  toggleDirectionsIndex(times = 1) {
    this.directionsIndex += times;
    while (this.directionsIndex >= this.directions.length) {
      this.directionsIndex -= this.directions.length;
    }
  }

  shootTarget(y, x) {
    const target = this.gameboard.board[y][x];
    this.shooted.add(`${y}-${x}`);
    if (target.occupant && !target.isHit) {
      this.hitStack.push([y, x]);
    }
    return this.gameboard.receiveAttack(y, x);
  }

  reservedSet() {
    // const dirs = [
    //   [1, 0], [1, 1], [1, -1],
    //   [0, 0], [0, 1], [0, -1],
    //   [-1, 0], [-1, 1], [-1, -1]
    // ];
    // const shipsReserved = new Set();
    // bug: adding ships cells as reserved, there should be a way to determine ship direction
    // this.ships.forEach(pos => {
    //   dirs.forEach(dir => {
    //     shipsReserved.add(`${pos[0] + dir[0]}-${pos[1] + dir[1]}`);
    //   });
    // });

    return this.shooted /*, ...shipsReserved] */;
  }

  attack() {
    if (this.hitStack.length) {
      return this.attackNearby(this.hitStack[this.hitStack.length - 1]);
    }

    return this.smartRandomAttack();
  }

  isValidCoordinates(y, x) {
    const boardSize = this.gameboard.board.length;
    return (
      x !== null &&
      y !== null &&
      x >= 0 &&
      x < boardSize &&
      y >= 0 &&
      y < boardSize
    );
  }

  neighbors(coordinates = this.hitStack[this.hitStack.length - 1]) {
    return this.directions.map((d) => [
      coordinates[0] + d[0],
      coordinates[1] + d[1],
    ]);
  }

  possibleShipPlace(y, x) {
    const has = this.reservedSet().has(`${y}-${x}`);
    console.log(`y: ${y}, x: ${x}`);
    console.log(has);
    return this.isValidCoordinates(y, x) && !has;
  }

  attackNearby() {
    if (!this.hitStack.length) {
      this.smartRandomAttack();
      return;
    }

    const lastHit = this.hitStack[this.hitStack.length - 1];
    const neighbors = this.neighbors(lastHit);
    let [nearY, nearX] = neighbors[this.directionsIndex];

    let i = 4;
    while (!this.possibleShipPlace(nearY, nearX) && i--) {
      this.toggleDirectionsIndex();
      [nearY, nearX] = neighbors[this.directionsIndex];
    }

    if (!this.possibleShipPlace(nearY, nearX)) {
      this.smartRandomAttack();
      return;
    }

    const target = this.gameboard.board[nearY][nearX];
    const isHit = this.shootTarget(nearY, nearX);
    const [nextNearY, nextNearX] = this.neighbors([nearY, nearX])[
      this.directionsIndex
    ];

    if (target.occupant) {
      if (target.occupant.isSunk()) this.hitStack = [];
    }

    if (
      (this.hitStack.length >= 2 && !target.occupant) ||
      (this.hitStack.length >= 2 &&
        !this.possibleShipPlace(nextNearY, nextNearX))
    ) {
      this.toggleDirectionsIndex(2);
      this.hitStack.reverse();
    }

    if (!target.occupant && this.hitStack.length == 1) {
      this.toggleDirectionsIndex();
    }

    return isHit;
  }

  smartRandomAttack() {
    let [y, x] = this.randomPosition();
    while (!this.possibleShipPlace(y, x)) {
      [y, x] = this.randomPosition();
    }
    return this.shootTarget(y, x);
  }
}

export { BotPlayer };
