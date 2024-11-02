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

function createGraphOfMoves() {

  let array = [];
  for (let i = 0; i < 8; i++) {
    for (let j = 0; j < 8; j++) {
      array.push([[i, j]]);
    }
  }

  array.forEach((item, index, thisArray) => {
    let arr = item[0];
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
    thisArray[index] = item.concat(options);
  })
  
  return array;
}

function knightMoves(startPosition, targetPosition) {
  isValidPosition(startPosition);
  isValidPosition(targetPosition);

  if (startPosition.toString() == targetPosition.toString()) {
    console.log('0 moves');
    return;
  }
  let distance = 0;
  let visitedPositions = [startPosition];
  let nextMoves = generateNextMoves(startPosition, visitedPositions);

  if (nextMoves.some(element => element.toString() === targetPosition.toString())) {
    visitedPositions.push(targetPosition);
    return visitedPositions;
  } else {
    nextMoves.forEach(element => knightMoves(element, targetPosition))
  }

}

export { createGraphOfMoves }