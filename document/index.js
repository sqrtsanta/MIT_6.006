class DictionaryHistogram {
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

  getOccurencies(key) {
    return this.dict[key] || 0;
  }

  getVocabulary() {
    return Object.keys(this.dict);
  }

  getVectorLength() {
    let length = 0;

    for (const word of this.getVocabulary()) { // eslint-disable-line no-restricted-syntax
      length += Math.pow(this.getOccurencies(word), 2); // eslint-disable-line no-restricted-properties
    }

    return Math.sqrt(length);
  }
}

function distance(firstText, secondText) {
  let dotProduct = 0;

  const firstHistogram = new DictionaryHistogram(firstText);
  const secondHistogram = new DictionaryHistogram(secondText);

  for (const word of firstHistogram.getVocabulary()) { // eslint-disable-line no-restricted-syntax
    dotProduct += firstHistogram.getOccurencies(word) * secondHistogram.getOccurencies(word);
  }

  return dotProduct / (firstHistogram.getVectorLength() * secondHistogram.getVectorLength());
}

module.exports = {
  distance,
};
