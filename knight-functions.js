function isValidPosition(arr) {
  if (!(arr instanceof Array)) {
    throw new Error('Must be an array');
  }

  if (arr.length !== 2) {
    throw new Error('Array must be of length 2')
  }

  if (arr.find((e) => !(typeof e === 'number'))
    || arr.find(e => (e < 0 || 7 < e))) {
    throw new Error('Square must be of form [0-7, 0-7]');
  }
  else {
    return true;
  };
}

function isInRange(arr) {
  if (arr.find((e) => !(typeof e === 'number'))
    || arr.find(e => (e < 0 || 7 < e))) {
    return false;
  }
  else {
    return true;
  };
}

class KnightsTravails {
  constructor() {
    let obj = {};
    for (let i = 0; i < 8; i++) {
      for (let j = 0; j < 8; j++) {
        obj[[i, j]] = [];
      }
    }

    Object.keys(obj).forEach((key) => {
      let arr = JSON.parse("[" + key + "]");
      let options = [
        [arr[0] + 1, arr[1] + 2],
        [arr[0] + 2, arr[1] + 1],
        [arr[0] + 2, arr[1] - 1],
        [arr[0] + 1, arr[1] - 2],
        [arr[0] - 1, arr[1] - 2],
        [arr[0] - 2, arr[1] - 1],
        [arr[0] - 2, arr[1] + 1],
        [arr[0] - 1, arr[1] + 2]
      ];
      options = options.filter((element) => {
        if (isInRange(element)) {
          return element;
        } else {
          return false;
        }
      });
      obj[key] = options;
    })

    this.graphOfMoves = obj;
    this.visitedPositions = [];
    this.visited = new Array(64).fill(false);
  }

  knightMoves(positionOne, positionTwo) {
    isValidPosition(positionOne);
    isValidPosition(positionTwo);

    this.visitedPositions.push(positionOne);

    if (positionOne.toString() == positionTwo.toString()) {
      return [positionOne];
    }

    let nextMoves = {positionOne: this.graphOfMoves[positionOne]};
    let currentMove = nextMoves[0][Object.keys(nextMoves[0])[0]];


    while (nextMoves.length > 0) {
      if (currentMove && currentMove.toString() === positionTwo.toString()) {
        return this.visitedPositions;
      }
      let filteredNextMoves = this.graphOfMoves[currentMove].filter((move) => {
        return !this.visitedPositions.some(element => element.toString() === move.toString());
      })
      nextMoves = nextMoves.concat(filteredNextMoves)
      nextMoves.shift();
      currentMove = nextMoves[0]
      this.visitedPositions.push(currentMove)

    }
    return this.visitedPositions;
  }

}

const knightsTravails = new KnightsTravails()

export { knightsTravails }