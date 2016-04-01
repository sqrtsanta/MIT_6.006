'use strict';

function _swap(array, first, second) {
  let tmp = array[first];

  array[first] = array[second];
  array[second] = tmp;
}

function maxHeapify(array, current) {
  let length = array.length;

  let largest = current;
  let left = current * 2;
  let right = current * 2 + 1;

  if (left < length && array[left] > array[largest]) {
    largest = left;
  }

  if (right < length && array[right] > array[largest]) {
    largest = right;
  }

  if (largest == current) {
    return array;
  }

  _swap(array, current, largest);

  return maxHeapify(array, largest);
}

function buildMaxHeap(array) {
  for(let i = Math.floor((array.length - 1) / 2); i > 0; i--){
    maxHeapify(array, i);
  }

  return array;
}

function sort(unsorted) {
  let sorted = [];

  let heap = buildMaxHeap(unsorted);

  for(let i = unsorted.length - 1; i > 0; i--) {
    _swap(heap, 1, heap.length - 1);

    sorted.push(heap[heap.length - 1]);

    heap.splice(heap.length - 1, 1);

    maxHeapify(heap, 1);
  }

  return sorted;
}

module.exports = {
  sort: function(array) {
    // shift all elements, so that root element has index = 1, not 0
    let copy = [undefined].concat(array);

    return sort(copy);
  },

  buildMaxHeap: function(array) {
    // shift all elements, so that root element has index = 1, not 0
    let copy = [undefined].concat(array);

    return buildMaxHeap(copy);
  },

  maxHeapify: function(array, index) {
    // shift all elements, so that root element has index = 1, not 0
    let copy = [undefined].concat(array);

    return maxHeapify(copy, index);
  }
};
