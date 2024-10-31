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


function levelOrder(callback) {
  if (!callback instanceof Function) {
    throw new Error('Parameter is not a function!');
  }

  if (this.root === null) {
    return;
  }

  let queue = [];
  queue.push(this.root);
  while(queue.length > 0) {
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

function knightMoves(arr1, arr2) {
  isValidPosition(arr1);
  isValidPosition(arr2);
  

}

export {knightMoves}