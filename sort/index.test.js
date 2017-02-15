const assert = require('assert');
const Sort = require('./index.js');

const unsorted = [1, -10, 2, 3, -2, 9, 8, 4, 3, 19, 22, 89, 1, 1, 23, 22, 21, 5, 6, 7, 8, 100];
const sorted = [-10, -2, 1, 1, 1, 2, 3, 3, 4, 5, 6, 7, 8, 8, 9, 19, 21, 22, 22, 23, 89, 100];

Sort.insertion(unsorted);
Sort.merge(unsorted);

describe('Sort#insertion', function() {
  it('sort array', () => {
    assert.deepEqual(Sort.insertion(unsorted), sorted);
  });
});

describe('Sort#merge', function() {
  it('sort array', () => {
    assert.deepEqual(Sort.merge(unsorted), sorted);
  });
});
