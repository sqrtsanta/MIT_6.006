const assert = require('assert');
const Peak = require('./index');

const dataset = [1, 2, 3, 4, 5, 6, 7, 8, 7, 6, 5, -1, -2, -3, -4, -5, -6, -7, -8, -9, -10];

describe('Peak#naive', () => {
  it('find a peak in array', () => {
    assert.deepEqual(Peak.naive(dataset), 8);
  });
});

describe('Peak#binary', () => {
  it('find a peak in array', () => {
    assert.deepEqual(Peak.binary(dataset), 8);
  });
});
