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


function levelOrder(callback) {
  if (!callback instanceof Function) {
    throw new Error('Parameter is not a function!');
  }

  if (this.root === null) {
    return;
  }

  let queue = [];
  queue.push(this.root);
  while (queue.length > 0) {
    let currentNode = queue[0];
    if (currentNode.leftChild !== null) {
      queue.push(currentNode.leftChild);
    }
    if (currentNode.rightChild !== null) {
      queue.push(currentNode.rightChild);
    }
    callback(queue.shift().data)
  }
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
  }

  knightMoves(positionOne, positionTwo) {
    isValidPosition(positionOne);
    isValidPosition(positionTwo);
  
    if (positionOne.toString() == positionTwo.toString()) {
      return;
    }
  
    let nextMoves = this.graphOfMoves[positionOne];
  
    nextMoves = nextMoves.filter((element) => {
      if (!this.visitedPositions.some((element2) => element.toString() === element2.toString())) {
        return element;
      }
    })
  
    if (nextMoves.some(element => element.toString() === positionTwo.toString())) {
      this.visitedPositions.push(positionTwo);
      return this.visitedPositions;
    }
  
    this.visitedPositions.push(positionOne);
  
    let moveDistances = nextMoves.map((element) => distanceToTarget(element, positionTwo))
  
    nextMoves.forEach(element => this.knightMoves(element, positionTwo))
    return this.visitedPositions;
    }

}

const knightsTravails = new KnightsTravails()

function distanceToTarget(currentPosition, target) {
  const xDistance = currentPosition[0] - target[0];
  const yDistance = currentPosition[1] - target[1];
  return (Math.sqrt(xDistance*xDistance + yDistance*yDistance));
}





export { knightsTravails }