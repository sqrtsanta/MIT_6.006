const assert = require('assert');
const Peak2D = require('./index');

const dataset = [
  [1, 1, 1, 1, 1],
  [2, 2, 2, 2, 2],
  [3, 3, 3, 3, 3],
  [4, 4, 4, 4, 4],
  [5, 6, 7, 8, 7]
];

describe('Peak2D#naive', function() {
  it('find a peak in 2D matrix', () => {
    assert.deepEqual(Peak2D.naive(dataset), 8);
  });
});

describe('Peak2D#halfBinary', function() {
  it('find a peak in 2D matrix', () => {
    assert.deepEqual(Peak2D.halfBinary(dataset), 8);
  });
});
