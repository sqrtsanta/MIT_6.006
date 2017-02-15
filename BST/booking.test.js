const assert = require('assert');

const Booking = require('./booking');

describe('reserve', function() {
  const array = [1, 14, 3, 17, 92, 89, 102, 44, 6, 16, 77, 9, 100, 65, 54];
  const k = 3;

  const tests = [
    [-10, false],
    [2, false],
    [105, true],
    [106, true],
    [18, false],
    [19, false],
    [20, true],
    [21, true],
  ];

  tests.forEach(t => {
    it('at ' + t[0] + ' -> ' + t[1], () => {
      const service = new Booking(array, k);
      assert.equal(service.reserve(t[0]), t[1]);
    });
  });
});

describe('rank', function () {
  const array = [1, 14, 3, 17, 92, 89, 102, 44, 6, 16, 77, 9, 100, 65, 54];
  const k = 3;

  const tests = [
    [-10, 0],
    [2, 1],
    [105, 15],
    [18, 7],
  ];

  tests.forEach(t => {
    it('at ' + t[0] + ' -> ' + t[1], () => {
      const service = new Booking(array, k);
      assert.equal(service.rank(t[0]), t[1]);
    });
  });
});
