const assert = require('assert');
const LinkedList = require('./index');

const elements = [
  [33142, 'Calcium'], [88762, 'Lithium'],
  [12448, 'Oxygen'], [9987, 'Copper'],
  [67667, 'Tantalum'], [1231, 'Iron'],
  [1, 'Rubidium'], [3, 'Palladium'],
  [99999, 'Barium'], [28, 'Osmium'],
  [54321, 'Xenon'], [128, 'Polonium'],
  [1221, 'Radium'], [1024, 'Uranium'],
  [553, 'Hydrogen'], [12, 'Carbon'],
  [9222, 'Chlorine'], [42331, 'Neon'],
  [221, 'Gallium'], [87, 'Iridium'],
  [99112, 'Tungsten'], [2022, 'Krypton'],
];

describe('LinkedList', () => {
  const list = new LinkedList();

  elements.forEach((el) => {
    list.insert(el[0], el[1]);
  });

  elements.forEach((el) => {
    it(`put item ${el[0]} => ${el[1]} in list`, () => {
      const item = list.search(el[0]);

      assert.equal(item && item.value(), el[1]);
    });
  });

  elements.forEach((el) => {
    it(`delete item ${el[0]} => ${el[1]} from list`, () => {
      const item = list.search(el[0]);

      assert.equal(item && item.value(), el[1]);
    });
  });
});
