const LinkedList = require('../linked_list');

/*
* uhf - Universal Hash Function
*/
function uhf(capacity) {
  /*
  * a prime number greater than the maximum value of a hash key that will be given
  * I picked 10000th prime number
  * should I implement function nextPrime()?
  */
  const prime = 104729;

  const a = Math.floor(Math.random() * (prime));           // {0, 1, ..., p-1}
  const b = Math.floor((Math.random() * (prime - 1)) + 1); // {1, 2, ..., p-1}

  return (bigInt) => {
    return (((a * bigInt) + b) % prime) % capacity;
  };
}

/*
* ChainingHash
* Insert, Delete, Search - O(1)
*
* simple approach: key -> underlying_array[key]
* but what if the key is too big: too much wasted memory
* the solution is to transform: key -> hash(key)
* the is the possibility of collision: k1 != k2; hash(k1) == hash(k2)
* then keep them in linked list
*/
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

  retrieve(key) {
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
