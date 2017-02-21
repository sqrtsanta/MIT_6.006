function _swap(array, first, second) {
  const tmp = array[first];

  array[first] = array[second]; // eslint-disable-line no-param-reassign
  array[second] = tmp; // eslint-disable-line no-param-reassign
}

function maxHeapify(array, current) {
  const length = array.length;

  let largest = current;
  const left = current * 2;
  const right = (current * 2) + 1;

  if (left < length && array[left] > array[largest]) {
    largest = left;
  }

  if (right < length && array[right] > array[largest]) {
    largest = right;
  }

  if (largest === current) {
    return array;
  }

  _swap(array, current, largest);

  return maxHeapify(array, largest);
}

function buildMaxHeap(array) {
  for (let i = Math.floor((array.length - 1) / 2); i > 0; i -= 1) {
    maxHeapify(array, i);
  }

  return array;
}

function sort(unsorted) {
  const sorted = [];

  const heap = buildMaxHeap(unsorted);

  for (let i = unsorted.length - 1; i > 0; i -= 1) {
    _swap(heap, 1, heap.length - 1);

    sorted.push(heap[heap.length - 1]);

    heap.splice(heap.length - 1, 1);

    maxHeapify(heap, 1);
  }

  return sorted;
}

module.exports = {
  sort: (array) => {
    // shift all elements, so that root element has index = 1, not 0
    const copy = [undefined].concat(array);

    return sort(copy);
  },

  buildMaxHeap: (array) => {
    // shift all elements, so that root element has index = 1, not 0
    const copy = [undefined].concat(array);

    return buildMaxHeap(copy);
  },

  maxHeapify: (array, index) => {
    // shift all elements, so that root element has index = 1, not 0
    const copy = [undefined].concat(array);

    return maxHeapify(copy, index);
  },
};
