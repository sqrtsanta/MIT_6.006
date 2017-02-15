class Dictionary {
  constructor(text) {
    this.dict = {};

    let words = text.split(' ');

    for(let word of words) {
      // allow only Latin & Russian characters, digits and underscore
      let trimmedWord = word.replace(/[^\w\u0430-\u044f]/gi, '').toLowerCase();

      if (!trimmedWord) {
        break;
      }

      if (!this.dict[trimmedWord]) {
        this.dict[trimmedWord] = 0;
      }

      this.dict[trimmedWord]++;
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

    for (let key of this.keys()) {
      sum += Math.pow(this.get(key), 2);
    }

    return Math.sqrt(sum);
  }
}

function distance(firstText, secondText) {
  let sum = 0;

  let firstDict  = new Dictionary(firstText);
  let secondDict = new Dictionary(secondText);

  for(let key of firstDict.keys()) {
    sum += firstDict.get(key) * secondDict.get(key);
  }

  return sum / (firstDict.sum() * secondDict.sum());
}

module.exports = {
  distance: distance
};
