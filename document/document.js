'use strict';

class Dictionary {
  constructor(text) {
    this.dict = {};
    this.sum = 0;

    let words = text.split(' ');

    for(let word of words) {
      // allow only Latin & Russian characters, digits and underscore
      let trimmedWord = word.replace(/[^\w\u0430-\u044f]/gi, '');

      if (!trimmedWord) {
        break;
      }

      if (!this.dict[trimmedWord]) {
        this.dict[trimmedWord] = 0;
      }

      this.dict[trimmedWord]++;
      this.sum++;
    }
  }

  get(key) {
    return this.dict[key] || 0;
  }

  keys() {
    return Object.keys(this.dict);
  }
}

function distance(firstText, secondText) {
  let sum = 0;

  let firstDict  = new Dictionary(firstText);
  let secondDict = new Dictionary(secondText);

  for(let key of firstDict.keys()) {
    sum += firstDict.get(key) * secondDict.get(key);
  }

  return sum / (firstDict.sum * secondDict.sum);
}

module.exports = {
  distance: distance
};
