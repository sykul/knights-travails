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

  retraceMoves(finalMoveObject) {

  }

  knightMoves(positionOne, positionTwo) {
    isValidPosition(positionOne);
    isValidPosition(positionTwo);

    this.visitedPositions.push({0: positionOne});

    if (positionOne.toString() == positionTwo.toString()) {
      return [positionOne];
    }

    let nextMoves = []
    for (let move of this.graphOfMoves[positionOne]) {
      nextMoves.push({[positionOne]: move});
    }
    let currentMoveObject = nextMoves.shift();


    while (nextMoves.length > 0) {
      let currentMoveKey = [];
      let currentMoveValue = [];
      if (currentMoveObject) {
        currentMoveKey = Object.keys(currentMoveObject)[0];
        currentMoveValue = Object.values(currentMoveObject)[0];
      }
      if (currentMoveValue.toString() === positionTwo.toString()) {
        return this.visitedPositions;
      }

      let mappedNextMoves = this.graphOfMoves[currentMoveKey].map((move) => {
        if (!this.visitedPositions.some(element => Object.values(element)[0].toString() === move.toString())) {
          return {[`${currentMoveKey}`]: move}
        }
      })
      .filter((obj) => obj !== undefined);

      nextMoves = nextMoves.concat(mappedNextMoves)
      nextMoves.shift();
      currentMoveObject = nextMoves[0]
      this.visitedPositions.push(currentMoveObject)

    }
    return this.visitedPositions;
  }

}

const knightsTravails = new KnightsTravails()

export { knightsTravails }