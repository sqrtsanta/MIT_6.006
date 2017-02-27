const assert = require('assert');
const ChainingHash = require('./chaining');

const elements = [
  [33142, 'Calcium'], [88762, 'Lithium'],
  [12448, 'Oxygen'], [9987, 'Copper'],
  [67667, 'Tantalum'], [1231, 'Iron'],
  [67667, 'Tantalum'], [1231, 'Iron'], // <- duplicates to check overwriting
  [1, 'Rubidium'], [3, 'Palladium'],
  [99999, 'Barium'], [28, 'Osmium'],
  [54321, 'Xenon'], [128, 'Polonium'],
  [1221, 'Radium'], [1024, 'Uranium'],
];

describe('ChainingHash', () => {
  const dict = new ChainingHash(10);

  elements.forEach((el) => {
    dict.insert(el[0], el[1]);
  });

  elements.forEach((el) => {
    it(`put item ${el[0]} => ${el[1]} in dict`, () => {
      assert.equal(dict.search(el[0]), el[1]);
    });
  });

  elements.forEach((el) => {
    it(`delete item ${el[0]} => ${el[1]} from dict`, () => {
      dict.delete(el[0]);
      assert.equal(dict.search(el[0]), null);
    });
  });
});
