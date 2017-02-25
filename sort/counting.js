const identity = n => n;

function counting(array, keymax, keyFn = identity) {
  const keylist = [];
  let sorted = [];

  for (let i = 0; i <= keymax; i += 1) {
    keylist[i] = [];
  }

  for (let i = array.length - 1; i >= 0; i -= 1) {
    keylist[keyFn(array[i])].unshift(array[i]);
  }

  for (let i = 0; i <= keymax; i += 1) {
    sorted = [...sorted, ...keylist[i]];
  }

  return sorted;
}

module.exports = counting;
