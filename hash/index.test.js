const assert = require('assert');

const ChainingHash = require('./chaining');
const TableDoublingHash = require('./table_doubling');
const OpenAddressingHash = require('./open_addressing');

const elements = [
  [33142, 'Calcium'], [88762, 'Lithium'],
  [12448, 'Oxygen'], [9987, 'Copper'],
  [67667, 'Tantalum'], [1231, 'Iron'],
  [67667, 'Tantalum'], [1231, 'Iron'], // <- duplicates to check overwriting
  [1, 'Rubidium'], [3, 'Palladium'],
  [99999, 'Barium'], [28, 'Osmium'],
  [54321, 'Xenon'], [128, 'Polonium'],
  [1221, 'Radium'], [1024, 'Uranium'],
  [553, 'Hydrogen'], [12, 'Carbon'],
  [9222, 'Chlorine'], [42331, 'Neon'],
  [221, 'Gallium'], [87, 'Iridium'],
  [99112, 'Tungsten'], [2022, 'Krypton'],
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

describe('TableDoublingHash', () => {
  const dict = new TableDoublingHash();

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

describe('OpenAddressingHash', () => {
  const dict = new OpenAddressingHash();

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
