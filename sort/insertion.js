function _swap(_array, i, j) {
  const tmp = _array[j];

  _array[j] = _array[i]; // eslint-disable-line no-param-reassign
  _array[i] = tmp; // eslint-disable-line no-param-reassign
}

function _sort(_array) {
  let newbieIndex = _array.length - 1;

  for (let j = _array.length - 2; j >= 0; j -= 1) {
    if (_array[newbieIndex] < _array[j]) {
      _swap(_array, newbieIndex, j);

      newbieIndex = j;
    } else {
      return;
    }
  }
}

function insertion(array) {
  const subarray = [];

  for (const el of array) { // eslint-disable-line no-restricted-syntax
    subarray.push(el);

    _sort(subarray);
  }

  return subarray;
}

module.exports = insertion;
