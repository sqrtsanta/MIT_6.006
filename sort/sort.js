'use strict';

function insertion(array) {
  let subarray = [];

  function _swap(array, i, j) {
    let tmp = array[j];

    array[j] = array[i];
    array[i] = tmp;
  }

  function _sort(array) {
    let newbieIndex = array.length - 1;

    for(let j = array.length - 2; j >= 0; j--) {
      if (array[newbieIndex] < array[j]) {
        _swap(array, newbieIndex, j);

        newbieIndex = j;
      } else {
        return;
      }
    }
  }

  for(let el of array) {
    subarray.push(el);

    _sort(subarray);
  }

  return subarray;
}

function _concat(first, second) {
  let array = [];

  let length = first.length + second.length;
  let i = 0, j = 0;

  for (let n = 0; n < length; n++) {
    if (j > second.length - 1 || first[i] < second[j]) {
      array.push(first[i]);
      i++;
    } else if(i > first.length - 1 || first[i] >= second[j]) {
      array.push(second[j]);
      j++;
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

  let middle = start + Math.floor((end - start) / 2);

  return _concat(merge(array, start, middle), merge(array, middle + 1, end));
}

module.exports = {
  insertion: insertion,
  merge: function(array) {
    return merge(array, 0, array.length - 1);
  }
};
