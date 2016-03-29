'use strict';

function _maxElementIndex(array) {
  var index = 0;

  for (var i = 1, len = array.length; i < len; i++) {
    if (array[index] < array[i]) {
      index = i;
    }
  }

  return index;
}

function naive(array2D) {
  var rows = array2D.length;
  var columns = array2D[0].length;

  function isPeak(array2D, i, j) {
    var result = true;

    if (result && i > 0) {
      result = result && array2D[i][j] >= array2D[i - 1][j];
    }

    if (result && i < array2D.length - 1) {
      result = result && array2D[i][j] >= array2D[i + 1][j];
    }

    if (result && j > 0) {
      result = result && array2D[i][j] >= array2D[i][j - 1];
    }

    if (result && j < array2D[0].length - 1) {
      result = result && array2D[i][j] >= array2D[i][j + 1];
    }

    return result;
  }

  for(var i = 1; i < rows; i++) {
    for (var j = 1; j < columns; j++) {
      if (isPeak(array2D, i, j)) {
        return array2D[i][j];
      }
    }
  }
}

function halfBinary(array2D, startRow, endRow) {
  var centerRow = startRow + Math.round((endRow - startRow) / 2);
  var column = _maxElementIndex(array2D[centerRow]);

  if(centerRow > 0 && array2D[centerRow][column] < array2D[centerRow - 1][column]) {
    return halfBinary(array2D, startRow, centerRow);
  } else if(centerRow < array2D.length - 1 && array2D[centerRow][column] < array2D[centerRow + 1][column]) {
    return halfBinary(array2D, centerRow, endRow);
  } else {
    return array2D[centerRow][column];
  }
}

module.exports = {
  naive: naive,
  halfBinary: function(array2D) {
    return halfBinary(array2D, 0, array2D.length - 1);
  }
}
