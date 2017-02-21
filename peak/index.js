function naive(array) {
  const length = array.length;

  if (array[0] >= array[1]) {
    return array[0];
  }

  for (let i = 1; i < length - 2; i += 1) {
    if (array[i] >= array[i - 1] && array[i] >= array[i + 1]) {
      return array[i];
    }
  }

  if (array[length - 1] >= array[length - 2]) {
    return array[length - 1];
  }
}

function binary(array, start, end) {
  if (end - start === 1) {
    return (array[end] >= array[start] ? array[end] : array[start]);
  }

  const middle = start + Math.floor((end - start) / 2);

  if (array[middle] < array[middle - 1]) {
    return binary(array, start, middle);
  } else if (array[middle] < array[middle + 1]) {
    return binary(array, middle, end);
  }

  return array[middle];
}

module.exports = {
  naive,
  binary: (array) => {
    return binary(array, 0, array.length - 1);
  },
};
