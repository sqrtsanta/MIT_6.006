function insertion(array) {
  const subarray = [];

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

  for (const el of array) { // eslint-disable-line no-restricted-syntax
    subarray.push(el);

    _sort(subarray);
  }

  return subarray;
}

function _concat(first, second) {
  const array = [];

  const length = first.length + second.length;
  let i = 0;
  let j = 0;

  for (let n = 0; n < length; n += 1) {
    if (j > second.length - 1 || first[i] < second[j]) {
      array.push(first[i]);
      i += 1;
    } else if (i > first.length - 1 || first[i] >= second[j]) {
      array.push(second[j]);
      j += 1;
    }
  }

  return array;
}

function merge(array, start, end) {
  if (end - start === 0) {
    return [array[start]];
  } else if (end - start === 1) {
    return (array[end] > array[start] ? [array[start], array[end]] : [array[end], array[start]]);
  }

  const middle = start + Math.floor((end - start) / 2);

  return _concat(merge(array, start, middle), merge(array, middle + 1, end));
}

module.exports = {
  insertion,
  merge: (array) => {
    return merge(array, 0, array.length - 1);
  },
};
