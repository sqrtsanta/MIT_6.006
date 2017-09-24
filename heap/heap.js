const swap = (array, first, second) => {
  const tmp = array[first];

  array[first] = array[second]; // eslint-disable-line no-param-reassign
  array[second] = tmp; // eslint-disable-line no-param-reassign
}

class Heap {
  constructor(array, invariantF) {
    const shifted = [undefined].concat(array);

    for (let index = Math.floor((shifted.length - 1) / 2); index > 0; index -= 1) {
      Heap.heapify(shifted, index, invariantF);
    }

    this.array = shifted;
    this.length = shifted.length - 1;
    this.invariantF = invariantF;
  }

  static sort(array, invariantF) {
    const sorted = [];

    const heap = new Heap(array, invariantF);

    while (heap.length > 0) {
      sorted.push(heap.extract());
    }

    return sorted;
  }

  static heapify(array, current, invariantF) {
    const length = array.length;

    let target = current;
    const left = current * 2;
    const right = (current * 2) + 1;

    if (left < length && invariantF(array[left], array[target])) {
      target = left;
    }

    if (right < length && invariantF(array[right], array[target])) {
      target = right;
    }

    if (target === current) {
      return;
    }

    swap(array, current, target);

    return Heap.heapify(array, target, invariantF);
  }

  extract() {
    swap(this.array, 1, this.length);

    const last = this.array[this.length];

    this.array.splice(this.length, 1);
    this.length = this.length - 1;

    Heap.heapify(this.array, 1, this.invariantF);

    return last;
  }
}

module.exports = Heap;
