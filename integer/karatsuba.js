const half = (number) => Math.floor(number / 2);
const split = (number, divisor) => [Math.floor(number / divisor), number % divisor];

const multiply = (x, y) => {
  const length = Math.min(String(x).length, String(y).length);

  if (length === 1) {
    return x * y;
  }

  const halfdivisor = Math.pow(10, half(length));
  const fulldivisor = Math.pow(10, 2 * half(length));

  const [xHigh, xLow] = split(x, halfdivisor);
  const [yHigh, yLow] = split(y, halfdivisor);

  const z1 = multiply(xHigh, yHigh);
  const z3 = multiply(xLow, yLow);
  const z2 = multiply((xHigh + xLow), (yHigh + yLow)) - z1 - z3;

  return z1 * fulldivisor + z2 * halfdivisor + z3;
}

const approximateSelfDivision = (number, precision) => {
  const iterationCount = Math.floor(Math.log2(precision));

  let apprx = 1;
  for (let i = 0; i < iterationCount; i += 1) {
    apprx = 2 * apprx - multiply(number, multiply(apprx, apprx))
  }

  return apprx;
}

const divide = (x, y, precision) => {
  return multiply(x, approximateSelfDivision(y, precision));
}

module.exports = {
  multiply,
  divide,
};
