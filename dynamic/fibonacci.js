const fibonacci = (index) => {
  if (index <= 1) {
    return 1;
  }

  fibonacci.cache = fibonacci.cache || {};

  if (fibonacci.cache[index]) {
    return fibonacci.cache[index];
  }

  const value = fibonacci(index - 1) + fibonacci(index - 2);

  fibonacci.cache[index] = value;

  return value;
}

module.exports = fibonacci;
