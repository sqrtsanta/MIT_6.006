const getPrime = (capacity) => {
  for (let i = capacity - 1; i >= 1; i -= 1) {
    let fact = 0;

    for (let j = 2; j <= Math.sqrt(i); j += 1) {
      if (i % j === 0) {
        fact += 1;
      }

      if (fact === 0) {
        return i;
      }
    }
  }

  return 3;
}

const oridinaryHashF = (capacity) => (int) => {
  return int % capacity;
}

const universalHashF = (capacity) => {
  const prime = getPrime(100000);

  const a = Math.floor(Math.random() * (prime));           // {0, 1, ..., p-1}
  const b = Math.floor((Math.random() * (prime - 1)) + 1); // {1, 2, ..., p-1}

  return (bigInt) => {
    return (((a * bigInt) + b) % prime) % capacity;
  };
}

const linearProbingHashF = (capacity) => {
  const aF = universalHashF(capacity);
  const c = getPrime(capacity);

  return (int, probeIndex) => {
    return (aF(int) + probeIndex * c) % capacity;
  }
}

const doubleProbingHashF = (capacity) => {
  const aF = universalHashF(capacity);
  const bF = universalHashF(capacity);

  return (int, probeIndex) => {
    return (aF(int) + probeIndex * bF(int)) % capacity;
  }
}

module.exports = {
  getPrime,
  oridinaryHashF,
  universalHashF,
  linearProbingHashF,
  doubleProbingHashF,
};
