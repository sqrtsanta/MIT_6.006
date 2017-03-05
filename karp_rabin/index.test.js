const assert = require('assert');
const match = require('./index');

const samples = [
  ['whether', true],
  ['willing', false],
  ['joy', true],
  ['who', true],
  ['mement', false],
];

const text = 'who will tell whether one happy moment of love or the joy...';

describe('Karp-Rabin match', () => {
  samples.forEach((el) => {
    it(`sample "${el[0]}" is${el[1] ? '' : ' not'} in text`, () => {
      assert.equal(match(el[0], text), el[1]);
    });
  });
});
