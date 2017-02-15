const assert = require('assert');
const Heap = require('./index');

describe('Heap#sort', function() {
  const unsorted = [1, -10, 2, 3, -2, 9, 8, 4, 3, 19, 22, 89, 1, 1, 23, 22, 21, 5, 6, 7, 8, 100];
  const sorted = [100, 89, 23, 22, 22, 21, 19, 9, 8, 8, 7, 6, 5, 4, 3, 3, 2, 1, 1, 1, -2, -10];

  it('sorts array', () => {
    assert.deepEqual(Heap.sort(unsorted), sorted);
  });
});
