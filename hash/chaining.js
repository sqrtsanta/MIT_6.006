class Item {
  constructor(key, value) {
    this._key = key;
    this._value = value;
  }

  value() { return this._value; }
  key() { return this._key; }

  setNext(item) { this._next = item; }
  next() { return this._next; }

  setPrev(item) { this._prev = item; }
  prev() { return this._prev; }
}

class LinkedList {
  constructor(key, value) {
    this._curr = new Item(key, value);
  }

  insert(key, value) {
    if (!this._curr) {
      this._curr = new Item(key, value);
      return;
    }

    const curr = this._curr;
    const next = new Item(key, value);

    next.setPrev(curr);
    curr.setNext(next);

    this._curr = next;
  }

  delete(key) {
    const item = this.search(key);

    if (!item) {
      return;
    }

    if (item.prev()) {
      item.prev().setNext(item.next());
    }

    if (item.next()) {
      item.next().setPrev(item.prev());
    }

    if (item.key() === this._curr.key()) {
      this._curr = item.prev();
    }
  }

  search(key) {
    if (!this._curr) {
      return;
    }

    let curr = this._curr;
    while (curr) {
      if (curr.key() === key) {
        return curr;
      }

      curr = curr.prev();
    }
  }
}

/*
* uhf - Universal Hash Function
*/
function uhf(capacity) {
  /*
  * a prime number greater than the maximum value of a hash key that will be given
  * I picked 10000th prime number, just because fuck u, thats why
  * But may be implement function nextPrime(keyMax)
  */
  const prime = 104729;

  const a = Math.floor(Math.random() * (prime));           // {0, 1, ..., p-1}
  const b = Math.floor((Math.random() * (prime - 1)) + 1); // {1, 2, ..., p-1}

  return (bigInt) => {
    return (((a * bigInt) + b) % prime) % capacity;
  };
}

class ChainingHash {
  constructor(numberOfHashSlots) {
    this._capacity = numberOfHashSlots;
    this._table = [];
    this._hashf = uhf(numberOfHashSlots);
  }

  insert(key, value) {
    const hashKey = this._hashf(key);

    if (!this._table[hashKey]) {
      this._table[hashKey] = new LinkedList(key, value);
    } else {
      const list = this._table[hashKey];

      // do not keep duplicates, overwrite them
      list.delete(key);
      list.insert(key, value);
    }
  }

  delete(key) {
    const hashKey = this._hashf(key);

    if (this._table[hashKey]) {
      const list = this._table[hashKey];
      list.delete(key);
    }
  }

  search(key) {
    const hashKey = this._hashf(key);
    const list = this._table[hashKey];

    if (!list) {
      return;
    }

    const item = list.search(key);

    if (item) {
      return item.value();
    }
  }
}

module.exports = ChainingHash;
