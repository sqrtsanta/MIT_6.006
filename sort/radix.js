const counting = require('./counting');

function radix(array, max) {
  const keymax = Math.log(max);

  let sorted = array.slice();

  for (let i = 0; i <= keymax; i += 1) {
    sorted = counting(sorted, 9, (n) => {
      return Math.floor(n / Math.pow(10, i)) % 10; // eslint-disable-line no-restricted-properties
    });
  }

  return sorted;
}

module.exports = radix;
