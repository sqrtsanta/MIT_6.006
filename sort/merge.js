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

module.exports = (array) => {
  return merge(array, 0, array.length - 1);
};
