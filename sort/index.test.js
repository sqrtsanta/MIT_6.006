const assert = require('assert');

const insertion = require('./insertion');
const merge = require('./merge');
const counting = require('./counting');
const radix = require('./radix');

const unsorted = [1, 2, 3, 9, 8, 4, 3, 19, 22, 89, 1, 1, 23, 22, 21, 5, 6, 7, 8, 100];
const sorted = [1, 1, 1, 2, 3, 3, 4, 5, 6, 7, 8, 8, 9, 19, 21, 22, 22, 23, 89, 100];

insertion(unsorted);
merge(unsorted);

describe('Sort#insertion', () => {
  it('sort array', () => {
    assert.deepEqual(insertion(unsorted), sorted);
  });
});

describe('Sort#merge', () => {
  it('sort array', () => {
    assert.deepEqual(merge(unsorted), sorted);
  });
});

describe('Sort#counting', () => {
  it('sort array', () => {
    const keymax = Math.max(...unsorted);

    assert.deepEqual(counting(unsorted, keymax), sorted);
  });
});

describe('Sort#radix', () => {
  it('sort array', () => {
    const keymax = Math.max(...unsorted);

    assert.deepEqual(radix(unsorted, keymax), sorted);
  });
});
