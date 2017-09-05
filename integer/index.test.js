const assert = require('assert');

const Karatsuba = require('./karatsuba');

const elements = [
  [1233, 4123, 5083659],
  [7833, 1299, 10175067],
  [645781, 345090, 222852565290],
  [234, 857, 200538],
];

describe('Karatsuba', () => {
  elements.forEach((el) => {
    it(`multiplicaton ${el[0]} * ${el[1]} should be equal to ${el[2]}`, () => {
      assert.equal(Karatsuba.multiply(el[0], el[1]), el[2]);
    });
  });
});
