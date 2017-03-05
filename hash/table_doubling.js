const LinkedList = require('../linked_list');

/*
* uhf - Universal Hash Function
*/
function uhf(capacity) {
  /*
  * a prime number greater than the maximum value of a hash key that will be given
  * I picked 10000th prime number, just because fuck u, thats why
  * but may be I should implement function nextPrime(keyMax)
  */
  const prime = 104729;

  const a = Math.floor(Math.random() * (prime));           // {0, 1, ..., p-1}
  const b = Math.floor((Math.random() * (prime - 1)) + 1); // {1, 2, ..., p-1}

  return (bigInt) => {
    return (((a * bigInt) + b) % prime) % capacity;
  };
}

/*
* TableDoublingHash
* Insert, Delete, Search - O(1)
*
* The problem with ChainingHash
* we need to define capacity, but data is coming in unpredictible way
* solution:
*   define initial capacity,
*   enlarge it on insert if necessary
*   shrink it on delete if necessary
*/
class TableDoublingHash {
  constructor(cap = 8) {
    this._table = [];
    this._capacity = cap;
    this._length = 0;
    this._hashf = uhf(cap);
  }

  insert(key, value) {
    const hashKey = this._hashf(key);

    if (!this._table[hashKey]) {
      this._table[hashKey] = new LinkedList(key, value);
      this._length += 1;
    } else {
      const list = this._table[hashKey];

      if (list.search(key)) {
        list.delete(key);
        list.insert(key, value);
      } else {
        list.insert(key, value);
        this._length += 1;
      }
    }

    if (this._length >= this._capacity) {
      this.enlarge();
    }
  }

  delete(key) {
    const hashKey = this._hashf(key);

    if (this._table[hashKey]) {
      const list = this._table[hashKey];
      list.delete(key);
      this._length -= 1;
    }

    if (this._table.length / 4 >= this._capacity) {
      this.shrink();
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

  rebuild(cap) {
    const oldTable = this._table;

    this._table = [];
    this._capacity = cap;
    this._length = 0;
    this._hashf = uhf(cap);

    oldTable.forEach((list) => {
      if (list) {
        // code smell, implementation details
        list.forEach((item) => {
          this.insert(item.key(), item.value());
        });
      }
    });
  }

  enlarge() {
    this.rebuild(this._capacity * 2);
  }

  shrink() {
    this.rebuild(this._capacity / 2);
  }
}

module.exports = TableDoublingHash;
