function equals(k1, k2) {
  for (let i = k1.length - 1; i >= 0; i -= 1) {
    if (k1[i] !== k2[i]) {
      return false;
    }
  }

  return true;
}

class RollingHash {
  constructor(str) {
    // this._prime = 104729;
    this._base = 10;

    this._list = str.split('');

    this._hash = 0;
    this._list.forEach((char, index) => {
      this._hash += char.codePointAt(0) * Math.pow(this._base, (this._list.length - index - 1));
    });
    // this._hash %= this._prime;
  }

  shift(nextChar) {
    const prevChar = this._list.shift();
    this._list.push(nextChar);

    this._hash -= prevChar.codePointAt(0) * Math.pow(this._base, (this._list.length - 1));
    this._hash *= this._base;
    this._hash += nextChar.codePointAt(0);
    // this._hash %= this._prime;
  }

  get hash() {
    return this._hash;
  }
}

function match(sample, text) {
  const ls = sample.length;
  const lt = text.length;

  if (ls > lt) {
    return false;
  }

  const rs = new RollingHash(sample);
  const rt = new RollingHash(text.slice(0, ls));

  if (rs.hash === rt.hash && equals(sample, text.slice(0, ls))) {
    return true;
  }

  for (let i = 0; i < lt - ls; i += 1) {
    rt.shift(text[i + ls]);

    if (rs.hash === rt.hash && equals(sample, text.slice(i + 1, i + ls + 1))) {
      return true;
    }
  }

  return false;
}

module.exports = match;
