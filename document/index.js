class Dictionary {
  constructor(text) {
    this.dict = {};

    const words = text.split(' ');

    for (const word of words) { // eslint-disable-line no-restricted-syntax
      // allow only Latin & Russian characters, digits and underscore
      const trimmedWord = word.replace(/[^\w\u0430-\u044f]/gi, '').toLowerCase();

      if (!trimmedWord) {
        break;
      }

      if (!this.dict[trimmedWord]) {
        this.dict[trimmedWord] = 0;
      }

      this.dict[trimmedWord] += 1;
    }
  }

  get(key) {
    return this.dict[key] || 0;
  }

  keys() {
    return Object.keys(this.dict);
  }

  sum() {
    let sum = 0;

    for (const key of this.keys()) { // eslint-disable-line no-restricted-syntax
      sum += Math.pow(this.get(key), 2); // eslint-disable-line no-restricted-properties
    }

    return Math.sqrt(sum);
  }
}

function distance(firstText, secondText) {
  let sum = 0;

  const firstDict = new Dictionary(firstText);
  const secondDict = new Dictionary(secondText);

  for (const key of firstDict.keys()) { // eslint-disable-line no-restricted-syntax
    sum += firstDict.get(key) * secondDict.get(key);
  }

  return sum / (firstDict.sum() * secondDict.sum());
}

module.exports = {
  distance,
};
