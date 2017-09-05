const left = (x, base) => Math.trunc(x / Math.pow(10, base));
const right = (x, base) => Number(String(x).slice(-base));

const restore = (x, base) => x * Math.pow(10, base);

const multiply = (x, y) => {
  if (String(x).length === 1 || String(y).length === 1) {
    return x * y;
  }

  const base = Math.round(String(x).length / 2);

  const z1 = multiply(left(x, base), left(y, base));
  const z3 = multiply(right(x, base), right(y, base));
  const z2 = multiply((left(x, base) + right(x, base)), (left(y, base) + right(y, base))) - z1 - z3;

  return restore(z1, 2 * base) + restore(z2, base) + z3;
}

module.exports = {
  multiply,
};
