const assert = require('assert');
const AVL = require('./index');

describe('AVL#height', () => {
  const array = [1, 14, 3, 17, 92, 89, 102, 44, 6, 16, 77, 9, 100, 65, 54];
  const avlTree = AVL.fromArray(array);

  const actualHeight = avlTree.height();
  const expectedHeight = Math.round(Math.log2(array.length));

  it(`the height of AVL tree with ${array.length} nodes is: ${expectedHeight}`, () => {
    assert.equal(actualHeight, expectedHeight);
  });
});
