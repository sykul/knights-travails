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

function knightMoves(arr1, arr2) {
  isValidPosition(arr1);
  isValidPosition(arr2);

  const unvisited = [] 

}

export {knightMoves}