function _maxElementIndex(array) {
  let index = 0;

  for (let i = 1, len = array.length; i < len; i += 1) {
    if (array[index] < array[i]) {
      index = i;
    }
  }

  return index;
}

function naive(array2D) {
  const rows = array2D.length;
  const columns = array2D[0].length;

  function isPeak(_array2D, i, j) {
    let result = true;

    if (result && i > 0) {
      result = result && _array2D[i][j] >= _array2D[i - 1][j];
    }

    if (result && i < _array2D.length - 1) {
      result = result && _array2D[i][j] >= _array2D[i + 1][j];
    }

    if (result && j > 0) {
      result = result && _array2D[i][j] >= _array2D[i][j - 1];
    }

    if (result && j < _array2D[0].length - 1) {
      result = result && _array2D[i][j] >= _array2D[i][j + 1];
    }

    return result;
  }

  for (let i = 1; i < rows; i += 1) {
    for (let j = 1; j < columns; j += 1) {
      if (isPeak(array2D, i, j)) {
        return array2D[i][j];
      }
    }
  }
}

function halfBinary(array2D, startRow, endRow) {
  const centerRow = startRow + Math.round((endRow - startRow) / 2);
  const column = _maxElementIndex(array2D[centerRow]);

  if (centerRow > 0 && array2D[centerRow][column] < array2D[centerRow - 1][column]) {
    return halfBinary(array2D, startRow, centerRow);
  } else if (centerRow < array2D.length - 1 && array2D[centerRow][column] < array2D[centerRow + 1][column]) {
    return halfBinary(array2D, centerRow, endRow);
  }

  return array2D[centerRow][column];
}

module.exports = {
  naive,
  halfBinary: (array2D) => {
    return halfBinary(array2D, 0, array2D.length - 1);
  },
};
